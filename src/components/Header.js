import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Container, MenuItem, Select, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from "../CryptoContext";
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const useStyles = makeStyles()(() => ({
    title: {
        flex: 1,
        color: "#30D5CD",
        fontFamily: "Montserrat!important;",
        fontWeight: "bold!important;",
        cursor: "pointer",
    },
}));

function Header() {
    const { classes } = useStyles();
    const navigate = useNavigate();

    const { currency, setCurrency, user } = CryptoState()

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme} >
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography onClick={() => navigate("/")} variant="h6" className={classes.title}>Crypo Tracker</Typography>
                        <Select variant="outlined"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currency}
                            style={{ width: 100, height: 40, marginLeft: 15 }}
                            onChange={(e) => setCurrency(e.target.value)}>
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'INR'}>INR</MenuItem>
                        </Select>
                        {user ? <UserSidebar /> : <AuthModal />}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default Header;
