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

import ModalComponent from '../modal';
import './index.css';

const WeightRecordsModal = ({ weightRecords, open, onClose }) => {
    const data = weightRecords.map(record => ({
        date: record.date,
        weight: record.weight,
    }));

    const minWeight = Math.min(...data.map(record => record.weight));
    const maxWeight = Math.max(...data.map(record => record.weight));
    const minDate = Math.min(...data.map(record => record.date));
    const maxDate = Math.max(...data.map(record => record.date));

    const CustomTooltip = ({ payload, label, active }) => {
        if (active && payload && payload.length) {
            const date = moment(payload[0].payload.date).format('DD MMM YYYY');
            const time = moment(payload[0].payload.date).format('HH:mm');
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${date}`}</p>
                    <p className="intro">{`${time}`}</p>
                    <p className="desc">{`Weight: ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <ModalComponent
            open={open}
            onClose={onClose}
            width={900}
        >
            <h2>Weight Progress</h2>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey='date'
                        domain={[minDate, maxDate]}
                        name='Date'
                        tickFormatter={(unixTime) => moment(unixTime).format('YYYY-MM-DD HH:mm')}
                        type='number'
                        scale='time'
                    />
                    <YAxis 
                        dataKey='weight' 
                        name='Weight' 
                        domain={[minWeight - 5, maxWeight + 5]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                        type='monotone'
                        dataKey='weight'
                        stroke='#6B8E23'
                        strokeWidth={2}
                        dot={{ r: 5 }}
                        isAnimationActive={true}
                        animationBegin={0}
                        animationDuration={1500}
                        animationEasing="ease"
                    />
                </LineChart>
            </ResponsiveContainer>
        </ModalComponent>
    );
};

export default WeightRecordsModal;
