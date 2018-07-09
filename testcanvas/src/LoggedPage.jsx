import React, { Component } from 'react';
import {Layout} from "./Layout";
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from "./theme";
import {Toolbar, Typography, withStyles, IconButton, Button,
    Drawer, List, ListItem, ListItemIcon, ListItemText, Divider,
    Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText,
    TextField, InputLabel, MenuItem, FormControl, Select, Snackbar} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Redirect} from 'react-router-dom';
import {Favorite} from '@material-ui/icons';
import firebase from './FirebaseConfig';
import {GraphFrame} from "./GraphFrame";

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    typography: {
        color: theme.palette.primary.text,
    },
    menuButton: {
        color: theme.palette.primary.text,
        marginLeft: -12,
        marginRight: 20,
    },
    logout: {
        color: theme.palette.primary.text,
        marginRight: -12,
        marginLeft: 10,
    },
    list: {
        width: 250,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    addPatient: {
        color: theme.palette.primary.text,
        marginLeft: '60%',
    },
    typo: {
        textAlign: "center",
    },
    textFields: {
        marginTop: 10,
        display: "block",
        width: 350,
    },
    dialogPatient: {
        minHeight: 600,
    }
};

class LoggedPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            firstNameUser: '',
            lastNameUser: '',
            email:'',
            password:'',
            firstName: '',
            lastName: '',
            openDrawer: false,
            toolbarTitle: 'Welcome',
            choiceMenu: '',
            isLogged: true,
            openDialog: false,
            emailValidation: true,
            passwordValidation: true,
            firstNameValidation: true,
            lastNameValidation: true,
            activePatient: '',
            currentPatient: {
                firstName: '',
                lastName: '',
                uid: '',
            },
            registerSnackBar: false,
            snackBarMessage: '',
            openGraph: '',
        };
        this.getUserInfos = this.getUserInfos.bind(this);
        this.handleCloseDrawer = this.handleCloseDrawer.bind(this);
        this.handleOpenDrawer = this.handleOpenDrawer.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleAddPatient = this.handleAddPatient.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleRegisterPatient = this.handleRegisterPatient.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.openECG = this.openECG.bind(this);
        this.openACCELERO = this.openACCELERO.bind(this);
        this.openBREATHING = this.openBREATHING.bind(this);
        this.openSPO2 = this.openSPO2.bind(this);
        this.openTEMPERATURE = this.openTEMPERATURE.bind(this);
    }

    getUserInfos(){
        let user = firebase.auth().currentUser;
        if(user) {
            firebase.database().ref('/users/' + user.uid).on('value', snapshot => {
                this.setState({
                    firstNameUser: snapshot.val().firstName,
                    lastNameUser: snapshot.val().lastName,
                });
            });
        }
    }

    componentDidMount(){
        this.getUserInfos();
    }

    handleCloseDrawer(){
        this.setState({
            openDrawer: false,
        });
    }

    handleOpenDrawer(){
        this.setState({
            openDrawer: true,
        });
    }

    handleLogOut(){
        firebase.auth().signOut();
        this.setState({
            isLogged: false,
        });
    }

    handleAddPatient(){
        this.setState({
            openDialog: true,
        });
    }

    handleCloseDialog(){
        this.setState({
            openDialog: false,
        });
    }
    handleChangeEmail(event){
        var regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regExpEmail.test(String(event.target.value).toLowerCase())){
            this.setState({
                email: event.target.value,
                emailValidation: true,
            });
        }else{
            this.setState({
                email: event.target.value,
                emailValidation: false,
            });
        }
    }
    handleChangePassword(event){
        if(event.target.value.length < 8 || event.target.value.length > 20){
            this.setState({
                password: event.target.value,
                passwordValidation: false,
            });
        }else{
            this.setState({
                password: event.target.value,
                passwordValidation: true,
            });
        }

    }
    handleChangeFirstName(event){
        if(event.target.value.length !== 0){
            this.setState({
                firstName: event.target.value,
                firstNameValidation: true,
            });
        }else{
            this.setState({
                firstName: event.target.value,
                firstNameValidation: false,
            });
        }

    }
    handleChangeLastName(event){
        if(event.target.value.length !== 0){
            this.setState({
                lastName: event.target.value,
                lastNameValidation: true,
            });
        }else{
            this.setState({
                lastName: event.target.value,
                lastNameValidation: false,
            });
        }
    }
    handleRegisterPatient(){
        var isSuccessful = true;
        var user = firebase.auth().currentUser;
        var doctorId = '';
        if(user){
            doctorId = user.uid;
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
            // Handle Errors here.
            isSuccessful = false;
            var errorMessage = error.message;
            this.displaySnackBarWithErrors(errorMessage);
        }).then(() => {
            if(isSuccessful) {
                var user = firebase.auth().currentUser;
                if (user) {
                    this.writePatientData(doctorId, user.uid, this.state.firstName, this.state.lastName, this.state.email);
                    this.setState({
                        welcome: true,
                        loginState: false,
                        registerState: false,
                        registerSnackBar: true,
                        snackBarMessage: 'Verification Email sent ! please verify your account'
                    });
                    //email verification
                    user.sendEmailVerification();
                    this.setState({
                        openDialog: false,
                    });
                    //firebase.auth().signOut();
                }
            }
        });
    }
    displaySnackBarWithErrors(errorMessage){
        if(errorMessage !== ''){
            this.setState({
                registerSnackBar: true,
                snackBarMessage: errorMessage,
            });
        }
    }

    writePatientData(doctorId, userId, firstName, lastName ,email) {
        firebase.database().ref('users/' + doctorId + '/patients/' + userId).set({
            email: email,
            firstName: firstName,
            lastName : lastName
        });
    }

    handleSelection = event => {
        this.setState({
            activePatient: event.target.value,
            currentPatient: {
                uid: event.target.value,
            }
        });
    };

    retrievePatientsList(doctorId){
        var patients = [];
        var i = 0;
        firebase.database().ref('users/' + doctorId + '/patients').on('value', snapshot => {
            snapshot.forEach(child => {
                patients[i] = child;
                i++;
            });
        });
        return patients;
    }

    openECG(){
        this.setState({
            openGraph: 'ECG',
            openDrawer:false,
        });
    }

    openACCELERO(){
        this.setState({
            openGraph: 'ACCELERO',
            openDrawer: false,
        });
    }

    openBREATHING(){
        this.setState({
            openGraph: 'BREATHING',
            openDrawer: false,
        });
    }

    openSPO2(){
        this.setState({
            openGraph: 'SPO2',
            openDrawer: false,
        });
    }

    openTEMPERATURE(){
        this.setState({
            openGraph: 'TEMPERATURE',
            openDrawer: false,
        });
    }

    render(){
        let {classes} = this.props;
        const isEnabled = this.state.email.length > 0 && this.state.password.length > 0;
        var patients = this.retrievePatientsList(firebase.auth().currentUser.uid);
        var items = '';
        patients.forEach(patient => {
            items = <MenuItem value={patient.key}/* + ' ' + patient.val().firstName + ' ' + patient.val().lastName}*/>{patient.val().firstName} {patient.val().lastName}</MenuItem>
        });
        var graph = '';
        if(this.state.openGraph !== '' && this.state.activePatient !== ''){
            graph = <GraphFrame idPatient={this.state.activePatient} openGraph={this.state.openGraph}/>;
        }
        if(this.state.isLogged) {
            return (
                <MuiThemeProvider theme={theme}>
                    <Layout footer="Data for life copyright 2018" appBar={
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
                                        onClick={this.handleOpenDrawer}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography className={classes.typography} variant="title" color="inherit">
                                {this.state.toolbarTitle} {this.state.firstNameUser} {this.state.lastNameUser}
                            </Typography>
                            <Button className={classes.addPatient} color="inherit" onClick={this.handleAddPatient}>Add patient</Button>
                            <Button className={classes.logout} color="inherit" onClick={this.handleLogOut}>Log
                                out</Button>
                        </Toolbar>}>

                        <Drawer open={this.state.openDrawer} onClose={this.handleCloseDrawer}>
                            <div tabIndex={0} role="button"
                                 onKeyDown={this.handleCloseDrawer}>
                                <div className={classes.drawerHeader}>
                                    <IconButton onClick={this.handleCloseDrawer}>
                                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                                    </IconButton>
                                </div>
                                <Divider/>
                                <div className={classes.list}>
                                    <List>
                                        <ListItem>
                                            <form className={classes.root} autoComplete="off">
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel>Patient</InputLabel>
                                                    <Select
                                                        onChange={this.handleSelection}
                                                        value={this.state.activePatient}>
                                                        {items}
                                                    </Select>
                                                </FormControl>
                                            </form>
                                        </ListItem>
                                        <ListItem button onClick={this.openECG}>
                                            <ListItemIcon>
                                                <Favorite/>
                                            </ListItemIcon>
                                            <ListItemText primary="ECG"/>
                                        </ListItem>
                                        <ListItem button onClick={this.openACCELERO}>
                                            <ListItemIcon>
                                                <Favorite/>
                                            </ListItemIcon>
                                            <ListItemText primary="Accelero"/>
                                        </ListItem>
                                        <ListItem button onClick={this.openBREATHING}>
                                            <ListItemIcon>
                                                <Favorite/>
                                            </ListItemIcon>
                                            <ListItemText primary="Breathing"/>
                                        </ListItem>
                                        <ListItem button onClick={this.openSPO2}>
                                            <ListItemIcon>
                                                <Favorite/>
                                            </ListItemIcon>
                                            <ListItemText primary="SpO2"/>
                                        </ListItem>
                                        <ListItem button onClick={this.openTEMPERATURE}>
                                            <ListItemIcon>
                                                <Favorite/>
                                            </ListItemIcon>
                                            <ListItemText primary="Temperature"/>
                                        </ListItem>
                                    </List>
                                </div>
                            </div>
                        </Drawer>

                        <Dialog
                            open={this.state.openDialog}
                            onClose={this.handleCloseDialog}
                            className={classes.dialogPatient}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">{"Add patient to your patients list"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    please provide patient informations :
                                </DialogContentText>
                                <TextField
                                    fullWidth
                                    className={classes.textFields}
                                    label="Enter your First Name"
                                    error={!this.state.firstNameValidation}
                                    helperText={(!this.state.firstNameValidation) ? "validation error" : "first name"}
                                    onChange = {(event) => this.handleChangeFirstName(event)}/>
                                <TextField
                                    fullWidth
                                    className={classes.textFields}
                                    label="Enter your Last Name"
                                    error={!this.state.lastNameValidation}
                                    helperText={(!this.state.lastNameValidation) ? "validation error" : "last name"}
                                    onChange = {(event) => this.handleChangeLastName(event)}/>
                                <TextField
                                    fullWidth
                                    className={classes.textFields}
                                    label="Enter your Email"
                                    type="email"
                                    error={!this.state.emailValidation}
                                    helperText={(!this.state.emailValidation) ? "validation error" : "email"}
                                    onChange = {(event) => this.handleChangeEmail(event)}/>
                                <TextField
                                    fullWidth
                                    className={classes.textFields}
                                    type = "password"
                                    label="Enter your Password"
                                    helperText={(!this.state.passwordValidation) ? "validation error" : "password"}
                                    error={!this.state.passwordValidation}
                                    onChange = {(event) => this.handleChangePassword(event)}/>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleCloseDialog} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.handleRegisterPatient} color="primary" autoFocus disabled={!isEnabled}>
                                    Register
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Snackbar anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',}} message={this.state.snackBarMessage}
                                  open={this.state.registerSnackBar} autoHideDuration={2000} action={<IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>}/>
                        {graph}
                    </Layout>
                </MuiThemeProvider>
            );
        }else{
            return (<Redirect to='/login'/>);
        }
    }
}

LoggedPage = withStyles(styles)(LoggedPage);

export {LoggedPage}