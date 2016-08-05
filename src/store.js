import { 
  createStore, 
  combineReducers,
  applyMiddleware } from 'redux';
import thunk        from 'redux-thunk';

import data  from './data';
import view  from './view-state';


module.exports = createStore(
                    combineReducers( {data, view} ),
                    {},
                    applyMiddleware(thunk));