import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AppBar, Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import { makeStyles } from 'tss-react/mui';
import { CryptoState } from "../../CryptoContext";
import Tab from '@mui/material/Tab';
import { auth } from "../../firebase";
import SignUp from "./SignUp";
import Login from "./Login";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";


const useStyles = makeStyles()((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        color: "white",
        borderRadius: 10,
    },
    google: {
        padding: 24,
        paddingTop: 0,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: 20,
        fontSize: 20,
    },
}));

const AuthModal = () => {
    const { classes } = useStyles();
    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true); }
    const handleClose = () => { setOpen(false); }
    const [value, setValue] = useState(0);

    const { setAlert } = CryptoState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const googleProvider = new GoogleAuthProvider();
    googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                setAlert({
                    open: true,
                    message: `Sign Up Successful. Welcome ${res.user.email}`,
                    type: "success",
                });

                handleClose();
            })
            .catch((error) => {
                setAlert({
                    open: true,
                    message: error.message,
                    type: "error",
                });
                return;
            });
    };

    return (
        <>
            <div>
                <Button
                    variant="contained"
                    style={{
                        width: 85,
                        height: 40,
                        marginLeft: 15,
                        backgroundColor: "#30D5CD",
                    }}
                    onClick={handleOpen}
                >
                    Login
                </Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <AppBar
                                position="static"
                                style={{
                                    backgroundColor: "transparent",
                                    color: "white",
                                }}
                            >
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="fullWidth"
                                    style={{ borderRadius: 10 }}
                                >
                                    <Tab label="Login" />
                                    <Tab label="Sign Up" />
                                </Tabs>
                            </AppBar>
                            {value === 0 && <Login handleClose={handleClose} />}
                            {value === 1 && <SignUp handleClose={handleClose} />}
                            <Box className={classes.google}>
                                <span>OR</span>
                                {/* <GoogleButton
                                    style={{ width: "100%", outline: "none" }}
                                    onClick={signInWithGoogle}
                                /> */}
                                <Button style={{ width: "100%", outline: "none", backgroundColor: "rgb(53, 129, 255)", color: "white", height: "50px" }} onClick={signInWithGoogle} >Continue With Google</Button>
                            </Box>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </>
    );
}

export default AuthModal