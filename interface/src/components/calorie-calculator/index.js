import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import {
    Typography,
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
    FormHelperText,
    Divider,
    Box
} from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import { Height, FitnessCenter, Accessibility } from '@mui/icons-material';

import calculateCalories from '../../utils/calorie-calculator';
import Input from '../Input';
import validateCalculator from './validate-calculator';

const ACTIVITY_LEVELS = {
    1: 'Basal Metabolic Rate (BMR)',
    2: 'Sedentary: little or no exercise',
    3: 'Light: exercise 1-3 times/week',
    4: 'Moderate: exercise 4-5 times/week',
    5: 'Active: daily exercise or intense exercise 3-4 times/week',
    6: 'Very Active: intense exercise 6-7 times/week',
    7: 'Extremely Active: very intense exercise daily, or physical job'
}

const CalorieCalculator = () => {
    const [totalCalories, setTotalCalories] = useState(null);

    const submit = (values) => {
        const calories = calculateCalories(values);
        setTotalCalories(calories);
        console.log(`Total daily calories needed: ${calories}`);
    }

    const saveCalories = () => {
        if (totalCalories !== null) {
            localStorage.setItem('calorieCount', totalCalories);
            alert(`Calorie count of ${totalCalories.toFixed(2)} saved to localStorage`);
        }
    }

    const getActivityOptions = () => {
        return Object.entries(ACTIVITY_LEVELS).map(
            (activityLevelPair) => {
                const level = activityLevelPair[0];
                const text = activityLevelPair[1];

                return (
                    <MenuItem key={level} value={level}>{text}</MenuItem>
                );
            }
        );
    }

    return (
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                Calorie Calculator
            </Typography>
            <Formik
                initialValues={{
                    age: '',
                    gender: '',
                    height: '',
                    weight: '',
                    activity: '',
                }}
                validate={validateCalculator}
                onSubmit={submit}
            >
                {({ errors, setFieldValue, values, touched, isValid }) =>
                    <Form>
                        <Box display="flex" alignItems="center">
                            <Accessibility sx={{ mr: 1 }} />
                            <div className="input-container">
                                <Input
                                    sx={{ width: '250px', margin: '10px' }}
                                    error={!!errors.age && touched.age}
                                    name="age"
                                    label="Age"
                                    helperText={touched.age && errors.age ? errors.age : 'Type your age'}
                                />
                            </div>
                        </Box>
                        <FormControl component="fieldset" error={!!errors.gender && touched.gender}>
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-label="gender"
                                name="gender"
                                value={values.gender}
                                onChange={(event) => setFieldValue('gender', event.target.value)}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                            {touched.gender && errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                        </FormControl>
                        <Box display="flex" alignItems="center">
                            <Height sx={{ mr: 1 }} />
                            <div className="input-container">
                                <Input
                                    sx={{ width: '250px', margin: '10px' }}
                                    error={!!errors.height && touched.height}
                                    name="height"
                                    label="Height"
                                    helperText={touched.height && errors.height ? errors.height : 'Type your height'}
                                />
                            </div>
                        </Box>
                        <FormControl sx={{ m: 1, minWidth: 120 }} error={!!errors.activity && touched.activity}>
                            <InputLabel id="activity-label">Activity</InputLabel>
                            <Select
                                labelId="activity-label"
                                id="activity-select"
                                label="Activity"
                                value={values.activity}
                                onChange={(event) => setFieldValue('activity', event.target.value)}
                            >
                                {getActivityOptions()}
                            </Select>
                            <FormHelperText>{touched.activity && errors.activity ? errors.activity : 'Select your activity level'}</FormHelperText>
                        </FormControl>
                        <Box display="flex" alignItems="center">
                            <FitnessCenter sx={{ mr: 1 }} />
                            <div className="input-container">
                                <Input
                                    sx={{ width: '250px', margin: '10px' }}
                                    error={!!errors.weight && touched.weight}
                                    name="weight"
                                    label="Weight"
                                    helperText={touched.weight && errors.weight ? errors.weight : 'Type your weight'}
                                />
                            </div>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box display="flex" justifyContent="center" gap={2}>
                            <Button
                                variant="contained"
                                type='submit'
                                className="submit-button"
                                disabled={!isValid}
                            >
                                Calculate
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={saveCalories}
                                disabled={totalCalories === null || !isValid}
                            >
                                Save
                            </Button>
                        </Box>
                        {totalCalories && (
                            <Box mt={2} textAlign="center">
                                <Typography variant="h6">
                                    Total Daily Calories Needed: {totalCalories.toFixed(2)}
                                </Typography>
                            </Box>
                        )}
                    </Form>
                }
            </Formik>
        </div>
    );
}

export default CalorieCalculator;
