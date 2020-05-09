import React, {useState,useEffect} from 'react'
import { Form ,Button} from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import { FacebookLogin } from 'react-facebook-login';
import { RegFormContainer, ButtonsContainer } from './style'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { userRegistration } from '../Actions/UserAction';
import classnames from 'classnames';
import PropTypes from 'prop-types';


function Registration(props) {
        const [username ,setUsername] = useState('');
        const [email ,setEmail] = useState('');
        const [password ,setPassword] = useState('');

        useEffect(() => {
            if (props.auth.isAuthenticated){
                props.history.push('/dashboard');
            }
            
        })

        const handleSubmit = (event) => {
            event.preventDefault();
            event.stopPropagation();
            const userRegData = {
                username:username,
                password:password,
                email:email
            }

            props.userRegistration(userRegData, props.history)
        };
      
        function handleSetUsername(e){
            setUsername(e.target.value);
        }

        
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
                    <Form.Label>שם משתמש</Form.Label>
                    <Form.Control 
                        required 
                        value={username}
                        onChange={handleSetUsername} 
                        type="text" 
                        placeholder="הכנס שם משתמש" 
                        className={classnames('form-control form-control-sm',{
                            'is-invalid': props.errors.username})} 
                        />
                    {props.errors.username && (<div className="invalid-feedback">{props.errors.username}</div>)}
                </Form.Group>

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
                    <Button variant='success' type="submit">שגר</Button>
                    <a className='btn btn-danger' href='/'>ביטול</a>
                </ButtonsContainer>
            </Form>
        </RegFormContainer>
        );
      }

      Registration.propTypes = {
        userRegistration: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired
      };
      
      const mapStateToProps = (state)=>({
        auth:state.auth,
        errors: state.errors
      });

      export default connect(mapStateToProps, { userRegistration })(withRouter(Registration))