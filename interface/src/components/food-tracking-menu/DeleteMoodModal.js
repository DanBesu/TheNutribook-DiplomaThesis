import React from 'react';
import { Typography, Button, Box } from '@mui/material';

import ModalComponent from '../modal';

const DeleteMoodModal = ({ open, onClose, onConfirm }) => {
    return (
        <ModalComponent open={open} onClose={onClose} width={400}>
            <Typography id="delete-confirmation-modal" variant="h6" component="h2" textAlign="center">
                Delete Mood
            </Typography>
            <Typography id="delete-confirmation-description" sx={{ mt: 2 }} textAlign="center">
                Do you really want to delete this mood entry?
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-around' }}>
                <Button variant="contained" color="error" onClick={onConfirm}>
                    Delete
                </Button>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
            </Box>
        </ModalComponent>
    );
};

export default DeleteMoodModal;
