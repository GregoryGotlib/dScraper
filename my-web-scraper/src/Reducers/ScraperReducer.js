const initialState = {
    data:{}
}

export default function (state = initialState, action){
    switch(action.type){
        // case 'SCRAPED_DATA':
        // return{
        //     ...state,
        //     newScrapedData:action.payload
        //     }
        case 'GET_DATA':
        return{
            ...state,
            data:action.payload
            }
        case 'REMOVE_SCRAPED_DATA':
        return{
            ...state,
            }
        default: return state;
    }
}