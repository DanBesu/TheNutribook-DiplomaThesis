import React from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FoodService from '../../services/food.service';

const CreateFoodModal = ({ open, onClose }) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        quantity: Yup.number().positive('Must be greater than zero').required('Required'),
        calories: Yup.number().positive('Must be greater than zero').required('Required'),
        protein: Yup.number().positive('Must be greater than zero').required('Required'),
        carbs: Yup.number().positive('Must be greater than zero').required('Required'),
        fat: Yup.number().positive('Must be greater than zero').required('Required'),
    });

    const handleFormSubmit = (values, { setSubmitting }) => {
        const user = JSON.parse(localStorage.getItem('user'));

        FoodService.create({
            userName: user.userName,
            name: values.name,
            quantity: values.quantity,
            calories: values.calories,
            protein: values.protein,
            carbs: values.carbs,
            fat: values.fat
        }).then(response => {
            console.log(response);
            setSubmitting(false);
            onClose();
        }).catch(error => {
            console.error('Error creating food:', error);
            setSubmitting(false);
        });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ width: 400, padding: 4, margin: 'auto', marginTop: '10%', backgroundColor: 'white', borderRadius: 2 }}>
                <Formik
                    initialValues={{ name: '', quantity: '', calories: '', protein: '', carbs: '', fat: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({ isSubmitting, isValid }) => (
                        <Form>
                            <Box mb={2}>
                                <Field name="name" as={TextField} label="Name" fullWidth />
                                <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
                            </Box>
                            <Box mb={2}>
                                <Field name="quantity" as={TextField} label="Quantity (g)" fullWidth type="number" />
                                <ErrorMessage name="quantity" component="div" style={{ color: 'red' }} />
                            </Box>
                            <Box mb={2}>
                                <Field name="calories" as={TextField} label="🥘 Calories for 100g" fullWidth type="number" sx={{ input: { color: '#ab47bc' }, '& label.Mui-focused': { color: '#ab47bc' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#ab47bc' } } }} />
                                <ErrorMessage name="calories" component="div" style={{ color: 'red' }} />
                            </Box>
                            <Box mb={2}>
                                <Field name="protein" as={TextField} label="🍖 Protein for 100g" fullWidth type="number" sx={{ input: { color: '#66bb6a' }, '& label.Mui-focused': { color: '#66bb6a' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#66bb6a' } } }} />
                                <ErrorMessage name="protein" component="div" style={{ color: 'red' }} />
                            </Box>
                            <Box mb={2}>
                                <Field name="carbs" as={TextField} label="🍚 Carbs for 100g" fullWidth type="number" sx={{ input: { color: '#42a5f5' }, '& label.Mui-focused': { color: '#42a5f5' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#42a5f5' } } }} />
                                <ErrorMessage name="carbs" component="div" style={{ color: 'red' }} />
                            </Box>
                            <Box mb={2}>
                                <Field name="fat" as={TextField} label="🥑 Fat for 100g" fullWidth type="number" sx={{ input: { color: '#ef5350' }, '& label.Mui-focused': { color: '#ef5350' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#ef5350' } } }} />
                                <ErrorMessage name="fat" component="div" style={{ color: 'red' }} />
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Button variant="outlined" onClick={onClose}>Cancel</Button>
                                <Button type="submit" variant="contained" color="primary" disabled={!isValid || isSubmitting}>Save</Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default CreateFoodModal;
