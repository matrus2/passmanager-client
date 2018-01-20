/* eslint-disable no-undef */
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';

const styles = theme => ({
  card: {
    minWidth: 275,
    backgroundColor: theme.palette.background.default,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 211,
  },
  cardActions: {
    paddingBottom: 20,
    justifyContent: 'center',
  },
  buttonWWW: {
    marginLeft: 20,
  },
});

class SinglePassword extends Component {
  state = {
    name: '',
    login: '',
    password: '',
    url: '',
    id: '',
    editLabel: 'Edit',
    wwwLabel: 'WWW',
    isDisabled: true,
    isError: false,
    wasChanged: false,
  };
  handleChange = prop => (event) => {
    if (!this.state.wasChanged) this.setState({ wasChanged: true });
    this.setState({
      [prop]: event.target.value,
    });
  };
  handleWWW = () => {
    const {
      wwwLabel, name, login, password, id, url, wasChanged,
    } = this.state;
    if (wwwLabel === 'WWW') {
      window.open(this.state.url);
    } else if (wasChanged) {
      this.props.changePassword({
        name, login, password, id, url,
      });
      this.setState({ wasChanged: false });
    }
  };
  handleEdit = () => {
    const { isDisabled, editLabel, wasChanged } = this.state;
    const isEdited = editLabel === 'Edit';

    this.setState({
      isDisabled: !isDisabled,
      editLabel: isEdited ? 'Abort' : 'Edit',
      wwwLabel: isEdited ? 'Update' : 'WWW',
    });
    if (!isEdited && wasChanged) {
      this.setState({ wasChanged: false, ...this.props.password });
    }
    if (!isEdited) {
      this.setState({ wasChanged: false, ...this.props.password, isError: false });
    }
  };
  handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    const answer = confirm('Please confirm to delete password');
    if (answer) {
      this.props.deletePassword(this.state.id);
    }
  };

  componentWillMount() {
    this.setState({ ...this.props.password });
  }

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    const { isDisabled, id } = this.state;

    if (error.desc && error.id === id) {
      this.setState({
        isError: true,
      });
    } else if (!this.state.isDisabled) {
      this.setState({
        isDisabled: !isDisabled,
        editLabel: 'Edit',
        wwwLabel: 'WWW',
      });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      password, name, url, login, editLabel, wwwLabel,
    } = this.state;
    const shouldRenderWWWButton = url !== '' || wwwLabel === 'Update';

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="title" className={classes.title}>{name}</Typography>
          {this.state.isError && (
            <Typography color="error" type="caption">
              {this.props.error.desc}
            </Typography>
          )}
          <TextField
            label="Login"
            className={classes.textField}
            value={login}
            disabled={this.state.isDisabled}
            onChange={this.handleChange('login')}
            margin="normal"
          />
          <TextField
            label="Password"
            value={password}
            className={classes.textField}
            margin="normal"
            disabled={this.state.isDisabled}
            onChange={this.handleChange('password')}
          />
          <TextField
            label="Url"
            value={url}
            className={classes.textField}
            margin="normal"
            disabled={this.state.isDisabled}
            onChange={this.handleChange('url')}
          />
          {shouldRenderWWWButton &&
          <Button raised color="default" onClick={this.handleWWW} className={classes.buttonWWW}>
            {wwwLabel}
          </Button>
          }
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button raised color="primary" onClick={this.handleEdit}>
            {editLabel}
          </Button>
          <Button raised color="accent" onClick={this.handleDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(SinglePassword);

