import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Tooltip, Fab } from '@mui/material';
import { AddReaction } from '@mui/icons-material';
import MoodRecordService from '../../services/mood-record.service';
import moment from 'moment';

const CreateMoodModal = ({ open, onClose, currentDate }) => {
    const [selectedMood, setSelectedMood] = useState(null);

    const handleSave = async () => {
        if (!selectedMood) return;

        const currentTime = moment();
        const timestamp = currentDate.clone().hour(currentTime.hour()).minute(currentTime.minute()).second(currentTime.second()).valueOf();

        const moodData = {
            moodLevel: selectedMood,
            timestamp,
            userName: JSON.parse(localStorage.getItem('user')).userName
        };

        await MoodRecordService.create(moodData);
        onClose();
    };

    const moods = [
        { level: 1, icon: '🤢', color: 'red', label: 'Really Bad' },
        { level: 2, icon: '🥱', color: 'orange', label: 'Pretty Tired' },
        { level: 3, icon: '😶', color: 'yellow', label: 'Decent' },
        { level: 4, icon: '😌', color: 'yellowgreen', label: 'Fresh' },
        { level: 5, icon: '😁', color: 'green', label: 'Fantastic!' }
    ];

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...modalStyle, p: 4 }}>
                <Typography variant="h6" component="h2">How do you feel?</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                    {moods.map(mood => (
                        <Tooltip key={mood.level} title={mood.label} arrow>
                            <Fab
                                color={selectedMood === mood.level ? 'primary' : 'default'}
                                sx={{ backgroundColor: mood.color }}
                                onClick={() => setSelectedMood(mood.level)}
                            >
                                {mood.icon}
                            </Fab>
                        </Tooltip>
                    ))}
                </Box>
                {selectedMood && (
                    <Typography variant="h4" component="div" sx={{ mt: 2, textAlign: 'center' }}>
                        {moods.find(mood => mood.level === selectedMood).icon}
                    </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button variant="contained" color="primary" onClick={handleSave} disabled={!selectedMood}>
                        Save
                    </Button>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px'
};

export default CreateMoodModal;
