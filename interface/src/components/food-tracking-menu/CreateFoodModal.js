import React from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import FoodService from '../../services/food.service';

const CreateFoodModal = ({ open, onClose, currentDate }) => {
    const initialValues = {
        name: '',
        quantity: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        quantity: Yup.number().positive('Must be a positive number').required('Required'),
        calories: Yup.number().positive('Must be a positive number').required('Required'),
        protein: Yup.number().positive('Must be a positive number').required('Required'),
        carbs: Yup.number().positive('Must be a positive number').required('Required'),
        fat: Yup.number().positive('Must be a positive number').required('Required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const currentTime = moment();
        const timestamp = currentDate.clone().hour(currentTime.hour()).minute(currentTime.minute()).second(currentTime.second()).valueOf();

        const foodData = {
            ...values,
            timestamp,
            userName: JSON.parse(localStorage.getItem('user')).userName
        };

        await FoodService.create(foodData);
        onClose();
        setSubmitting(false);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...modalStyle, p: 4 }}>
                <Typography variant="h6" component="h2">Add Food</Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Field as={TextField} name="name" label="Name" fullWidth />
                                <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
                                
                                <Field as={TextField} name="quantity" label="Quantity (grams)" fullWidth />
                                <ErrorMessage name="quantity" component="div" style={{ color: 'red' }} />

                                <Field as={TextField} name="calories" label="Calories" fullWidth />
                                <ErrorMessage name="calories" component="div" style={{ color: 'red' }} />

                                <Field as={TextField} name="protein" label="Protein" fullWidth />
                                <ErrorMessage name="protein" component="div" style={{ color: 'red' }} />

                                <Field as={TextField} name="carbs" label="Carbs" fullWidth />
                                <ErrorMessage name="carbs" component="div" style={{ color: 'red' }} />

                                <Field as={TextField} name="fat" label="Fat" fullWidth />
                                <ErrorMessage name="fat" component="div" style={{ color: 'red' }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                    <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                                        Save
                                    </Button>
                                    <Button variant="outlined" onClick={onClose}>
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px'
};

export default CreateFoodModal;
