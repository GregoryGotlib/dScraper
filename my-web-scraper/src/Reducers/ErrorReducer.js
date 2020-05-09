export default function (state = {} , action){
    debugger
    switch(action.type){
        case 'ERRORS':
            return action.payload
        case 'RESET_ERRORS':
            return {};
        default: return state;
    }
}