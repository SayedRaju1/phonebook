import { Box, Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    login__container: {
        // height: '86vh',
        // width: '10px',
        // background: 'red',
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
    return (
        <Container className={classes.login__container}>
            <Box className={classes.login__box}>
                <Typography className={classes.login__header}>Welcome to Phonebook!</Typography>
                <form className={classes.root} noValidate autoComplete="off">
                    <Typography color="primary">Email address</Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter email address"
                        variant="outlined"
                    />
                    <Typography color="primary">Password</Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter password"
                        variant="outlined"
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary">Login</Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;