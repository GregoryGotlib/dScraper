import React, {useEffect} from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HomeImgContainer, HomeContainer,HomeButtonsContainer } from './style';
import HomeImg from '../Images/President_Taft’s_1909_White_Steam_Car.png';

function Home(props) {
    
    useEffect(() => {
        if (props.auth.isAuthenticated){
            props.history.push('/dashboard');
        }
    })


    return (
        <HomeContainer>
            <Jumbotron>
                <h1>Hello, world!</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
                <HomeButtonsContainer>
                    <a id='reg_button' className='btn btn-info' href='/registration'>הרשם</a>
                    <a id='login_button' className='btn btn-success' href='/login'>התחבר</a>
                </HomeButtonsContainer>
            </Jumbotron>
            <HomeImgContainer src={HomeImg}/>
        </HomeContainer>
    )
}

Home.propTypes = {
auth: PropTypes.object.isRequired
};

const mapStateToProps = (state)=>({
auth:state.auth
});

export default connect(mapStateToProps)(Home);