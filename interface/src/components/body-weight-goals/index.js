import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import ModalComponent from '../modal';
import WeightRecordService from '../../services/weight-record.service';

const validationSchema = Yup.object().shape({
    bodyWeight: Yup.number().positive().required('Required'),
});

const BodyWeightGoals = () => {
    const [open, setOpen] = useState(false);
    const [bodyWeight, setBodyWeight] = useState(0);

    useEffect(() => {
        const fetchLastWeightRecord = async () => {
            try {
                const response = await WeightRecordService.getLastByUser();
                if (response.status === 'success' && response.data) {
                    setBodyWeight(response.data.weight);
                }
            } catch (error) {
                console.error('Failed to fetch the last weight record:', error);
            }
        };

        fetchLastWeightRecord();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async (values) => {
        localStorage.setItem('bodyWeight', values.bodyWeight);
        setBodyWeight(values.bodyWeight);

        try {
            const userToken = localStorage.getItem('token');
            await WeightRecordService.create(userToken, values.bodyWeight);
        } catch (error) {
            console.error('Failed to save the weight record:', error);
        }

        handleClose();
    };

    return (
        <Box sx={{ border: '1px solid', borderRadius: '8px', p: 2, textAlign: 'center', width: '250px', mt: 2 }}>
            <Typography variant="h6">Body Weight</Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>{bodyWeight} kg</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleOpen}>
                Edit
            </Button>
            <ModalComponent open={open} onClose={handleClose}>
                <Typography variant="h6" component="h2">Edit Body Weight</Typography>
                <Formik
                    initialValues={{ bodyWeight }}
                    validationSchema={validationSchema}
                    onSubmit={handleSave}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field
                                as={TextField}
                                id="bodyWeightInput"
                                label="Body Weight"
                                name="bodyWeight"
                                type="number"
                                fullWidth
                                sx={{ mt: 2 }}
                                error={touched.bodyWeight && !!errors.bodyWeight}
                                helperText={touched.bodyWeight && errors.bodyWeight}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{ mt: 2 }}
                            >
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </ModalComponent>
        </Box>
    );
};

export default BodyWeightGoals;
