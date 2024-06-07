import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

import ModalComponent from '../../components/modal';
import CalorieCalculator from '../../components/calorie-calculator';
import CalorieGoals from '../../components/calorie-goals';
import BodyWeightGoals from '../../components/body-weight-goals';
import FoodTrackingMenu from '../../components/food-tracking-menu';

const Home = () => {
    const [isCalculatorModalOpen, setCalculatorModalOpen] = useState(false);

    const openCalculator = () => setCalculatorModalOpen(true);
    const closeCalculator = () => setCalculatorModalOpen(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
                <h1>Home</h1>
                <FoodTrackingMenu />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={openCalculator}
                    sx={{ mb: 3 }}
                >
                    Calculator
                </Button>
                <CalorieGoals />
                <BodyWeightGoals />
            </Box>
            <ModalComponent
                open={isCalculatorModalOpen}
                onClose={closeCalculator}
            >
                <CalorieCalculator />
            </ModalComponent>
        </Box>
    );
}

export default Home;
