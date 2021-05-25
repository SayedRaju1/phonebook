import { Box, Button, Container, InputBase, makeStyles, TextField, Typography } from '@material-ui/core';
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
        margin: '12vh 5vh 5vh 5vh ',
        color: theme.palette.primary.main,
        fontSize: '40px',
        fontWeight: 'Bold',
        textAlign: 'center'
    },
    login__box: {
        margin: '50px',
        padding: '20px 50px 20px 50px ',
        top: '248px',
        left: '630px',
        width: '660px',
        height: '585px',
        background: 'white',
        border: '1px solid #E0E0E0',
        borderRadius: '6px'
    },
    form_item: {
        marginBottom: '30px',
        fontSize: '20px',
        background: '#ffffff',
        height: '7vh',
        border: '1px solid #00955C',
        borderRadius: '6px',
        padding: '20px',
        color: '#00955C',
        '&::placeholder': {
            color: 'blue'
        }
    },
    form_button: {
        marginBottom: '20px',
        fontSize: '20px',
        fontWeight: 'Bold',
        height: '7vh',
        borderRadius: '6px',
        padding: '10px 20px 10px 20px ',
    },
    labels: {
        fontSize: '20px',
        fontWeight: 'Bold',
        marginBottom: '15px'
    },
    form: {
        padding: '0px 20px 30px 20px'
    }
}));

const Login = () => {
    const classes = useStyles();
    const history = useHistory()

    const [loginInfo, setLoginInfo] = useState({})
    const [isAuthenticated, setIsAuthenticated, loggedinUser, setLoggedinUser, token, setToken] = useContext(AuthContext);

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
                    setLoggedinUser(data.user)
                    setToken(data.token.accessToken)
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
                <form className={classes.form}>
                    <Typography color="primary" className={classes.labels}>Email address</Typography>
                    <InputBase
                        onChange={(e) => { setLoginInfo({ ...loginInfo, email: e.target.value }) }}
                        fullWidth
                        className={classes.form_item}
                        name="email"
                        placeholder="Enter email address"
                        variant="outlined"
                    />

                    <Typography color="primary" className={classes.labels}>Password</Typography>
                    <InputBase
                        onChange={(e) => { setLoginInfo({ ...loginInfo, password: e.target.value }) }}
                        fullWidth
                        className={classes.form_item}
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        variant="outlined"
                    />
                    <Button
                        className={classes.form_button}
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        color="primary"
                    >Login</Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;