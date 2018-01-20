import { combineReducers } from 'redux';
import { AUTHORIZE, NOT_AUTHORIZE } from './../actions/fetchToken';
import { GET_USER_RESPONSE, FAIL_USER_RESPONSE, PUT_USER_RESPONSE, DELETE_USER_RESPONSE, POST_USER_RESPONSE } from './../actions/manageUsers';
import { GET_PASSWORDS, PASSWORD_FAIL, POST_PASSWORD, PUT_PASSWORD, DELETE_PASSWORD } from './../actions/managePasswords';
import { USER_LOGOUT } from './../actions/logout';

const initialData = {
  accessData: {},
  user: { passwordFetched: false, wasRegistered: false },
  passwords: {},
  error: { isError: false, desc: '', id: '' },
};

const accessData = (state = initialData.accessData, action) => {
  switch (action.type) {
    case AUTHORIZE: {
      return Object.assign({}, state, action.data);
    }
    case USER_LOGOUT:
    case DELETE_USER_RESPONSE: {
      return { ...initialData.accessData }; }
    default: {
      return state;
    }
  }
};
const user = (state = initialData.user, action) => {
  switch (action.type) {
    case GET_USER_RESPONSE: {
      return Object.assign({}, state, action.data);
    }
    case POST_PASSWORD: {
      return Object.assign({}, state, { passwordFetched: true });
    }
    case PASSWORD_FAIL: {
      return Object.assign({}, state, { passwordFetched: true });
    }
    case POST_USER_RESPONSE: {
      return Object.assign({}, state, { wasRegistered: true });
    }
    case USER_LOGOUT:
    case DELETE_USER_RESPONSE: {
      return { ...initialData.user }; }
    default: {
      return state;
    }
  }
};
const passwords = (state = initialData.passwords, action) => {
  switch (action.type) {
    case GET_PASSWORDS: {
      const passwordsCol = Object.values(action.data).reduce(
        (acc, curr) =>
          ({
            ...acc,
            [curr.id]: { ...curr },
          })
        , {},
      );
      return { ...passwordsCol };
    }
    case PUT_PASSWORD: {
      const newState = state;
      newState[action.password.id] = action.password;
      return { ...newState };
    }
    case DELETE_PASSWORD: {
      const newState = state;
      delete newState[action.passwordId];
      return { ...newState };
    }
    case USER_LOGOUT:
    case DELETE_USER_RESPONSE: {
      return { ...initialData.passwords }; }
    default: {
      return state;
    }
  }
};
const error = (state = initialData.error, action) => {
  switch (action.type) {
    case NOT_AUTHORIZE:
    case FAIL_USER_RESPONSE:
    case PASSWORD_FAIL: {
      let errors = [];
      const subErrors = action.desc.subErrors ? action.desc.subErrors : false;
      if (!subErrors) {
        errors.push(typeof action.desc === 'string' ? action.desc : action.desc.errorMessage);
      } else {
        errors = action.desc.subErrors.map(err =>
          `${err.field}: ${err.message}`);
      }
      return Object.assign({}, state, { isError: true, desc: errors, id: action.id });
    }
    case AUTHORIZE:
    case PUT_USER_RESPONSE:
    case GET_PASSWORDS:
    case PUT_PASSWORD:
    case POST_PASSWORD: {
      if (state.isError) {
        return Object.assign({}, state, initialData.error);
      }
      return state;
    }
    case USER_LOGOUT:
    case DELETE_USER_RESPONSE: {
      return { ...initialData.error }; }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  accessData,
  user,
  error,
  passwords,
});
