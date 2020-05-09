import React, {useEffect,useState} from 'react'
import PropTypes from 'prop-types';
import  { randomColor }  from 'randomcolor';
import { Bar  } from 'react-chartjs-2';

export default function ManufacturerData(props) {
    const [dataObject, setDataObject] = useState({});

    useEffect(() => {
        if(Object.keys(props.scrapedData).length){
            generateManufacturerData();
        }
    },[Object.keys(props.scrapedData).length])
    
    function generateManufacturerData(){
        let scrapedData = props.scrapedData
        let dataResult = [];
        let result = [];
        let labelResult = [];
        let colorsResult = [];

            scrapedData.forEach((elem)=>{
                let temp = scrapedData.filter(val => val.manufacturerId == elem.manufacturerId)
                if(result.indexOf(elem.manufacturerId) == -1){
                    result.push(elem.manufacturerId)
                    dataResult.push(temp.length);
                    labelResult.push(elem.manufacturerName);
                    colorsResult.push(randomColor())
                }
            })
        setDataObject({dataResult,labelResult,colorsResult});
    }
    
    return (
        <div>
             <Bar data={{
                labels: dataObject.labelResult,
                datasets:[{
                    label:'יצרן מוביל',
                    data:dataObject.dataResult,
                    backgroundColor:dataObject.colorsResult
                }]}}
                height={'100px'}
                width={'100px'}
                />
        </div>
    )
}
 
ManufacturerData.propTypes = {
    Data:PropTypes.array
};
