import axios from 'axios';
import jwt_decode from 'jwt-decode';
import SetAuth from '../Utilities/SetAuth';

export const refreshUserData = () => dispatch =>{
    axios.get('/api/users').then(res =>
        dispatch({
            type:'REFRESH_USER',
            payload:res.data
        })
    ).catch(error=>
        dispatch({
            type:'ERRORS',
            payload:error.response.data
        })
    );
};

export const userRegistration = (data,history) => dispatch =>{
    axios.post('/api/users/register',data).then(res =>{
    history.push('/login');
    }).catch(error=>{
      dispatch({
          type:'ERRORS',
          payload:error.response.data
      })
    });
};

export const userLogin = (data,history)=> dispatch =>{

    axios.post('/api/users/login',data).then(res=>{
        const auth_token = res.data.token;

        localStorage.setItem('USER_TOKEN',auth_token);
        SetAuth(auth_token);
        const decoded_token = jwt_decode(auth_token);
        dispatch(setDecodedUser(decoded_token));
    }).catch(error=>{
        dispatch({
            type:'ERRORS',
            payload:error.response.data
        })
    })
}

export const userLogout =() => dispatch=>{

    localStorage.removeItem('USER_TOKEN');
    SetAuth(false);
    dispatch(setDecodedUser({}));

}

export const setDecodedUser = (decoded_token)=>{
    return{
        type:'DECODED_USER',
        payload:decoded_token
    }
}