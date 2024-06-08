import React from 'react';
import { Box, Typography, Button, TextField, Link } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ModalComponent from '../modal';

const validationSchema = Yup.object().shape({
    calories: Yup.number().positive().integer().min(100, 'Must be greater than 100').required('Required'),
    protein: Yup.number().positive().integer().required('Required'),
    carbs: Yup.number().positive().integer().required('Required'),
    fat: Yup.number().positive().integer().required('Required'),
});

const EditGoalsModal = ({ initialValues, onSave, onClose, open }) => {
    const handleCaloriesChange = (values, setFieldValue) => {
        const { calories, protein, carbs, fat } = values;

        if (calories && protein) {
            const remainingCalories = calories - 4 * protein;
            if (remainingCalories > 0) {
                const newFat = Math.max(0, remainingCalories / 9);
                const newCarbs = Math.max(0, (remainingCalories - newFat * 9) / 4);
                setFieldValue('carbs', Math.floor(newCarbs));
                setFieldValue('fat', Math.floor(newFat));
            }
        }
    }

    const handleProteinChange = (values, setFieldValue) => {
        handleCaloriesChange(values, setFieldValue);
    }

    const handleCarbsChange = (values, setFieldValue) => {
        const { calories, protein, carbs } = values;

        if (calories && protein && carbs) {
            const remainingCalories = calories - 4 * protein - 4 * carbs;
            const newFat = Math.max(0, remainingCalories / 9);
            setFieldValue('fat', Math.floor(newFat));
        }
    }

    const handleFatChange = (values, setFieldValue) => {
        const { calories, protein, fat } = values;

        if (calories && protein && fat) {
            const remainingCalories = calories - 4 * protein - 9 * fat;
            const newCarbs = Math.max(0, remainingCalories / 4);
            setFieldValue('carbs', Math.floor(newCarbs));
        }
    }

    return (
        <ModalComponent open={open} onClose={onClose} width={500}>
            <Typography variant="h6" component="h2">Edit Goals</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
                You should enter your total <b>calories</b> and <b>protein</b> goals first.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
                The <b>carbs</b> and <b>fat</b> will be automatically calculated based on the equation: <br/> <em>calories = 4 * protein + 4 * carbs + 9 * fat</em>.
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSave}
            >
                {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                        <Field
                            as={TextField}
                            label="Calories"
                            name="calories"
                            type="number"
                            fullWidth
                            sx={{ mt: 2 }}
                            error={touched.calories && !!errors.calories}
                            helperText={touched.calories && errors.calories}
                            onChange={(e) => {
                                setFieldValue('calories', e.target.value);
                                handleCaloriesChange({ ...values, calories: e.target.value }, setFieldValue);
                            }}
                        />
                        <Field
                            as={TextField}
                            label="Protein"
                            name="protein"
                            type="number"
                            fullWidth
                            sx={{ mt: 2 }}
                            error={touched.protein && !!errors.protein}
                            helperText={touched.protein && errors.protein}
                            onChange={(e) => {
                                setFieldValue('protein', e.target.value);
                                handleProteinChange({ ...values, protein: e.target.value }, setFieldValue);
                            }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Field
                                as={TextField}
                                label="Carbs"
                                name="carbs"
                                type="number"
                                fullWidth
                                sx={{ mr: 1 }}
                                error={touched.carbs && !!errors.carbs}
                                helperText={touched.carbs && errors.carbs}
                                onChange={(e) => {
                                    setFieldValue('carbs', e.target.value);
                                    handleCarbsChange({ ...values, carbs: e.target.value }, setFieldValue);
                                }}
                                disabled={!values.calories || !values.protein || values.calories < 100 || values.protein <= 0}
                            />
                            <Field
                                as={TextField}
                                label="Fat"
                                name="fat"
                                type="number"
                                fullWidth
                                sx={{ ml: 1 }}
                                error={touched.fat && !!errors.fat}
                                helperText={touched.fat && errors.fat}
                                onChange={(e) => {
                                    setFieldValue('fat', e.target.value);
                                    handleFatChange({ ...values, fat: e.target.value }, setFieldValue);
                                }}
                                disabled={!values.calories || !values.protein || values.calories < 100 || values.protein <= 0}
                            />
                        </Box>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
                            <div style={{marginRight: '40px'}}>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                The most studies recommend: <br/> 🍗 protein around 1.4 - 2.2 g/kg <br/> 🥑 fat around 1g/kg <br/> 🍚 carbs - the remaining calories
                            </Typography>
                            </div>
                            <div>
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    🔎 Resources:
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Link href="https://jissn.biomedcentral.com/articles/10.1186/1550-2783-4-8" target="_blank" rel="noopener">
                                        <em>BioMed</em>
                                    </Link>
                                    <Link href="https://academic.oup.com/nutritionreviews/article/79/1/66/5936522" target="_blank" rel="noopener">
                                        <em>Oxford Academic</em>
                                    </Link>
                                    <Link href="https://examine.com/guides/protein-intake/" target="_blank" rel="noopener">
                                        <em>Examine</em>
                                    </Link>
                                </Box>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ mt: 2 }}
                        >
                            Save Goals
                        </Button>
                    </Form>
                )}
            </Formik>
        </ModalComponent>
    );
}

export default EditGoalsModal;
