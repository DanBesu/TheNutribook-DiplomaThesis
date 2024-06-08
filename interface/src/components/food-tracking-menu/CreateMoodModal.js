import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ModalComponent from '../modal';
import MoodRecordService from '../../services/mood-record.service';
import MoodButtons from './MoodButtons'; // Adjust the import path as needed

const CreateMoodModal = ({ open, onClose }) => {
    const [selectedMood, setSelectedMood] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleSelectMood = (mood) => {
        setSelectedMood(mood);
    };

    const handleSaveMood = async () => {
        if (selectedMood !== null) {
            await MoodRecordService.create({
                userName: user.userName,
                moodLevel: selectedMood,
                timestamp: Date.now()
            });
            onClose();
        }
    };

    return (
        <ModalComponent open={open} onClose={onClose} width={400}>
            <Typography id="create-mood-modal" variant="h6" component="h2" textAlign="center">
                How do you feel?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                <MoodButtons moodLevel={1} emoji="🤢" color="red" tooltip="Really Bad" onSelect={handleSelectMood} />
                <MoodButtons moodLevel={2} emoji="🥱" color="orange" tooltip="Pretty Tired" onSelect={handleSelectMood} />
                <MoodButtons moodLevel={3} emoji="😶" color="yellow" tooltip="Decent" onSelect={handleSelectMood} />
                <MoodButtons moodLevel={4} emoji="😌" color="yellowgreen" tooltip="Fresh" onSelect={handleSelectMood} />
                <MoodButtons moodLevel={5} emoji="😁" color="green" tooltip="Fantastic!" onSelect={handleSelectMood} />
            </Box>
            {selectedMood && (
                <Typography textAlign="center" sx={{ mt: 2, fontSize: '2rem' }}>
                    {selectedMood === 1 ? "🤢" :
                    selectedMood === 2 ? "🥱" :
                    selectedMood === 3 ? "😶" :
                    selectedMood === 4 ? "😌" : "😁"}
                </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleSaveMood} disabled={selectedMood === null}>
                    Save
                </Button>
            </Box>
        </ModalComponent>
    );
};

export default CreateMoodModal;
