import { combineReducers }  from 'redux';
import general              from './general';
import user                 from './user';
import entities             from './entities';
import rolezinho            from './rolezinho';

export default combineReducers({
    general,
    user,
    entities,
    rolezinho
})
