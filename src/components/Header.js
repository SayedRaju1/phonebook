import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    header: {
        margin: '0px -23px 0px -23px',
        padding: ' 10px 40px 10px 40px',
        // border: '1px solid red',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 2px 5px 2px #4EB99029'
    },
    logo: {
        color: theme.palette.primary.main,
        fontSize: '50px',
        fontWeight: 'Bold',
        // border: '1px solid red'
    },
    header__login: {
        color: theme.palette.primary.main,
        fontSize: '20px',
        fontWeight: 'Bold',
        // border: '1px solid red'
    }
}));

const Header = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="xl sm md lg">
            <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.header}>
                <Typography className={classes.logo}>Phonebook</Typography>
                <Typography className={classes.header__login}>Login</Typography>
            </Box>
        </Container>
    );
};

export default Header;