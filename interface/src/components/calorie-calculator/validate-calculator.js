const validateCalculator = (values) => {
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
};

export default validateCalculator;
