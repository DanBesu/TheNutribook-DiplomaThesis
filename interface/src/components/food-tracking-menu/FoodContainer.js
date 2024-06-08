import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Tooltip } from '@mui/material';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteFoodModal from './DeleteFoodModal';
import EditFoodModal from './EditFoodModal';

const FoodContainer = ({ name, timestamp, initialCalories, initialProtein, initialFat, initialCarbs, quantity, onEdit, onDelete }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleConfirmEdit = (updatedData) => {
        onEdit(updatedData);
        handleCloseEditModal();
    };

    return (
        <Card sx={{ mb: 2, borderRadius: '16px', border: '1px solid #ccc', p: 1 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ color: '#333', mr: 2 }}>
                    {time}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
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
                </Box>
                <Box sx={{ ml: 'auto', display: 'flex' }}>
                    <IconButton onClick={handleOpenEditModal} sx={{ ml: 1 }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleOpenDeleteModal} sx={{ ml: 1 }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardContent>
            <DeleteFoodModal
                open={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
            />
            <EditFoodModal
                open={isEditModalOpen}
                onClose={handleCloseEditModal}
                initialValues={{ name, quantity, calories: initialCalories, protein: initialProtein, carbs: initialCarbs, fat: initialFat }}
                onSave={handleConfirmEdit}
            />
        </Card>
    );
};

export default FoodContainer;
