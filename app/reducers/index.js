import { combineReducers }  from 'redux';
import general              from './general'
import user                 from './user'

export default combineReducers({
    general,
    user
})
