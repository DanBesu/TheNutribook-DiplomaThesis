import React from 'react';
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
    FormHelperText
} from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';

import Input from '../Input';

const ACTIVITY_LEVELS = {
    1: 'Basal Metabolic Rate (BMR)',
    2: 'Sedentary: little or no exercise',
    3: 'Light: exercise 1-3 times/week',
    4: 'Moderate: exercise 4-5 times/week',
    5: 'Active: daily exercise or intense exercise 3-4 times/week',
    6: 'Very Active: intense exercise 6-7 times/week',
    7: 'Extremely Active: very intense exercise daily, or physical job'
}

const ACTIVITY_MULTIPLIERS = {
    1: 1.0,
    2: 1.2,
    3: 1.375,
    4: 1.55,
    5: 1.725,
    6: 1.9,
    7: 2.1
}

// Male BMR Coefficients
const BMR_MALE_CONSTANT = 88.362;
const BMR_MALE_WEIGHT_COEFFICIENT = 13.397;
const BMR_MALE_HEIGHT_COEFFICIENT = 4.799;
const BMR_MALE_AGE_COEFFICIENT = 5.677;

// Female BMR Coefficients
const BMR_FEMALE_CONSTANT = 447.593;
const BMR_FEMALE_WEIGHT_COEFFICIENT = 9.247;
const BMR_FEMALE_HEIGHT_COEFFICIENT = 3.098;
const BMR_FEMALE_AGE_COEFFICIENT = 4.330;

const CalorieCalculator = () => {
    const submit = (values) => {
        const { age, gender, height, weight, activity } = values;

        // Convert values to numbers
        const ageNum = Number(age);
        const heightNum = Number(height);
        const weightNum = Number(weight);
        const activityLevel = Number(activity);

        // Calculate BMR based on gender
        let bmr;
        if (gender === 'male') {
            bmr = BMR_MALE_CONSTANT +
                  (BMR_MALE_WEIGHT_COEFFICIENT * weightNum) +
                  (BMR_MALE_HEIGHT_COEFFICIENT * heightNum) -
                  (BMR_MALE_AGE_COEFFICIENT * ageNum);
        } else if (gender === 'female') {
            bmr = BMR_FEMALE_CONSTANT +
                  (BMR_FEMALE_WEIGHT_COEFFICIENT * weightNum) +
                  (BMR_FEMALE_HEIGHT_COEFFICIENT * heightNum) -
                  (BMR_FEMALE_AGE_COEFFICIENT * ageNum);
        }

        // Apply activity multiplier
        const totalCalories = Math.floor(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);

        console.log(`Total daily calories ed: ${totalCalories}`);
        return totalCalories;
    }

    const validate = (values) => {
        const errors = {};

        if (!values.age) {
            errors.age = 'Age is required';
        } else if (!Number.isInteger(Number(values.age)) || Number(values.age) < 15 || Number(values.age) > 70) {
            errors.age = 'Age must be a positive integer between 15 and 70';
        }

        if (!values.gender) {
            errors.gender = 'Gender is required';
        }

        if (!values.height) {
            errors.height = 'Height is required';
        } else if (isNaN(Number(values.height)) || Number(values.height) <= 0) {
            errors.height = 'Height must be a positive number';
        }

        if (!values.weight) {
            errors.weight = 'Weight is required';
        } else if (isNaN(Number(values.weight)) || Number(values.weight) <= 0) {
            errors.weight = 'Weight must be a positive number';
        }

        if (!values.activity) {
            errors.activity = 'Activity level is required';
        }

        return errors;
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Calculator
            </Typography>
            <Formik
                initialValues={{
                    age: '',
                    gender: '',
                    height: '',
                    weight: '',
                    activity: '',
                }}
                validate={validate}
                onSubmit={(values) => {
                    const totalCalories = submit(values);
                    alert(`Total daily calories needed: ${totalCalories}`);
                }}
            >
                {({ errors, setFieldValue, values, touched, isValid }) =>
                    <Form>
                        <div className="input-container">
                            <Input
                                sx={{ width: '250px', margin: '10px' }}
                                error={!!errors.age && touched.age}
                                name="age"
                                label="Age"
                                helperText={touched.age && errors.age ? errors.age : 'Type your age'}
                            />
                        </div>
                        <FormControl error={!!errors.gender && touched.gender}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={values.gender}
                                onChange={(event) => setFieldValue('gender', event.target.value)}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                            {touched.gender && errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
                        </FormControl>
                        <div className="input-container">
                            <Input
                                sx={{ width: '250px', margin: '10px' }}
                                error={!!errors.height && touched.height}
                                name="height"
                                label="Height"
                                helperText={touched.height && errors.height ? errors.height : 'Type your height'}
                            />
                        </div>
                        <FormControl sx={{ m: 1, minWidth: 120 }} error={!!errors.activity && touched.activity}>
                            <InputLabel id="demo-simple-select-helper-label">Activity</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Activity"
                                value={values.activity}
                                onChange={(event) => setFieldValue('activity', event.target.value)}
                            >
                                {getActivityOptions()}
                            </Select>
                            <FormHelperText>{touched.activity && errors.activity ? errors.activity : 'Select your activity level'}</FormHelperText>
                        </FormControl>
                        <div className="input-container">
                            <Input
                                sx={{ width: '250px', margin: '10px' }}
                                error={!!errors.weight && touched.weight}
                                name="weight"
                                label="Weight"
                                helperText={touched.weight && errors.weight ? errors.weight : 'Type your weight'}
                            />
                        </div>
                        <Button
                            variant="contained"
                            type='submit'
                            className="submit-button"
                            disabled={!isValid} // Disabled if there are validation errors
                        >
                            Submit
                        </Button>
                    </Form>
                }
            </Formik>
        </div>
    );
}

export default CalorieCalculator;
