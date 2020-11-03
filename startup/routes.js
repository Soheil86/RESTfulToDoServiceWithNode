const express                   = require('express')

  ,   helmet                    = require('helmet')
  ,   compression               = require('compression')
  ,   cors                      = require('cors')

  ,   JSONValidation            = require('../middleware/JSONValidation')

module.exports = function (app) {

    app.disable('x-powered-by');
    // app.enable ('trust proxy' );

    app.use(cors());

    app.use(express.urlencoded({extended:true}));
    app.use(express.json({limit:'100kb'}));
    app.use(JSONValidation);
    // app.use(express.static('static'));

    app.use(helmet());
    app.use(compression());

    app.get('/',(req,res,next)=>{
        res.json({status:'ok'})
    })

    app.use('/todo', require('../routes/todo'))
    
    // 404 middleware
    app.use('*',(req,res,next)=>{
        return res.status(404).json({msg:'Route Not Found'});
    })

    // error middleware
    app.use((err,req,res,next)=>{
        res.status(500).json({msg:"Error",error:err})
        console.error(err)
    })
};