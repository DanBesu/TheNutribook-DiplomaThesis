import React, { useEffect, useState } from "react";
import { Button, Box } from '@mui/material';

import WeightRecordsModal from "../../components/weight-records-modal";
import WeightRecordService from "../../services/weight-record.service";

const Reports = () => {
    const [weightRecords, setWeightRecords] = useState([]);
    const [isWeightModalOpen, setWeightModalOpen] = useState(false);

    useEffect(() => {
        WeightRecordService.getAll()
            .then(response => {
                console.log(response.data);
                setWeightRecords(response.data);
            });
    }, []);

    const openWeightRecords = () => {
        setWeightModalOpen(true);
    }
    
    return (
        <div>
            Reports
            <Button
                variant="contained"
                onClick={() => setWeightModalOpen(true)}
                sx={{ mb: 3 }}
            >
                Weight Progress
            </Button>
            <WeightRecordsModal 
                open={isWeightModalOpen}
                onClose={() => setWeightModalOpen(false)}
                weightRecords={weightRecords}
            />
        </div>
    );
}

export default Reports;
