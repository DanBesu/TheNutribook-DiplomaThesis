import React, { useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Box, Typography, Fab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TodayIcon from '@mui/icons-material/Today';

const moods = [
    { level: 1, icon: '🤢', color: 'red', textColor: 'white', label: 'Really Bad' },
    { level: 2, icon: '🥱', color: 'orange', textColor: 'white', label: 'Pretty Tired' },
    { level: 3, icon: '😶', color: 'yellow', textColor: '#4caf50', label: 'Decent' },
    { level: 4, icon: '😌', color: 'yellowgreen', textColor: 'white', label: 'Fresh' },
    { level: 5, icon: '😁', color: 'green', textColor: 'white', label: 'Fantastic!' }
];

const localizer = momentLocalizer(moment);

const CustomToolbar = (toolbar) => {
    const goToBack = () => {
        toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
        toolbar.onNavigate('NEXT');
    };

    const goToCurrent = () => {
        toolbar.onNavigate('TODAY');
    };

    const label = () => {
        const date = moment(toolbar.date);
        return (
            <Typography variant="h6">
                {date.format('MMMM')} {date.format('YYYY')}
            </Typography>
        );
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Fab color="primary" onClick={goToBack} size="small" aria-label="previous month">
                <ArrowBackIcon />
            </Fab>
            <Fab color="primary" onClick={goToCurrent} size="small" aria-label="today">
                <TodayIcon />
            </Fab>
            <Fab color="primary" onClick={goToNext} size="small" aria-label="next month">
                <ArrowForwardIcon />
            </Fab>
        </Box>
    );
};

const MoodCalendar = ({ moodRecords }) => {
    const events = useMemo(() => {
        const groupedMoods = moodRecords.reduce((acc, record) => {
            const date = moment(record.timestamp).format('YYYY-MM-DD');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(record.moodLevel);
            return acc;
        }, {});

        return Object.keys(groupedMoods).map(date => {
            const avgMood = Math.round(groupedMoods[date].reduce((a, b) => a + b, 0) / groupedMoods[date].length);
            const mood = moods.find(m => m.level === avgMood);

            return {
                title: `${mood.icon} ${mood.label}`,
                start: new Date(date),
                end: new Date(date),
                allDay: true,
                color: mood.color,
                textColor: mood.textColor
            };
        });
    }, [moodRecords]);

    const eventStyleGetter = (event) => {
        const backgroundColor = event.color;
        const color = event.textColor || 'white';
        const style = {
            backgroundColor,
            borderRadius: '5px',
            opacity: 0.8,
            color,
            border: '0px',
            display: 'block',
            textAlign: 'center',
        };
        return {
            style
        };
    };

    return (
        <div style={{ height: '80vh' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                eventPropGetter={eventStyleGetter}
                views={['month']}
                toolbar={true}
                components={{
                    toolbar: CustomToolbar
                }}
            />
        </div>
    );
};

export default MoodCalendar;
