import React from 'react';
import { List, ListItem, ListItemText, Drawer, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import LogoutButton from '../logout-button';

const Menu = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
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
            <Box sx={{ overflow: 'auto' }}>
                <h2 style={{marginLeft: '10px'}}>🥝 Hi, {user.userName}</h2>
                <List>
                    {['home', 'reports', 'users'].map((text, index) => (
                        <ListItem 
                            key={text} 
                            component={Link} 
                            to={`/${text}`}
                            sx={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
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
