import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from '@mui/material';
import WeightRecordService from "../../services/weight-record.service";
import FoodService from "../../services/food.service";
import WeightRecordsGraph from "../../components/graphs/WeightRecordsGraph";
import CaloriesGraph from "../../components/graphs/CaloriesGraph";
import MoodRecordService from "../../services/mood-record.service";
import MoodCalendar from "../../components/mood-calendar";

const Reports = () => {
    const [weightRecords, setWeightRecords] = useState([]);
    const [foodRecords, setFoodRecords] = useState([]);
    const [moodRecords, setMoodRecords] = useState([]);
    const [graphKey, setGraphKey] = useState(Date.now());
    const [selectedGraph, setSelectedGraph] = useState('weight');

    useEffect(() => {
        Promise.all([
            WeightRecordService.getAll(),
            FoodService.getAll(),
            MoodRecordService.getAll()
        ])
        .then(([weightRecordsResponse, foodResponse, moodResponse]) => {
            console.log('Weight Records:', weightRecordsResponse.data);
            console.log('Food Records:', foodResponse.data);
            console.log('Mood Records', moodResponse.data);
            setWeightRecords(weightRecordsResponse.data);
            setFoodRecords(foodResponse.data);
            setMoodRecords(moodResponse.data);
            // Update the key to force re-render
            setGraphKey(Date.now());
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div style={{ padding: '5px' }}>
            <Typography variant="h3" align="center" gutterBottom>
                Reports
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                <Button 
                    variant="contained" 
                    sx={{ backgroundColor: '#2196f3' }}
                    onClick={() => setSelectedGraph('weight')}
                >
                    Body Weight
                </Button>
                <Button 
                    variant="contained" 
                    sx={{ backgroundColor: '#4caf50' }}
                    onClick={() => setSelectedGraph('mood')}
                >
                    Mood
                </Button>
                <Button 
                    variant="contained" 
                    sx={{ backgroundColor: '#ab47bc' }}
                    onClick={() => setSelectedGraph('calories')}
                >
                    Calories
                </Button>
            </Box>
            <Box sx={{ mt: 3, mr: '30px' }}>
                {selectedGraph === 'weight' && <WeightRecordsGraph key={graphKey} weightRecords={weightRecords} />}
                {selectedGraph === 'calories' && <CaloriesGraph key={graphKey} foodRecords={foodRecords} />}
                {selectedGraph === 'mood' && <MoodCalendar moodRecords={moodRecords} />}
            </Box>
        </div>
    );
}

export default Reports;
