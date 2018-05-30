import { combineReducers }  from 'redux';
import general              from './general';
import user                 from './user';
import entities             from './entities';
import rolezinho            from './rolezinho';
import commerce             from './commerce';
import search               from './search';

export default combineReducers({
    general,
    user,
    entities,
    rolezinho,
    commerce,
    search
})
