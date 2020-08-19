import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';
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

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  return dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
  console.log('im here');
  const res = await axios.get('/api/surveys');
  console.log(FETCH_SURVEYS, 'hi');
  return dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
