import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import countReducer from './reducers/reducers';
import {UserReducer} from './reducers/UserReducer';

const rootReducer = combineReducers({countReducer, UserReducer});
// const configureStore = () => {
//   return createStore(rootReducer);
// };

const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));
export {store};
