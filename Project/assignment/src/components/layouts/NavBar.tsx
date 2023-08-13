import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation(); // Get the current location
    const isDashboardPage = location.pathname === '/dashboard';
    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'rgb(116, 96, 57);' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to='/'>Favourite NPM Packages</Link>
                </Typography>
                {isDashboardPage && (
                    <Button color="inherit" aria-label="View Favorites">
                        View Favorites <FavoriteIcon />
                    </Button>
                )}
            </Toolbar>

        </AppBar>
    );
}

export default NavBar;
