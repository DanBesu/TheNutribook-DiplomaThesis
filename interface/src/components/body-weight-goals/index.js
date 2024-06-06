import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import ModalComponent from '../modal';

const validationSchema = Yup.object().shape({
    bodyWeight: Yup.number().positive().required('Required'),
});

const BodyWeightGoals = () => {
    const [open, setOpen] = useState(false);
    const [bodyWeight, setBodyWeight] = useState(0);

    useEffect(() => {
        const storedBodyWeight = localStorage.getItem('bodyWeight');
        setBodyWeight(storedBodyWeight ? parseInt(storedBodyWeight, 10) : 0);
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = (values) => {
        localStorage.setItem('bodyWeight', values.bodyWeight);
        setBodyWeight(values.bodyWeight);
        handleClose();
    }

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
}

export default BodyWeightGoals;
