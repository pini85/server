import { FETCH_USER } from '../actions/types';
const initialState = {
  users: null,
};
//when the application boots up state is null. Then it is either false or action.payload. It has 3 states we can play with
export default (state = initialState, action) => {
  console.log(action.payload);

  switch (action.type) {
    case FETCH_USER:
      return { ...state, users: action.payload || false };
    default:
      return state;
  }
};
