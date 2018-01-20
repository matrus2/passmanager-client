/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { addPassword, changePassword, deletePassword, fetchPasswords } from './../actions/managePasswords';
import { fetchUserInfo, changeUserCredentials, deleteUserRequest } from './../actions/manageUsers';
import { dispatchLogout } from './../actions/logout';
import AddPasswordComponent from './AddPassword';
import SinglePasswordComponent from './SinglePassword';
import ProfileSettings from './ProfileSettings';

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100%',
    marginTop: theme.spacing.unit,
  },
  paper: {
    margin: theme.spacing.unit * 3,
  },
});

class Passwords extends Component {
  componentDidMount() {
    const {
      user, accessData, fetchPasswords,
    } = this.props;

    if (accessData.access_token && user.username) {
      fetchPasswords();
    }
  }

  render() {
    const {
      accessData, classes, passwords, error, addPassword, user,
      changePassword, deletePassword, fetchPasswords, changeUserCredentials,
      deleteUserRequest, dispatchLogout,
    } = this.props;
    if (!accessData.access_token) {
      return <Redirect to="/login" />;
    }
    return (

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Paper elevation={4} xs={12} sm={7} className={classes.paper}>
          <ProfileSettings
            changeUserCredentials={changeUserCredentials}
            deleteUserRequest={deleteUserRequest}
            dispatchLogout={dispatchLogout}
            user={user}
            error={error}
          />
          {passwords &&
              Object.entries(passwords).map(([key, value]) =>
                (<SinglePasswordComponent
                  key={key.toString()}
                  password={value}
                  changePassword={changePassword}
                  deletePassword={deletePassword}
                  fetchPasswords={fetchPasswords}
                  error={error}
                />))}
          <AddPasswordComponent addPassword={addPassword} error={error} user={user} />
        </Paper>

      </Grid>
    );
  }
}

export default withStyles(styles)(connect(
  state => state,
  {
    fetchPasswords,
    fetchUserInfo,
    addPassword,
    changePassword,
    deletePassword,
    changeUserCredentials,
    deleteUserRequest,
    dispatchLogout
  },
)(Passwords));
