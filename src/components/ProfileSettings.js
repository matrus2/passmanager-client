/* eslint-disable no-undef */
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel from 'material-ui/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from 'material-ui/ExpansionPanel/ExpansionPanelSummary';
import ExpansionPanelDetails from 'material-ui/ExpansionPanel/ExpansionPanelDetails';
import IconButton from 'material-ui/IconButton/IconButton';
import Icon from 'material-ui/Icon/Icon';
import ExpansionPanelActions from 'material-ui/ExpansionPanel/ExpansionPanelActions';

const styles = theme => ({
  textField: {
    margin: 0,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  settings: {
    marginLeft: 'auto',
    marginTop: 5,
  },
  panelActions: {
    justifyContent: 'center',
  },
});

const EDIT_ICON = 'mode_edit';
const CALL_ICON = 'call_made';

class ProfileSettings extends Component {
  state = {
    isDisabled: true,
    password: '',
    email: '',
    username: '',
    label: EDIT_ICON,
    isExpanded: false,
    isError: false,
    id: 'profile',
  };
  componentWillMount() {
    const { username, email } = this.props.user;
    this.setState({ username, email });
  }
  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    const { id } = this.state;
    if (error.desc && error.id === id) {
      this.setState({
        isError: true,
      });
    }
  }
  handleChange = prop => (event) => {
    this.setState({
      [prop]: event.target.value,
    });
  };
  handleEdit = () => {
    const {
      label, isDisabled, username, password, email,
    } = this.state;
    const isEdited = label === EDIT_ICON;
    if (isEdited) {
      this.setState({
        isDisabled: !isDisabled,
        label: CALL_ICON,
      });
    } else {
      this.props.changeUserCredentials({ username, password, email });
      this.setState({
        isDisabled: !isDisabled,
        label: EDIT_ICON,
        password: '',
      });
    }
  };
  handleLogout = () => {
    this.props.dispatchLogout();
  };
  handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    const answer = confirm('Please confirm to delete entire account with all passwords!!!!!');
    if (answer) {
      this.props.deleteUserRequest();
    }
  };
  expandPanel = () => {
    const { isExpanded, label, isDisabled } = this.state;
    const isEdited = label !== EDIT_ICON;
    this.setState({
      isDisabled: isEdited ? !isExpanded : isDisabled,
      isExpanded: !isExpanded,
      label: isExpanded && isEdited ? label : EDIT_ICON,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <ExpansionPanel onChange={this.expandPanel}>
        <ExpansionPanelSummary expandIcon={<Icon color="action">expand_more</Icon>}>
          <Typography type="headline" className={classes.panelHeader}>
            Passwords Manager
          </Typography>
          <Typography type="subheading" color="secondary" className={classes.settings}>
            Profile settings
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TextField
            label="Username"
            disabled
            value={this.state.username}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            label="New password"
            type="password"
            value={this.state.password}
            className={classes.textField}
            disabled={this.state.isDisabled}
            onChange={this.handleChange('password')}
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            value={this.state.email}
            className={classes.textField}
            margin="normal"
            disabled={this.state.isDisabled}
            onChange={this.handleChange('email')}
          />
          <IconButton color="primary" onClick={this.handleEdit}>
            <Icon>{this.state.label}</Icon>
          </IconButton>
          <IconButton onClick={this.handleDelete}>
            <Icon color="error">delete_forever</Icon>
          </IconButton>
          <IconButton color="accent" onClick={this.handleLogout}>
            <Icon>exit_to_app</Icon>
          </IconButton>
        </ExpansionPanelDetails>
        {this.state.isError && (
          <ExpansionPanelActions className={classes.panelActions}>
            <Typography color="error" type="caption">
              {this.props.error.desc}
            </Typography>
          </ExpansionPanelActions>
        )}
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(ProfileSettings);
