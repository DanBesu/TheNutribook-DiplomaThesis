import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

import EditGoalsModal from '../edit-goals-modal.js';

const CalorieGoals = () => {
    const [open, setOpen] = useState(false);
    const [totalCalories, setTotalCalories] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);
    const [carbs, setCarbs] = useState(0);

    useEffect(() => {
        const storedCalories = localStorage.getItem('calorieCount');
        const storedProtein = localStorage.getItem('proteinGoal');
        const storedFat = localStorage.getItem('fatGoal');
        const storedCarbs = localStorage.getItem('carbsGoal');

        setTotalCalories(storedCalories ? parseInt(storedCalories, 10) : 0);
        setProtein(storedProtein ? parseInt(storedProtein, 10) : 0);
        setFat(storedFat ? parseInt(storedFat, 10) : 0);
        setCarbs(storedCarbs ? parseInt(storedCarbs, 10) : 0);
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = (values) => {
        localStorage.setItem('calorieCount', values.calories);
        localStorage.setItem('proteinGoal', values.protein);
        localStorage.setItem('fatGoal', values.fat);
        localStorage.setItem('carbsGoal', values.carbs);
        setTotalCalories(values.calories);
        setProtein(values.protein);
        setFat(values.fat);
        setCarbs(values.carbs);
        handleClose();
    }

    return (
        <Box sx={{ border: '1px solid', borderRadius: '8px', p: 2, textAlign: 'center', width: '250px' }}>
            <Typography variant="h6">Goals</Typography>
            <Typography variant="h4" sx={{ mt: 1, color: '#ab47bc' }}>{totalCalories}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Box>
                    <Typography variant="h5" sx={{ color: '#66bb6a' }}>{protein}</Typography>
                    <Typography variant="body2">Protein</Typography>
                </Box>
                <Box>
                    <Typography variant="h5" sx={{ color: '#ef5350' }}>{fat}</Typography>
                    <Typography variant="body2">Fat</Typography>
                </Box>
                <Box>
                    <Typography variant="h5" sx={{ color: '#42a5f5' }}>{carbs}</Typography>
                    <Typography variant="body2">Carbs</Typography>
                </Box>
            </Box>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleOpen}>
                Edit Goals
            </Button>
            <EditGoalsModal
                initialValues={{ calories: totalCalories, protein, carbs, fat }}
                onSave={handleSave}
                onClose={handleClose}
                open={open}
            />
        </Box>
    );
}

export default CalorieGoals;
