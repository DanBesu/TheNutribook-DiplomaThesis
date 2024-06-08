import React from 'react';
import { Typography, Button, TextField, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ModalComponent from '../modal';

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    quantity: Yup.number().positive('Must be a positive number').required('Required'),
    calories: Yup.number().positive('Must be a positive number').required('Required'),
    protein: Yup.number().positive('Must be a positive number').required('Required'),
    carbs: Yup.number().positive('Must be a positive number').required('Required'),
    fat: Yup.number().positive('Must be a positive number').required('Required'),
});

const EditFoodModal = ({ open, onClose, initialValues, onSave }) => {
    return (
        <ModalComponent open={open} onClose={onClose} width={400}>
            <Typography id="edit-food-modal" variant="h6" component="h2" textAlign="center">
                Edit Food
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onSave(values);
                }}
            >
                {({ errors, touched, handleChange, values }) => (
                    <Form>
                        <Field
                            as={TextField}
                            fullWidth
                            margin="normal"
                            id="name"
                            name="name"
                            label="Food Name"
                            value={values.name}
                            onChange={handleChange}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                        />
                        <Field
                            as={TextField}
                            fullWidth
                            margin="normal"
                            id="quantity"
                            name="quantity"
                            label="Quantity (grams)"
                            value={values.quantity}
                            onChange={handleChange}
                            error={touched.quantity && Boolean(errors.quantity)}
                            helperText={touched.quantity && errors.quantity}
                        />
                        <Field
                            as={TextField}
                            fullWidth
                            margin="normal"
                            id="calories"
                            name="calories"
                            label="Calories"
                            value={values.calories}
                            onChange={handleChange}
                            error={touched.calories && Boolean(errors.calories)}
                            helperText={touched.calories && errors.calories}
                        />
                        <Field
                            as={TextField}
                            fullWidth
                            margin="normal"
                            id="protein"
                            name="protein"
                            label="Protein"
                            value={values.protein}
                            onChange={handleChange}
                            error={touched.protein && Boolean(errors.protein)}
                            helperText={touched.protein && errors.protein}
                        />
                        <Field
                            as={TextField}
                            fullWidth
                            margin="normal"
                            id="carbs"
                            name="carbs"
                            label="Carbs"
                            value={values.carbs}
                            onChange={handleChange}
                            error={touched.carbs && Boolean(errors.carbs)}
                            helperText={touched.carbs && errors.carbs}
                        />
                        <Field
                            as={TextField}
                            fullWidth
                            margin="normal"
                            id="fat"
                            name="fat"
                            label="Fat"
                            value={values.fat}
                            onChange={handleChange}
                            error={touched.fat && Boolean(errors.fat)}
                            helperText={touched.fat && errors.fat}
                        />
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-around' }}>
                            <Button variant="contained" color="primary" type="submit">
                                Save
                            </Button>
                            <Button variant="outlined" onClick={onClose}>
                                Cancel
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </ModalComponent>
    );
};

export default EditFoodModal;
