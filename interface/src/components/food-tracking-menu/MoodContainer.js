import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, CardContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditMoodModal from './EditMoodModal';
import DeleteMoodModal from './DeleteMoodModal';

const moodDetails = {
    1: { emoji: "🤢", color: "red", text: "Really Bad" },
    2: { emoji: "🥱", color: "orange", text: "Pretty Tired" },
    3: { emoji: "😶", color: "yellow", text: "Decent" },
    4: { emoji: "😌", color: "yellowgreen", text: "Fresh" },
    5: { emoji: "😁", color: "green", text: "Fantastic!" },
};

const MoodContainer = ({ id, moodLevel, timestamp, onEdit, onDelete }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const mood = moodDetails[moodLevel];

    return (
        <Card sx={{ mb: 2, borderRadius: '16px', border: '1px solid #ccc', p: 1, backgroundColor: mood?.color, height: '80px', alignItems: 'center' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '1rem', marginRight: '8px' }}>
                    {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <Typography sx={{ fontSize: '2rem', marginRight: '10px' }}>
                        {mood.emoji}
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', marginLeft: '10px' }}>
                        {mood.text}
                    </Typography>
                </Box>
                <Box sx={{ ml: 'auto', display: 'flex' }}>
                    <IconButton onClick={handleOpenEditModal}>
                        <EditIcon />
                    </IconButton>
                    <IconButton sx={{ml: '6px'}} onClick={handleOpenDeleteModal}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardContent>

            <EditMoodModal
                open={isEditModalOpen}
                onClose={handleCloseEditModal}
                initialMoodLevel={moodLevel}
                onSave={(updatedMoodLevel) => onEdit(id, updatedMoodLevel)}
            />
            <DeleteMoodModal
                open={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={() => onDelete(id)}
            />
        </Card>
    );
};

export default MoodContainer;
