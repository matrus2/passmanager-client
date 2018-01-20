export const USER_LOGOUT = 'USER_LOGOUT';

function userLogout() {
  return {
    type: USER_LOGOUT,
  };
}
export const dispatchLogout = () => (dispatch) => {
  dispatch(userLogout());
};
