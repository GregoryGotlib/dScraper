import React, { useEffect } from 'react';
import { removeScrapedData } from '../Actions/ScrapperActions'
import { Table,Button } from 'react-bootstrap';
import { ResultContainer } from './style';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import { refreshUserData } from '../Actions/UserAction'

const ScrapedResult = (props) => {
        useEffect(() => {
            props.refreshUserData();
    },[props.auth.user.search.length])

        function renderScrapedData(){
            return (
                 props.auth.user.search.map((data,index) => {
                return (
                    <tr onClick={()=>handleTrClicked(data)}>
                        <td>{data.price}</td>
                        <td>{data.engineSize}</td>
                        <td>{data.owners}</td>
                        <td>{data.kilometers}</td>
                        <td>{data.year}</td>
                        <td>{data.title}</td>
                        <td>{index + 1}</td>
                    </tr>
                )
            }) 
            )
        }

        function handleTrClicked(data){
            window.open(data.link)
        }

        function handleResetSearch(){
            props.removeScrapedData();
        }

        return (
            props.auth.user ?
            <ResultContainer>
                <div className='welcome-label-container'>
                    <p className='user-name-welcome-label'>{props.auth.user.username}</p>
                    <p className='welcome-label'>:ברוך הבא</p>
                </div>
                <div className='result-table-container'>
                {props.auth.user.search && props.auth.user.search.length ? 
                <Table bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>מחיר</th>
                        <th>נפח מנוע</th>
                        <th>יד</th>
                        <th>קילומטראז'</th>
                        <th>שנה</th>
                        <th>יצרן</th>
                        <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                       {renderScrapedData()}
                    </tbody>
                    </Table> : <p>לא נמצאו תוצאות</p>}
                </div>
                {props.auth.user.search.length ? <Button variant='danger' onClick={handleResetSearch}>אפס חיפוש</Button> : ''}
            </ResultContainer> : <Spinner/>
        )
}

ScrapedResult.propTypes = {
    scraper: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    removeScrapedData: PropTypes.func

};
    
const mapStateToProps = (state)=>({
scraper:state.scraper,
auth:state.auth

});

export default connect(mapStateToProps,{ removeScrapedData,refreshUserData })(ScrapedResult);