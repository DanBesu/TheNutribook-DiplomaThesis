const ACTIVITY_MULTIPLIERS = {
    1: 1.0,
    2: 1.2,
    3: 1.375,
    4: 1.55,
    5: 1.725,
    6: 1.9,
    7: 2.1
};

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

const calculateCalories = (formValues) => {
    const { age, gender, height, weight, activity } = formValues;

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
    const totalCalories = bmr * ACTIVITY_MULTIPLIERS[activityLevel];

    return Math.floor(totalCalories);
};

export default calculateCalories;
