import React from 'react';
import { Modal, Box } from '@mui/material';

const ModalComponent = ({ open, onClose, width = 400, children }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    p: 4,
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    margin: 'auto',
                    maxWidth: `${width}px`,
                    textAlign: 'center',
                    boxShadow: 24,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {children}
            </Box>
        </Modal>
    );
};

export default ModalComponent;
