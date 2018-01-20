import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { fetchAccessToken } from './../actions/fetchToken';
import { fetchUserInfo, registerNewUser } from './../actions/manageUsers';

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100%',
    marginTop: 20,
  },
  form: {
    padding: 16,
    textAlign: 'center',
  },
  paper: {
    width: 450,
    margin: theme.spacing.unit * 3,
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  singleTabContent: {
    padding: 20,
    backgroundColor: theme.palette.grey[200],
  },
  secondaryTabContent: {
    padding: 20,
    backgroundColor: theme.palette.background.default,
  },
  tabColor: {
    backgroundColor: theme.palette.grey[200],
  },
  secondaryTabColor: {
    backgroundColor: theme.palette.background.default,
  },
  button: {
    margin: 20,
  },
});

class Login extends Component {
  state = {
    login: '',
    username: '',
    email: '',
    passwordRegister: '',
    password: '',
    badCredentials: false,
    value: 0,
    loginSubmitted: true,
  };
  onLogin = (e) => {
    e.preventDefault();
    const { login, password } = this.state;
    if (login !== '' && password !== '') {
      this.props.fetchAccessToken(login, password);
      this.setState({ loginSubmitted: true });
    }
  };
  onRegister = () => {
    const { username, email, passwordRegister } = this.state;
    if (username !== '' && email !== '' && passwordRegister !== '') {
      this.props.registerNewUser({ username, email, password: passwordRegister });
      this.setState({ loginSubmitted: false });
    }
  };
  handleChange = prop => (event) => {
    this.setState({
      [prop]: event.target.value,
      badCredentials: false,
    });
  };
  handleChangeTabs = (event, value) => {
    this.setState({ value });
  };
  componentWillReceiveProps(nextProps) {
    const { user: newUser, error, accessData } = nextProps;
    // eslint-disable-next-line no-shadow
    const { history, fetchUserInfo } = this.props;

    if (!newUser.username && accessData.access_token) {
      fetchUserInfo(this.state.login, accessData.access_token);
    }
    if (newUser.username) {
      history.push('/passwords');
    }
    if (error.desc) {
      this.setState({ badCredentials: true });
    }
    if (newUser.wasRegistered) {
      this.setState({ value: 0 });
    }
  }

  render() {
    const { classes, error } = this.props;
    const { value } = this.state;
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Paper xs={12} sm={4} className={classes.paper}>
          <AppBar color="default" position="static">
            <Tabs
              value={this.state.value}
              onChange={this.handleChangeTabs}
              indicatorColor="primary"
              fullWidth
            >
              <Tab className={classes.tabColor} label="Login" icon={<Icon color="action">directions_walk</Icon>} />
              <Tab
                className={classes.secondaryTabColor}
                label="Register"
                icon={<Icon color="action">person_add</Icon>}
              />
            </Tabs>
          </AppBar>
          {value === 0 &&
          <Paper elevation={4} className={classes.singleTabContent}>
            <Typography type="headline" className={classes.panelHeader}>
              Login Panel
            </Typography>
            <Grid
              container
              direction="column"
              justify="center"
              className={classes.form}
            >
              {this.state.badCredentials && this.state.loginSubmitted && (
                <Typography color="error" type="caption">
                  {error.desc}
                </Typography>
              )}
              <br />
              <TextField
                label="login"
                onChange={this.handleChange('login')}
                value={this.state.login}
              />
              <br />
              <TextField
                label="password"
                type="password"
                onChange={this.handleChange('password')}
                value={this.state.password}
              />
              <br />
              <Button raised color="primary" onClick={this.onLogin} className={classes.button}>
                Login
              </Button>
            </Grid>
          </Paper>
          }
          {value === 1 &&
          <Paper elevation={4} className={classes.secondaryTabContent}>
            <Typography type="headline" className={classes.panelHeader}>
              Register Panel
            </Typography>
            <Grid
              container
              direction="column"
              justify="center"
              className={classes.form}
            >
              {this.state.badCredentials && !this.state.loginSubmitted &&
                  error.desc.map(e => (
                    <Typography key={e.substring(1, 4)} color="error" type="caption">
                      {e}
                    </Typography>
                  ))}
              <br />
              <TextField
                label="username"
                onChange={this.handleChange('username')}
                value={this.state.username}
              />
              <br />
              <TextField
                label="email"
                type="email"
                onChange={this.handleChange('email')}
                value={this.state.email}
              />
              <br />
              <TextField
                label="password"
                type="password"
                onChange={this.handleChange('passwordRegister')}
                value={this.state.passwordRegister}
              />
              <br />
              <Button raised color="primary" onClick={this.onRegister} className={classes.button}>
                Register
              </Button>
            </Grid>
          </Paper>
          }
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(connect(
  state => state,
  { fetchAccessToken, fetchUserInfo, registerNewUser },
)(Login));

