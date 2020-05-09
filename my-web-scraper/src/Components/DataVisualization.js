import React, {useEffect,useState} from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { getData } from '../Actions/ScrapperActions';
import { connect } from 'react-redux';
import ManufacturerData from './ManufacturerData';
import PropTypes from 'prop-types';


function DataVisualization(props) {

    useEffect(() => {
        props.getData();
    },[Object.keys(props.scraper.data).length])

    return (
        <div>
            <ManufacturerData scrapedData={props.scraper.data}/>
        </div>
    )
}
 
DataVisualization.propTypes = {
    getData:PropTypes.func
};

const mapStateToProps = (state)=>({
    scraper:state.scraper
});
    
export default connect(mapStateToProps, { getData })(DataVisualization);