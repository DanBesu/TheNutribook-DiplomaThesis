import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, IconButton, Tooltip, Fab } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddIcon from '@mui/icons-material/Add';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import FoodService from '../../services/food.service';
import MoodRecordService from '../../services/mood-record.service';
import moment from 'moment';
import FoodContainer from './FoodContainer';
import MoodContainer from './MoodContainer';
import CreateFoodModal from './CreateFoodModal';
import CreateMoodModal from './CreateMoodModal';

const FoodTrackingMenu = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [foods, setFoods] = useState([]);
    const [moods, setMoods] = useState([]);
    const [currentTotalCals, setCurrentTotalCals] = useState(0);
    const [currentTotalProtein, setCurrentTotalProtein] = useState(0);
    const [currentTotalCarbs, setCurrentTotalCarbs] = useState(0);
    const [currentTotalFat, setCurrentTotalFat] = useState(0);
    const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
    const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    const fetchFoods = async (date) => {
        const dateObj = {
            userName: user.userName,
            day: date.date(),
            month: date.month() + 1,
            year: date.year(),
        };
        const response = await FoodService.getByUserNameAndDate(dateObj);
        setFoods(response.data);
        updateTotals(response.data);
    };

    const fetchMoods = async (date) => {
        const dateObj = {
            userName: user.userName,
            day: date.date(),
            month: date.month() + 1,
            year: date.year(),
        };
        const response = await MoodRecordService.getAllByUserNameAndDate(dateObj);
        setMoods(response.data);
    };

    const updateTotals = (foods) => {
        let totalCals = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFat = 0;

        foods?.forEach(food => {
            totalCals += Math.round((food.calories * food.quantity) / 100);
            totalProtein += Math.round((food.protein * food.quantity) / 100);
            totalCarbs += Math.round((food.carbs * food.quantity) / 100);
            totalFat += Math.round((food.fat * food.quantity) / 100);
        });

        setCurrentTotalCals(totalCals);
        setCurrentTotalProtein(totalProtein);
        setCurrentTotalCarbs(totalCarbs);
        setCurrentTotalFat(totalFat);
    };

    useEffect(() => {
        fetchFoods(currentDate);
        fetchMoods(currentDate);
    }, [currentDate]);

    const handlePrevDay = () => {
        setCurrentDate(prevDate => moment(prevDate).subtract(1, 'days'));
    };

    const handleNextDay = () => {
        setCurrentDate(prevDate => moment(prevDate).add(1, 'days'));
    };

    const handleToday = () => {
        setCurrentDate(moment());
    };

    const handleOpenFoodModal = () => {
        setIsFoodModalOpen(true);
    };

    const handleCloseFoodModal = () => {
        setIsFoodModalOpen(false);
        fetchFoods(currentDate); // Fetch foods again after closing modal
    };

    const handleOpenMoodModal = () => {
        setIsMoodModalOpen(true);
    };

    const handleCloseMoodModal = () => {
        setIsMoodModalOpen(false);
        fetchMoods(currentDate); // Fetch moods again after closing modal
    };

    const handleEditFood = async (id, updatedData) => {
        await FoodService.update(id, updatedData);
        fetchFoods(currentDate);
    };

    const handleDeleteFood = async (id) => {
        await FoodService.delete(id);
        fetchFoods(currentDate);
    };

    const handleEditMood = async (id, updatedMoodLevel) => {
        await MoodRecordService.update(id, { moodLevel: updatedMoodLevel });
        fetchMoods(currentDate);
    };

    const handleDeleteMood = async (id) => {
        await MoodRecordService.delete(id);
        fetchMoods(currentDate);
    };

    const combinedEntries = [
        ...(foods?.length ? foods : []), 
        ...(moods?.length ? moods : [])
    ].sort((a, b) => a.timestamp - b.timestamp);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', mr: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={handlePrevDay}>
                        <ArrowBackIcon />
                    </IconButton>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            value={currentDate}
                            onChange={(newValue) => setCurrentDate(moment(newValue))}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <IconButton onClick={handleNextDay}>
                        <ArrowForwardIcon />
                    </IconButton>
                    <Tooltip title="Come back to the current day" arrow>
                        <IconButton onClick={handleToday} sx={{ ml: 2 }}>
                            <RestartAltIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Typography sx={{ mx: 2, display: 'flex', alignItems: 'center', fontSize: '1.4rem', fontWeight: 'bold' }}>
                    Totals: 
                    <span style={{ color: '#66bb6a', marginLeft: '12px' }}>{currentTotalProtein}</span>
                    <span style={{ marginLeft: '5px', marginRight: '5px' }}>+</span>
                    <span style={{ color: '#42a5f5' }}>{currentTotalCarbs}</span>
                    <span style={{ marginLeft: '5px', marginRight: '5px' }}>+</span>
                    <span style={{ color: '#ef5350'  }}>{currentTotalFat}</span>
                    <span style={{ marginLeft: '5px', marginRight: '5px' }}>=</span>
                    <span style={{ color: '#ab47bc' }}>{currentTotalCals}</span>
                </Typography>
                <Box>
                    <Fab color="primary" aria-label="add" onClick={handleOpenFoodModal} sx={{ mr: 1 }}>
                        <AddIcon />
                    </Fab>
                    <Fab color="success" aria-label="add-mood" onClick={handleOpenMoodModal}>
                        <AddReactionIcon />
                    </Fab>
                </Box>
            </Box>
            <Box sx={{ maxHeight: '600px', overflowY: 'auto', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                {combinedEntries.length === 0 ? (
                    <Typography textAlign="center" sx={{ my: 4 }}>There are no entries for this day</Typography>
                ) : combinedEntries.map((entry, index) => (
                    entry.name ? (
                        <FoodContainer 
                            key={index}
                            name={entry.name}
                            timestamp={entry.timestamp}
                            initialCalories={entry.calories}
                            initialProtein={entry.protein}
                            initialCarbs={entry.carbs}
                            initialFat={entry.fat}
                            quantity={entry.quantity}
                            onEdit={(updatedData) => handleEditFood(entry._id, updatedData)}
                            onDelete={() => handleDeleteFood(entry._id)}
                        />
                    ) : (
                        <MoodContainer 
                            key={index}
                            id={entry._id}
                            moodLevel={entry.moodLevel}
                            timestamp={entry.timestamp}
                            onEdit={handleEditMood}
                            onDelete={handleDeleteMood}
                        />
                    )
                ))}
            </Box>
            <CreateFoodModal open={isFoodModalOpen} onClose={handleCloseFoodModal} />
            <CreateMoodModal open={isMoodModalOpen} onClose={handleCloseMoodModal} />
        </Box>
    );
}

export default FoodTrackingMenu;
