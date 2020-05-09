// Auth handler

// CONST
const express = require('express');
const router = express.Router();
const grav = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../database/keys');
const passport = require('passport');
const User = require('../../models/User');
const validateRegInput = require('../../Validation/registration');
const validateLoginInput = require('../../Validation/login');

router.get('/', passport.authenticate('jwt',{session: false }),(req, res) => {
    User.findOne({ _id: req.user._id })
      .populate('user', ['name', 'avatar', 'search'])
      .then(user => {
        if (!user) {
          return res.status(404).json({notfound:'user not found!'});
        }
        res.json(user);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post('/register',(req,res)=>{
    const { errors, isValid } = validateRegInput(req.body);
    
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}).then(user => {
        if(user){
            return res.status(400).json({email: 'דוא"ל זה נמצא בשימוש'});
        }
        else{
            const avatar = grav.url(req.body.email,{
                size:'150',
                rating:'pg',
                default:'mm'
            });

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                avatar,
                password: req.body.password,
            });
            bcrypt.genSalt(10,(error,salt)=>{
                bcrypt.hash(newUser.password, salt,(error,hash)=>{
                    if(error){
                        throw error;
                    }
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(error => console.log(error))
                });
            });
        }
    });

});

// Login
router.post('/login',(req,res)=>{
        const { errors, isValid } = validateLoginInput(req.body);
        
        // Check registration validation
        if(!isValid){
            return res.status(400).json(errors);
        }
    
        const email = req.body.email;
        const password = req.body.password;
        User.find().then(users=>console.log(users))
        User.findOne({email}).then(user =>{
            if(!user){
                return res.status(404).json({email:'לא קיים משתמש כזה!'})
            }
            bcrypt.compare(password, user.password).then(isValid =>{
                if(isValid){
                    const data = {id:user.id, username:user.username, avatar:user.avatar, search:user.search}
                    // Sign this data into web token
                    jwt.sign(data,keys.secretOrKey,{expiresIn:7200}, (error, token)=>{
                        res.json({success:true,token:'Bearer ' + token})
                    });
                }
                else{
                    return res.status(400).json({password:'סיסמא אינה נכונה'})
                }
            });
        });
    });
    
    // Get current user
    router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
        res.json(req.user);
    });
    

module.exports = router;