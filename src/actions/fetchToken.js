import axios from 'axios';
import { API_ENDPOINT } from './appConstants';
// actions type
export const AUTHORIZE = 'AUTHORIZE';
export const START_REQUEST = 'START_REQUEST';
export const NOT_AUTHORIZE = 'NOT_AUTHORIZE';

function doAuthorize(data) {
  return {
    type: AUTHORIZE,
    data,
  };
}

function notAuthorize(desc) {
  return {
    type: NOT_AUTHORIZE,
    desc,
  };
}

function doRequest() {
  return {
    type: START_REQUEST,
  };
}

export const fetchAccessToken = (login, password) => async (dispatch) => {
  dispatch(doRequest());
  try {
    const data = await axios({
      method: 'post',
      auth: {
        username: 'trusted-app',
        password: 'secret',
      },
      url: 'oauth/token',
      baseURL: API_ENDPOINT,
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
      data: `grant_type=password&username=${login}&password=${password}`,
    });
    dispatch(doAuthorize(data.data));
  } catch (e) {
    console.log(e);
    dispatch(notAuthorize(e.response.data.error_description));
  }
};
