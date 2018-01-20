import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  card: {
    minWidth: 275,
    backgroundColor: theme.palette.background.chip,
  },
  title: {
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
  },
  cardActions: {
    paddingBottom: 20,
    justifyContent: 'center',
  },
});

class AddPassword extends Component {
  state = {
    name: '',
    login: '',
    password: '',
    url: '',
    isError: false,
    id: 'add',
  };

  componentWillReceiveProps(nextProps) {
    const { error, user } = nextProps;
    if (error.desc && error.id === this.state.id) {
      this.setState({
        isError: true,
      });
    }
    if (user.passwordFetched) {
      this.setState({
        name: '',
        login: '',
        password: '',
        url: '',
        isError: false,
      });
    }
  }

  handleChange = prop => (event) => {
    this.setState({
      [prop]: event.target.value,
      isError: false,
    });
  };

  addNewPassword = (e) => {
    e.preventDefault();
    const {
      name, password, login, url,
    } = this.state;
    if (name && password && login) {
      this.props.addPassword({
        name, password, login, url,
      });
    }
  };

  render() {
    const { classes, error } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title}>Add new password</Typography>
          {this.state.isError && (
            <Typography color="error" type="caption">
              {error.desc}
            </Typography>
          )}
          <TextField
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <TextField
            label="Login"
            className={classes.textField}
            value={this.state.login}
            onChange={this.handleChange('login')}
            margin="normal"
          />
          <TextField
            label="Password"
            className={classes.textField}
            margin="normal"
            value={this.state.password}
            onChange={this.handleChange('password')}
          />
          <TextField
            label="Url with protocol"
            className={classes.textField}
            margin="normal"
            value={this.state.url}
            onChange={this.handleChange('url')}
          />
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button raised color="primary" onClick={this.addNewPassword}>
            Add
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(AddPassword);
