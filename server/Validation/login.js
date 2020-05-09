const Validator = require('validator');
const checkInput = require('./checkInput');

module.exports = function validateLoginInput(input){
    let errors = {};

    if(checkInput(input.password))    
        input.password = '';

    if(checkInput(input.email))    
        input.email = '';
        
   
    // If empty password
    if(Validator.isEmpty(input.password)){
        errors.password = 'אנא הכנס סיסמא';
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