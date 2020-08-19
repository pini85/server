import { FETCH_SURVEYS } from '../actions/types';
import { actionTypes } from 'redux-form';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
};
