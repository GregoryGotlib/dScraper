const express = require("express");
const router = express.Router();
const parseResponse = require('../../scraper');
const User = require('../../models/User');
const ScrapedData = require('../../models/ScrapedData');
const passport = require('passport');

router.post('/', passport.authenticate('jwt',{session: false }), async function(req, res,next){

  try{
    const response = await parseResponse(req.body);
    
    User.findOne({ _id: req.user._id }).then(user=>{ 
      // let newData = false;
    //   if(user.search.length){
    //     response.forEach(item => {
    //       let isNewData = false;
    //       user.search.forEach(oldItem =>{
    //         if(JSON.stringify(oldItem) != JSON.stringify(item)){
    //           isNewData = true;
    //         } 
    //       })
    //       if(isNewData){
    //         user.search.push(item)
    //         newData = true;
    //       }
    //     })
    // }
    // else if(!user.search || !user.search.length){
    //   console.log('this is a new search!')
    //   user.search = [...response];
    //   newData = true;
    // }

    user.search = response;
    user.save().then(user=>{
        res.json(user);
    });
  }).catch(error=>{
      res.status(404).json(error);
  });

  } catch(err){
    next(err);
  }
});

router.delete('/', passport.authenticate('jwt',{session:false}),(req,res)=>{
  User.findOne({_id: req.user._id }).then(user=>{ 
    user.search = [];
    console.log('USER FOUND:',user.search)
  user.save().then(user=>{
      res.json(user);
  })    
  }).catch(error=>{
      res.status(404).json(error);
  });
});

router.get('/data', passport.authenticate('jwt',{session:false}),(req,res)=>{
  ScrapedData.find().then(data=>{ 
    console.log('GETTING DATA:',data)
    res.json(data);
  }).catch(error=>{
      res.status(404).json(error);
  });
});


router.post('/insertdata', passport.authenticate('jwt',{session:false}),(req,res)=>{

  ScrapedData.findOne({manufacturerId:req.body.manufacturer, modelId:req.body.model}).then(data=>{
    if(!data){
      
      const newData = new ScrapedData({
        modelName:req.body.modelName,
        manufacturerName:req.body.manufacturerName,
        engine:req.body.engineSize,
        manufacturerId:req.body.manufacturer,
        modelId:req.body.model,
        type:req.body.type,
        counter:1
      })
      console.log('new data found:',newData)
      newData.save().then(data=>{
        res.json(data);
    });
    }
    else{
      data.counter+=1;
      console.log('new data found:',data)
      data.save().then(data=>{
        res.json(data);
    });
    }
  }).catch(err => console.log(err))
});

  

module.exports = router;