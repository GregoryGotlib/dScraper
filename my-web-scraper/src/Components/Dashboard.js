import React, { useEffect } from 'react';
import { Form , Button , Tabs, Tab, TabContent} from 'react-bootstrap';
import { FormContainer ,TabContentContainer} from './style';
import Search from './Search'
import ScrapedResult from './ScrapedResult'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { refreshUserData } from '../Actions/UserAction'

const Dashboard = (props) => {

    useEffect(() => {
        props.refreshUserData();
    },[])

        return (
    <FormContainer>
        <Tabs defaultActiveKey="result" id="uncontrolled-tab-example">
            <Tab eventKey="result" title="תוצאות חיפוש">
                <TabContent >
                   <ScrapedResult/>
                </TabContent>
            </Tab>
            <Tab eventKey="search" title="חיפוש חדש">
                    <Search/>
            </Tab>
        </Tabs>
    </FormContainer>
    )
}

Dashboard.propTypes = {
    scraper: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    refreshUserData:PropTypes.func
};
    
const mapStateToProps = (state)=>({
    scraper:state.scraper,
    auth:state.auth
});

export default connect(mapStateToProps, {refreshUserData})(withRouter(Dashboard))
