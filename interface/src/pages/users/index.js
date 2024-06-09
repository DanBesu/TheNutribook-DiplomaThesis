import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, IconButton, Card, CardContent, Tooltip } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ModalComponent from '../../components/modal';
import FoodContainer from '../../components/food-tracking-menu/FoodContainer';
import UserService from '../../services/user.service';
import FoodService from '../../services/food.service';
import moment from 'moment';

const UsersPage = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [users, setUsers] = useState([]);
    const [caloriesData, setCaloriesData] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUserFoods, setSelectedUserFoods] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await UserService.getAll();
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchCaloriesData = async () => {
            const dateObj = {
                day: currentDate.date(),
                month: currentDate.month() + 1,
                year: currentDate.year(),
            };

            const allCaloriesData = {};

            for (const user of users) {
                const response = await FoodService.getByUserNameAndDate({
                    userName: user.userName,
                    ...dateObj,
                });

                const foods = response.data;
                const totalCalories = foods.reduce((total, food) => {
                    return total + Math.round((food.calories * food.quantity) / 100);
                }, 0);

                allCaloriesData[user.userName] = totalCalories;
            }

            setCaloriesData(allCaloriesData);
        };

        if (users.length) {
            fetchCaloriesData();
        }
    }, [currentDate, users]);

    const handlePrevDay = () => {
        setCurrentDate(prevDate => moment(prevDate).subtract(1, 'days'));
    };

    const handleNextDay = () => {
        setCurrentDate(prevDate => moment(prevDate).add(1, 'days'));
    };

    const handleToday = () => {
        setCurrentDate(moment());
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleUserClick = async (userName) => {
        const dateObj = {
            day: currentDate.date(),
            month: currentDate.month() + 1,
            year: currentDate.year(),
        };

        const response = await FoodService.getByUserNameAndDate({
            userName,
            ...dateObj,
        });

        setSelectedUserFoods(response.data);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const filteredUsers = users.filter(user =>
        user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>Explore</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'center' }}>
                <IconButton onClick={handlePrevDay}>
                    <ArrowBackIcon />
                </IconButton>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        value={currentDate}
                        onChange={(newValue) => setCurrentDate(moment(newValue))}
                        renderInput={(params) => <TextField {...params} />}
                        disableFuture
                    />
                </LocalizationProvider>
                {currentDate.isBefore(moment(), 'day') && (
                    <IconButton onClick={handleNextDay}>
                        <ArrowForwardIcon />
                    </IconButton>
                )}
                <Tooltip title="Come back to the current day" arrow>
                    <IconButton onClick={handleToday} sx={{ ml: 2 }}>
                        <RestartAltIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <TextField
                label="Search by username"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ mb: 4 }}
            />
            <Box>
                {filteredUsers.map(user => (
                    caloriesData[user.userName] > 0 && (
                        <Card
                            key={user._id}
                            sx={{ mb: 2, border: '1px solid #ccc', borderRadius: '8px', boxShadow: 3, cursor: 'pointer' }}
                            onClick={() => handleUserClick(user.userName)}
                        >
                            <CardContent>
                                <Typography variant="h6">{user.userName}</Typography>
                                <Typography variant="body2">Total Calories: {caloriesData[user.userName]}</Typography>
                            </CardContent>
                        </Card>
                    )
                ))}
            </Box>
            <ModalComponent
                open={isModalOpen}
                onClose={handleCloseModal}
                width={600}
            >
                <Typography variant="h6">Foods for {currentDate.format('YYYY-MM-DD')}</Typography>
                <Box sx={{ maxHeight: '400px', overflowY: 'auto', mt: 2 }}>
                    {selectedUserFoods.length > 0 ? (
                        selectedUserFoods.map(food => (
                            <FoodContainer
                                key={food._id}
                                name={food.name}
                                timestamp={food.timestamp}
                                initialCalories={food.calories}
                                initialProtein={food.protein}
                                initialCarbs={food.carbs}
                                initialFat={food.fat}
                                quantity={food.quantity}
                                disableActions
                            />
                        ))
                    ) : (
                        <Typography>No foods recorded for this date.</Typography>
                    )}
                </Box>
            </ModalComponent>
        </Box>
    );
};

export default UsersPage;
