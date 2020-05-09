import axios from 'axios';

export const goGetThemTiger = (data,history) => dispatch => {
    window.alert('תודה, כרגע מתבצע החיפוש, פעולה זאת יכולה לקחת כמה דקות ברגע שימצאו תוצאות, תקבל מייל לכתובת שהכנסת בתהליך הרישום.שים לב שחיפוש חדש יתאפר רק בעוד שעה.')
    axios.post('/api/scraping',data).then(res =>{
        history.go()
    }).catch(error=>
            dispatch({
                type:'ERRORS',
                payload:error.response.data
            })    
        );
};

export const getAnotherRequest = (data,history) => dispatch =>{
    axios.post('/api/scraping/insertdata',data).then(res =>{
        console.log('getAnotherRequest',res)
    }).catch(error=>
        dispatch({
            type:'ERRORS',
            payload:error.response.data
        })    
    );
}


export const getData = () => dispatch =>{
    debugger;
    axios.get('/api/scraping/data').then(res =>{
        dispatch({
            type:'GET_DATA',
            payload:res.data
        })    
    }).catch(error=>
        dispatch({
            type:'ERRORS',
            payload:error.response.data
        })    
    );
}

export const removeScrapedData = () =>  dispatch =>{
    if(window.confirm('האם אתה בטוח שאתה רוצה לאפס את החיפוש?')){

    axios.delete('/api/scraping').then(res =>
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
    }
};
