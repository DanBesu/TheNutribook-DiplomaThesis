import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ModalComponent from '../modal';
import MoodButtons from './MoodButtons'; // Adjust the import path as needed

const EditMoodModal = ({ open, onClose, initialMoodLevel, onSave }) => {
    const [selectedMood, setSelectedMood] = useState(initialMoodLevel);

    useEffect(() => {
        setSelectedMood(initialMoodLevel);
    }, [initialMoodLevel]);

    const handleSelectMood = (mood) => {
        setSelectedMood(mood);
    };

    const handleSaveMood = () => {
        if (selectedMood !== null) {
            onSave(selectedMood);
            onClose();
        }
    };

    return (
        <ModalComponent open={open} onClose={onClose} width={400}>
            <Typography id="edit-mood-modal" variant="h6" component="h2" textAlign="center">
                Edit Mood
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

export default EditMoodModal;
