import axios from 'axios';
import { FETCH_USER } from './types';
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  console.log(token);

  //we are reusing the FETCH_USER because we essentially want back the user model because there we will update the credits
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: 'FETCH_USER', payload: res.data });
};
