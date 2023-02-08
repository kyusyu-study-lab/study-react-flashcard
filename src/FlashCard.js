import React from 'react';
import { Paper, Button } from '@mui/material';

export const FlashCard = (props) => {
    const { name, selectWord, color } = props;
    return <>
        <Paper elevation={6} sx={{width: 320, height: 180, }}>
            <p>{name}</p>
            <Button
                onClick={() => selectWord()}
                color={color}
                variant='contained'
                size='large'
            >SELECT</Button>
        </Paper>
    </>
}
