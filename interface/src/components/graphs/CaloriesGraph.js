import React from 'react';
import moment from 'moment';
import {
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import './WeightRecordsGraph.css';

const CaloriesGraph = ({ foodRecords }) => {
    // Calculate total calories for each day
    const caloriesByDate = foodRecords.reduce((acc, record) => {
        const date = moment(record.timestamp).startOf('day').valueOf();
        const calories = (record.calories / 100) * record.quantity;
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += calories;
        return acc;
    }, {});

    // Convert to array format and sort by date for recharts
    const data = Object.keys(caloriesByDate).map(date => ({
        date: Number(date),
        calories: Math.round(caloriesByDate[date]), // Round to nearest integer
    })).sort((a, b) => a.date - b.date);

    const minCalories = Math.min(...data.map(record => record.calories));
    const maxCalories = Math.max(...data.map(record => record.calories));
    const minDate = Math.min(...data.map(record => record.date));
    const maxDate = Math.max(...data.map(record => record.date));

    const CustomTooltip = ({ payload, label, active }) => {
        if (active && payload && payload.length) {
            const date = moment(payload[0].payload.date).format('DD MMM YYYY');
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${date}`}</p>
                    <p className="desc">{`Calories: ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={700}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey='date'
                    domain={[minDate, maxDate]}
                    name='Date'
                    tickFormatter={(unixTime) => moment(unixTime).format('YYYY-MM-DD')}
                    type='number'
                    scale='time'
                />
                <YAxis 
                    dataKey='calories' 
                    name='Calories' 
                    domain={[minCalories - 50, maxCalories + 50]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                    type='monotone'
                    dataKey='calories'
                    stroke='#ab47bc'
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    isAnimationActive={true}
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CaloriesGraph;
