import React, {useState,useEffect} from 'react'
import { Form ,Button} from 'react-bootstrap';
import { RegFormContainer, ButtonsContainer } from './style'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { userLogin } from '../Actions/UserAction';
import classnames from 'classnames';
import PropTypes from 'prop-types';

function Login(props) {
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');

    useEffect(() => {
        if (props.auth.isAuthenticated){
            props.history.push('/dashboard');
        }
    },[props.auth])

    const handleSubmit = (event) => {
          event.preventDefault();
          event.stopPropagation();

          const userLoginData = {
              password:password,
              email:email
          }

          props.userLogin(userLoginData, props.history)
      };
      
      function handleSetPassword(e){
          setPassword(e.target.value);
      }
      
      function handleSetEmail(e){
          setEmail(e.target.value);
      }
      

      return (
      <RegFormContainer>
          <Form noValidate onSubmit={handleSubmit}>

              <Form.Group controlId="formBasicEmail">
                  <Form.Label>דוא"ל</Form.Label>
                  <Form.Control 
                  required 
                  value={email}
                  onChange={handleSetEmail} 
                  type="email" 
                  placeholder="הכנס דואר אלקטרוני" 
                  className={classnames('form-control form-control-sm',{
                      'is-invalid': props.errors.email})} 
                  />
                  {props.errors.email && (<div className="invalid-feedback">{props.errors.email}</div>)}
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                  <Form.Label>סיסמא</Form.Label>
                  <Form.Control 
                  required 
                  onChange={handleSetPassword}
                  value={password}
                  type="password" 
                  placeholder="הכנס סיסמא" 
                  className={classnames('form-control form-control-sm',{
                      'is-invalid': props.errors.password})} 
                  />
                  {props.errors.password && (<div className="invalid-feedback">{props.errors.password}</div>)}
              </Form.Group>
              <ButtonsContainer>
                  <a className='btn btn-danger' href='/'>ביטול</a>
                  <Button variant='success' type="submit">כנס</Button>
              </ButtonsContainer>
          </Form>
      </RegFormContainer>
      );
    }

Login.propTypes = {
    Login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = (state)=>({
    auth:state.auth,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { userLogin })(withRouter(Login));