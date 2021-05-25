import { Avatar, InputBase, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../App';
import { db } from '../firebase';

const useStyles = makeStyles((theme) => ({
    create_contact: {
        // border: '1px solid red',
        width: '89%',
        backgroundColor: theme.palette.primary.main,
        textAlign: 'center',
        color: 'white',
        padding: '17px',
        borderRadius: '6px',
        marginBottom: '10px',
        fontSize: '20px',
        fontWeight: 'Bold',
        cursor: 'pointer'
    },
    contact: {
        // border: '1px solid red',
        width: '89%',
        backgroundColor: theme.palette.secondary.main,
        textAlign: 'center',
        color: theme.palette.primary.main,
        padding: '17px',
        borderRadius: '6px',
        fontSize: '20px',
        fontWeight: 'Bold'
    },
    header_cells: {
        color: theme.palette.primary.main,
        fontSize: '20px',
        fontWeight: 'Bold'
    },
    body_cells: {
        color: theme.palette.primary.main,
        fontSize: '20px',
        border: '0'
    },
    body_row: {

        '&:hover': {
            background: '#E5FAF2',
            borderRadius: '15px'
        },
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        marginRight: '10px'
    },
    table_grid: {
        padding: '50px 40px 40px 40px',
        backgroundColor: 'white',
        border: '1px solid #E0E0E0',
        borderRadius: '6px'
    },
    button_grid: {
        padding: '0px 30px 0px 30px'
    },
    contacts_count: {
        color: theme.palette.primary.main,
        fontSize: '20px',
        fontWeight: 'Bold',
        margin: '20px',
        opacity: '50%'
    },
    form: {
        padding: '20px'
    },
    form_item: {
        marginBottom: '20px',
        fontSize: '20px',
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
        height: '7vh',
        borderRadius: '6px',
        padding: '10px 20px 10px 20px ',
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginTop: theme.spacing(5),
        background: theme.palette.primary.main,
        fontSize: '60px',
        marginLeft: '20px'
    },
}));

const Contacts = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated, loggedinUser, setLoggedinUser, token, setToken] = useContext(AuthContext);
    const [newContactInfo, setNewContactInfo] = useState({})
    const [allContacts, setAllContacts] = useState([])
    const [contactCount, setContactCount] = useState(0)


    useEffect(() => {
        const contactList = []
        db.collection(`Contact`)
            .get()
            .then((res) => {
                setAllContacts([])
                res.forEach((doc) => {
                    // console.log(doc.data());
                    if (doc.data().userId === loggedinUser.id) {
                        contactList.push(doc.data())
                        // console.log(contactList);
                    }
                })
                setAllContacts(contactList)
                setContactCount(contactList.length)
            });

    }, [loggedinUser])


    console.log(allContacts);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newContactInfo);
        fetch('https://we-skillz-phonebook-task.herokuapp.com/api/v1/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newContactInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                handleClose()
                alert('New Contact Created')
            })
    }

    return (
        <Container maxWidth="xl sm md lg">
            <Grid container style={{ marginTop: '60px' }}>
                <Grid display="flex" justifyContent="center" className={classes.button_grid} item lg={3} md={3} xl={3} xs={12} >
                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Box className={classes.create_contact} onClick={handleClickOpen}>+ Create Contact</Box>
                        <Box className={classes.contact}>Contacts</Box>
                    </Box>
                </Grid>
                <Grid className={classes.table_grid} item lg={9} md={9} xl={9} xs={12}>
                    <TableContainer>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.header_cells} align="left">Name</TableCell>
                                    <TableCell className={classes.header_cells} align="left">Phone number</TableCell>
                                    <TableCell className={classes.header_cells} align="left">Email adderss</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <Typography
                                    className={classes.contacts_count}>
                                    {'Contacts' + " " + '(' + contactCount + ')'}
                                </Typography>
                                {allContacts.map((row) => (
                                    <TableRow className={classes.body_row}>
                                        <TableCell
                                            className={classes.body_cells}
                                            align="left">
                                            <Box display="flex" alignItems="center">
                                                <Avatar className={classes.avatar}>
                                                    {row.firstName.charAt(0)}
                                                </Avatar>
                                                {row.firstName + " " + row.lastName}
                                            </Box>
                                        </TableCell>
                                        <TableCell className={classes.body_cells} align="left">{row.phoneNumber}</TableCell>
                                        <TableCell className={classes.body_cells} align="left">{row.address}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent className={classes.dialog}>
                    <Avatar className={classes.large}>J</Avatar>
                    <form className={classes.form}>
                        <Grid container>
                            <Grid item lg={6} md={6} xl={6} xs={12}>
                                <InputBase
                                    className={classes.form_item}
                                    onChange={(e) => { setNewContactInfo({ ...newContactInfo, firstName: e.target.value }) }}
                                    fullWidth
                                    name="name"
                                    placeholder="First Name"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item lg={6} md={6} xl={6} xs={12}>
                                <InputBase
                                    className={classes.form_item}
                                    onChange={(e) => { setNewContactInfo({ ...newContactInfo, lastName: e.target.value }) }}
                                    fullWidth
                                    name="name"
                                    placeholder="Last Name"
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>

                        <InputBase
                            className={classes.form_item}
                            onChange={(e) => { setNewContactInfo({ ...newContactInfo, phoneNumber: e.target.value }) }}
                            fullWidth
                            name="phone"
                            placeholder="Phone Number"
                            variant="outlined"
                        />

                        <InputBase
                            className={classes.form_item}
                            onChange={(e) => { setNewContactInfo({ ...newContactInfo, address: e.target.value, userId: loggedinUser.id }) }}
                            fullWidth
                            name="email"
                            placeholder="Email address"
                            variant="outlined"
                        />

                        <Button
                            className={classes.form_button}
                            onClick={handleSubmit}
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                        >Create</Button>

                        <Button
                            className={classes.form_button}
                            style={{ border: '1px solid #BFBFBF', boxShadow: '0px 0px 0px', color: '#7E7E7E' }}
                            onClick={handleClose}
                            fullWidth
                            variant="contained"
                            color="secondary"
                        >Cancel</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default Contacts;