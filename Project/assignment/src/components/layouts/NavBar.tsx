import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const NavBar = () => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'rgb(116, 96, 57);' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Favourite NPM Packages
                </Typography>
            </Toolbar>

        </AppBar>
    );
}

export default NavBar;
