import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, Tooltip } from '@mui/material';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const FoodContainer = ({ name, date, initialCalories, initialProtein, initialFat, initialCarbs, quantity, onEdit, onDelete }) => {
    const calculatedCalories = (initialCalories * quantity) / 100;
    const calculatedProtein = (initialProtein * quantity) / 100;
    const calculatedFat = (initialFat * quantity) / 100;
    const calculatedCarbs = (initialCarbs * quantity) / 100;
    const time = moment(date).format('HH:mm');

    return (
        <Card sx={{ mb: 2, borderRadius: '16px', border: '1px solid #ccc', p: 1 }}>
            <CardContent>
                <Typography variant="caption" display="block" gutterBottom>
                    {time}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#333', mr: 1 }}>
                        {quantity} grams of
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 2 }}>
                        {name}:
                    </Typography>
                    <Box sx={{ textAlign: 'center', mx: 1 }}>
                        <Tooltip title={`For 100 grams: ${initialProtein}`} arrow placement="top">
                            <Box sx={{ backgroundColor: '#66bb6a', borderRadius: '8px', px: 1, color: 'white' }}>
                                {calculatedProtein.toFixed(1)}
                            </Box>
                        </Tooltip>
                        <Typography variant="caption" sx={{ color: '#666' }}>
                            Protein
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                        +
                    </Typography>
                    <Box sx={{ textAlign: 'center', mx: 1 }}>
                        <Tooltip title={`For 100 grams: ${initialCarbs}`} arrow placement="top">
                            <Box sx={{ backgroundColor: '#42a5f5', borderRadius: '8px', px: 1, color: 'white' }}>
                                {calculatedCarbs.toFixed(1)}
                            </Box>
                        </Tooltip>
                        <Typography variant="caption" sx={{ color: '#666' }}>
                            Carbs
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                        +
                    </Typography>
                    <Box sx={{ textAlign: 'center', mx: 1 }}>
                        <Tooltip title={`For 100 grams: ${initialFat}`} arrow placement="top">
                            <Box sx={{ backgroundColor: '#ef5350', borderRadius: '8px', px: 1, color: 'white' }}>
                                {calculatedFat.toFixed(1)}
                            </Box>
                        </Tooltip>
                        <Typography variant="caption" sx={{ color: '#666' }}>
                            Fat
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                        =
                    </Typography>
                    <Box sx={{ textAlign: 'center', mx: 1 }}>
                        <Tooltip title={`For 100 grams: ${initialCalories}`} arrow placement="top">
                            <Box sx={{ backgroundColor: '#ab47bc', borderRadius: '8px', px: 1, color: 'white' }}>
                                {calculatedCalories.toFixed(1)}
                            </Box>
                        </Tooltip>
                        <Typography variant="caption" sx={{ color: '#666' }}>
                            Calories
                        </Typography>
                    </Box>
                    <Box sx={{ ml: 'auto', display: 'flex' }}>
                        <IconButton onClick={onEdit} sx={{ ml: 1 }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={onDelete} sx={{ ml: 1 }}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FoodContainer;
