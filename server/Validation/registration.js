const Validator = require('validator');
const checkInput = require('./CheckInput');

module.exports = function validateRegInput(input){
    let errors = {};
    
    if(checkInput(input.username))    
        input.username = '';
    if(checkInput(input.password))    
        input.password = '';

    if(checkInput(input.email))    
        input.email = '';
        
    if(!Validator.isLength(input.username,{min: 2, max: 20})){
       errors.username = 'שם משתמש צריך להכיל לפחות 2 תווים'; 
    }

    // If empty username
    if(Validator.isEmpty(input.username)){
        errors.username = 'אנא הכנס שם משתמש';
    }

    // If empty password
    if(Validator.isEmpty(input.password)){
        errors.password = 'אנא הכנס סיסמא';
    }

    // If valid password
    if(!Validator.isLength(input.password,{min: 6 , max: 50})){
        errors.password = 'סיסמא חייבת להכיל לפחות 6 תווים';
    }

     // If valid email
     if(!Validator.isEmail(input.email)){
        errors.email = 'דוא"ל לא תקין';
    }

    // If empty email
    if(Validator.isEmpty(input.email)){
        errors.email = 'אנא הכנס דוא"ל';
    }
   
    return {
        errors,
        isValid:checkInput(errors)
    }
};