import axios from 'axios';
import { API_ENDPOINT } from './appConstants';
// actions type
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_RESPONSE = 'GET_USER_RESPONSE';
export const FAIL_USER_RESPONSE = 'FAIL_USER_RESPONSE';
export const POST_USER_RESPONSE = 'POST_USER_RESPONSE';
export const PUT_USER_RESPONSE = 'PUT_USER_RESPONSE';
export const DELETE_USER_RESPONSE = 'DELETE_USER_RESPONSE';

function getUserInfo(data) {
  return {
    type: GET_USER_RESPONSE,
    data,
  };
}

function postUser() {
  return {
    type: POST_USER_RESPONSE,
  };
}
function deleteUser() {
  return {
    type: DELETE_USER_RESPONSE,
  };
}

function putUser(user) {
  return {
    type: PUT_USER_RESPONSE,
    user,
  };
}

function doRequest() {
  return {
    type: GET_USER_REQUEST,
  };
}

function failedRequest(desc, id = '') {
  return {
    type: FAIL_USER_RESPONSE,
    desc,
    id,
  };
}
export const fetchUserInfo = (login, accessToken) => async (dispatch) => {
  dispatch(doRequest());
  try {
    const data = await axios({
      method: 'get',
      url: `users/${login}`,
      baseURL: API_ENDPOINT,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(getUserInfo(data.data));
  } catch (e) {
    dispatch(failedRequest());
  }
};

export const registerNewUser = user => async (dispatch) => {
  dispatch(doRequest());
  try {
    await axios({
      method: 'post',
      url: 'users',
      baseURL: API_ENDPOINT,
      headers: {
        'Content-type': 'application/json',
      },
      data: {
        ...user,
      },
    });
    dispatch(postUser());
  } catch (e) {
    dispatch(failedRequest(e.response.data));
  }
};

export const changeUserCredentials = user => async (dispatch, getState) => {
  const { accessData } = getState();
  dispatch(doRequest());
  try {
    await axios({
      method: 'put',
      url: `users/${user.username}`,
      baseURL: API_ENDPOINT,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessData.access_token}`,
      },
      data: {
        ...user,
      },
    });
    dispatch(putUser(user));
  } catch (e) {
    dispatch(failedRequest(e.response.data, 'profile'));
  }
};

export const deleteUserRequest = () => async (dispatch, getState) => {
  const { accessData, user } = getState();
  dispatch(doRequest());
  try {
    await axios({
      method: 'delete',
      url: `users/${user.username}`,
      baseURL: API_ENDPOINT,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessData.access_token}`,
      },
      data: {
        ...user,
      },
    });
    dispatch(deleteUser());
  } catch (e) {
    dispatch(failedRequest(e.response.data, 'profile'));
  }
};
