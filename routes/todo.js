const router     = require('express').Router()
  ,   {ToDo}     = require('../models/todo')
  ,   Joi        = require('joi')

// Create
router.post('/',async(req,res,next)=>{
    const schema  = Joi.object({
    
        title:  Joi.string().min(1).max(100).required(),

    })
    const {error} = schema.validate(req.body,{abortEarly:false});
    if (error) return next({status:400,msg:error.details.map(x=>x.message)});

    const {title} = req.body

    const todo = new ToDo({title})

    const result = await todo.save()

    res.send(result);
});
// Read
router.get('/',async(req,res,next)=>{
    const todos = await ToDo.find({})
    res.status(200).send(todos);
});
// Update
router.patch('/',async(req,res,next)=>{
    const schema  = Joi.object({
    
        title:  Joi.string().min(1).max(100).required(),
        id:     Joi.string().required(),
        done:   Joi.boolean().allow(null,'').optional(),

    })
    const {error} = schema.validate(req.body,{abortEarly:false});
    if (error) return next({status:400,msg:error.details.map(x=>x.message)});

    const {title,id,done} = req.body

    let result;
    if (done){
        result = await ToDo.findOneAndUpdate(
            {_id:id},
            {$set:{title,done:Date.now()}},
            {new:true}
        )
    } else {
        result = await ToDo.findOneAndUpdate(
            {_id:id},
            {$set:{title,done:null}},
            {new:true}
        )
    }

    res.status(200).send(result);

});
// Delete
router.delete('/',async(req,res,next)=>{
    const schema  = Joi.object({
    
        id:     Joi.string().required()

    })
    const {error} = schema.validate(req.body,{abortEarly:false});
    if (error) return next({status:400,msg:error.details.map(x=>x.message)});

    const {id} = req.body

    const result = await ToDo.deleteOne({_id:id})

    res.send(result);
});


module.exports = router;