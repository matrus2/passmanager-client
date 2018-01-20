import axios from 'axios';
import { API_ENDPOINT } from './appConstants';
// actions type
export const GET_PASSWORDS = 'GET_PASSWORDS';
export const POST_PASSWORD = 'POST_PASSWORD';
export const DELETE_PASSWORD = 'DELETE_PASSWORD';
export const PASSWORD_REQUEST = 'PASSWORD_REQUEST';
export const PASSWORD_FAIL = 'PASSWORD_FAIL';
export const PUT_PASSWORD = 'PUT_PASSWORD';

function getPasswords(data) {
  return {
    type: GET_PASSWORDS,
    data,
  };
}

function postPassword() {
  return {
    type: POST_PASSWORD,
  };
}
function putPassword(password) {
  return {
    type: PUT_PASSWORD,
    password,
  };
}

function delPassword(passwordId) {
  return {
    type: DELETE_PASSWORD,
    passwordId,
  };
}

function doRequest() {
  return {
    type: PASSWORD_REQUEST,
  };
}

function failedRequest(desc, id = '') {
  return {
    type: PASSWORD_FAIL,
    desc,
    id,
  };
}

export const fetchPasswords = () => async (dispatch, getState) => {
  const { user, accessData } = getState();
  dispatch(doRequest());
  try {
    const data = await axios({
      method: 'get',
      url: `passwords/${user.username}`,
      baseURL: API_ENDPOINT,
      headers: {
        'Content-type': 'application/application/json',
        Authorization: `Bearer ${accessData.access_token}`,
      },
    });
    dispatch(getPasswords(data.data));
  } catch (e) {
    console.log(e);
    dispatch(failedRequest(e.response));
  }
};

export const addPassword = password => async (dispatch, getState) => {
  const { user, accessData } = getState();
  dispatch(doRequest());
  try {
    await axios({
      method: 'post',
      url: `passwords/${user.username}`,
      baseURL: API_ENDPOINT,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessData.access_token}`,
      },
      data: {
        ...password,
      },
    });
    dispatch(postPassword());
    dispatch(fetchPasswords());
  } catch (e) {
    dispatch(failedRequest(e.response.data, 'add'));
  }
};
export const changePassword = password => async (dispatch, getState) => {
  const { user, accessData } = getState();
  dispatch(doRequest());
  try {
    await axios({
      method: 'put',
      url: `passwords/${user.username}/${password.id}`,
      baseURL: API_ENDPOINT,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessData.access_token}`,
      },
      data: {
        ...password,
      },
    });
    dispatch(putPassword(password));
  } catch (e) {
    console.log(e);
    dispatch(failedRequest(e.response.data, password.id));
  }
};

export const deletePassword = passwordID => async (dispatch, getState) => {
  const { user, accessData } = getState();
  dispatch(doRequest());
  try {
    await axios({
      method: 'delete',
      url: `passwords/${user.username}/${passwordID}`,
      baseURL: API_ENDPOINT,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessData.access_token}`,
      },
    });
    dispatch(delPassword(passwordID));
    setTimeout(() => { dispatch(fetchPasswords()); }, 1000);
  } catch (e) {
    dispatch(failedRequest(e.response.data));
  }
};
