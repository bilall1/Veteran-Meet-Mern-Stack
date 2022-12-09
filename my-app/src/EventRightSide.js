import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import axios from 'axios'

let returned_state_string = localStorage.getItem("LoginData");
let returned_state_object = JSON.parse(returned_state_string);
var sessionEmail =returned_state_object.email;

const EventRightSide = () => {

    const [event,setEvent]=useState('Dummy');
    const [time,setTime]=useState('Dummy');

    const handleAPI = (data) => {

        const object={
            email:sessionEmail,
            eventName:event,
            eventTime:time
        }

        axios.post('http://localhost:4000/Veteran/addMyEvent',object)
        .then(res=> (alert(res.data)));     
    }

    return (
        <Box sx={{ marginTop: 3, width: '50%', bgcolor: 'background.paper',paddingTop: 3 }}>
            <Container>
                <Grid item lg={12}>
                    <Typography variant="h6">New Event:</Typography>
                    <TextField
                        margin="dense"
                        id="Event"
                        label="Event"
                        name="Event"
                        onChange={(e)=>setEvent(e.target.value)}
                    />
                    <Typography sx={{paddingTop: 1}}variant="h6">Event Time:</Typography>
                    <TextField
                        margin="dense"
                        id="Time"
                        label="Time"
                        name="Time"
                        onChange={(e)=>setTime(e.target.value)}
                    />
                    <Button onClick={()=>handleAPI()} variant='outlined'>Add Event</Button>
                </Grid>


            </Container>
        </Box>
    )
}

export default EventRightSide