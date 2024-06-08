import React from 'react';
import { Tooltip, Fab } from '@mui/material';

const MoodButtons = ({ moodLevel, emoji, color, tooltip, onSelect }) => {
    return (
        <Tooltip title={tooltip} arrow>
            <Fab
                sx={{ backgroundColor: color, fontSize: '2rem' }} // Increase the font size
                onClick={() => onSelect(moodLevel)}
            >
                {emoji}
            </Fab>
        </Tooltip>
    );
};

export default MoodButtons;
