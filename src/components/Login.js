import { Box, Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../App';

const useStyles = makeStyles((theme) => ({
    login__container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    login__header: {
        color: theme.palette.primary.main,
        fontSize: '40px',
        fontWeight: 'Bold',
        textAlign: 'center'
    },
    login__box: {
        margin: '20px',
        padding: '40px',
        top: '248px',
        left: '630px',
        width: '660px',
        height: '585px',
        background: 'white',
        border: '1px solid #E0E0E0',
        borderRadius: '6px',
        opacity: '1'
    }
}));

const Login = () => {
    const classes = useStyles();
    const history = useHistory()

    const [loginInfo, setLoginInfo] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);

    const handleSubmit = (e) => {
        fetch('https://we-skillz-phonebook-task.herokuapp.com/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setIsAuthenticated(true)
                    console.log(data);
                    history.push("/contacts")
                }
                if (data.message) {
                    alert('Incorrect email or password')
                }
            })
    };

    if (isAuthenticated) { history.push("/contacts") }
    return (
        <Container className={classes.login__container}>
            <Box className={classes.login__box}>
                <Typography className={classes.login__header}>Welcome to Phonebook!</Typography>
                <div className={classes.root} noValidate autoComplete="off">
                    <Typography color="primary">Email address</Typography>
                    <TextField
                        onChange={(e) => { setLoginInfo({ ...loginInfo, email: e.target.value }) }}
                        fullWidth
                        placeholder="Enter email address"
                        variant="outlined"
                    />
                    <Typography color="primary">Password</Typography>
                    <TextField
                        onChange={(e) => { setLoginInfo({ ...loginInfo, password: e.target.value }) }}
                        fullWidth
                        placeholder="Enter password"
                        variant="outlined"
                    />
                    <Button
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        color="primary"
                    >Login</Button>
                </div>
            </Box>
        </Container>
    );
};

export default Login;