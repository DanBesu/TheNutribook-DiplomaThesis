import React, { useState } from 'react';

import { Button } from '@mui/material';
import ModalComponent from '../../components/modal';
import CalorieCalculator from '../../components/calorie-calculator';
import CalorieGoals from '../../components/calorie-goals';

const Home = () => {
    const [isCalculatorModalOpen, setCalculatorModalOpen] = useState(false);

    const openCalculator = () => setCalculatorModalOpen(true);
    const closeCalculator = () => setCalculatorModalOpen(false);

    return (
        <div>
            <h1>Home</h1>
            <ModalComponent
                open={isCalculatorModalOpen}
                onClose={closeCalculator}
            >
                <CalorieCalculator/>
            </ModalComponent>
            <Button
                variant="contained"
                type='submit'
                onClick={openCalculator}
            >
                Calculator
            </Button>
            <CalorieGoals />
        </div>
    )
}

export default Home;
