import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, IconButton, Tooltip, Fab } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddIcon from '@mui/icons-material/Add';
import FoodService from '../../services/food.service';
import moment from 'moment';
import FoodContainer from './FoodContainer'; // Adjust the import path as needed
import CreateFoodModal from './CreateFoodModal'; // Adjust the import path as needed

const FoodTrackingMenu = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [foods, setFoods] = useState([]);
    const [currentTotalCals, setCurrentTotalCals] = useState(0);
    const [currentTotalProtein, setCurrentTotalProtein] = useState(0);
    const [currentTotalCarbs, setCurrentTotalCarbs] = useState(0);
    const [currentTotalFat, setCurrentTotalFat] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const updateTotals = (foods) => {
        let totalCals = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFat = 0;

        foods.forEach(food => {
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

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        fetchFoods(currentDate); // Fetch foods again after closing modal
    };

    const handleEdit = () => {
        // Future functionality for editing a food entry
        console.log('Edit clicked');
    };

    const handleDelete = () => {
        // Future functionality for deleting a food entry
        console.log('Delete clicked');
    };

    return (
        <Box sx={{ mr: 4 }}>
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
                <Fab color="primary" aria-label="add" onClick={handleOpenModal}>
                    <AddIcon />
                </Fab>
            </Box>
            {foods.map((food, index) => (
                <FoodContainer 
                    key={index}
                    name={food.name}
                    timestamp={food.timestamp}
                    initialCalories={food.calories}
                    initialProtein={food.protein}
                    initialCarbs={food.carbs}
                    initialFat={food.fat}
                    quantity={food.quantity}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
            <CreateFoodModal open={isModalOpen} onClose={handleCloseModal} />
        </Box>
    );
}

export default FoodTrackingMenu;
