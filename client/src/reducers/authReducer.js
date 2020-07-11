import { FETCH_USER } from '../actions/types';

//when the application boots up state is null. Then it is either false or action.payload. It has 3 states we can play with
export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};
