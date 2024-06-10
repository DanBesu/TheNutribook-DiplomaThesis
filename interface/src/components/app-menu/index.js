import React from 'react';
import { List, ListItem, ListItemText, Drawer, Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import LogoutButton from '../logout-button';

const Menu = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const location = useLocation();

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
            }}
        >
            <Box sx={{ overflow: 'auto', padding: '20px' }}>
                <Typography 
                    variant="h4" 
                    component="div" 
                    sx={{ fontWeight: 'bold',  marginBottom: '12px' }}
                >
                    The Nutribook
                </Typography>
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ marginLeft: '10px' }}
                >
                    🥝 Hi, {user.userName}
                </Typography>
                <List>
                    {['home', 'reports', 'users'].map((text) => (
                        <ListItem 
                            key={text} 
                            component={Link} 
                            to={`/${text}`}
                            sx={{
                                textDecoration: 'none', 
                                color: 'inherit', 
                                cursor: 'pointer', 
                                backgroundColor: location.pathname === `/${text}` ? '#e8f5e9' : 'inherit',
                                '&:hover': {
                                    backgroundColor: '#c8e6c9',
                                },
                                '&:active': {
                                    backgroundColor: '#a5d6a7',
                                },
                            }}
                        >
                            <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} />
                        </ListItem>
                    ))}
                </List>
                <LogoutButton />
            </Box>
        </Drawer>
    );
}

export default Menu;
