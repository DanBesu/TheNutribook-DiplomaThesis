import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Tooltip } from '@mui/material';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteFoodModal from './DeleteFoodModal'; // Adjust the import path as needed

const FoodContainer = ({ name, timestamp, initialCalories, initialProtein, initialFat, initialCarbs, quantity, onEdit, onDelete }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const calculatedCalories = Math.round((initialCalories * quantity) / 100);
    const calculatedProtein = Math.round((initialProtein * quantity) / 100);
    const calculatedFat = Math.round((initialFat * quantity) / 100);
    const calculatedCarbs = Math.round((initialCarbs * quantity) / 100);
    const time = moment(timestamp).format('HH:mm');

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = () => {
        onDelete();
        handleCloseDeleteModal();
    };

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
                                {calculatedProtein}
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
                                {calculatedCarbs}
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
                                {calculatedFat}
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
                                {calculatedCalories}
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
                        <IconButton onClick={handleOpenDeleteModal} sx={{ ml: 1 }}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
            <DeleteFoodModal
                open={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
            />
        </Card>
    );
};

export default FoodContainer;
