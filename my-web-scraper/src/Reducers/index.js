import { combineReducers } from 'redux';
import ScraperReducer from './ScraperReducer';
import AuthReducer from './AuthReducer';
import ErrorReducer from './ErrorReducer';

export default combineReducers({
    scraper: ScraperReducer,
    auth:AuthReducer,
    errors:ErrorReducer
});