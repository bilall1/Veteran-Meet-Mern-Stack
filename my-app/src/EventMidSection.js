import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import EventIcon from '@mui/icons-material/Event';
import EventCard from './EventCard';
import Grid from '@mui/material/Grid';  
import Box from '@mui/material/Box';
import axios from 'axios';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventNoteIcon from '@mui/icons-material/EventNote';

let returned_state_string = localStorage.getItem("LoginData");
let returned_state_object = JSON.parse(returned_state_string);
var sessionEmail =returned_state_object.email;

export default function EventMidSection() {
    const [open, setOpen] = React.useState(false);
    const [openup, setOpenUp] = React.useState(false);
    const [openintrested, setOpenIntrested] = React.useState(false);
    const [openattended, setOpenAttended] = React.useState(false);

    const [event,setEvent] = React.useState([]);
    const [eventup,setEventUp] = React.useState([]);
    const [eventintresred,setEventIntrested] = React.useState([]);

    var vetEmail={
        email:sessionEmail
    }

    const handleMyEvent = async () => {
        setOpen(!open);
            const r= await axios.post('http://localhost:4000/Veteran/getMyEvent',vetEmail)
            .then(res=> (setEvent(res.data)));
    };

    const handleUpEvent = async () =>{
        setOpenUp(!openup);
        const r= await axios.post('http://localhost:4000/Veteran/getAllEvents',vetEmail)
            .then(res=> (setEventUp(res.data)));
    };

    const handleIntrested = async () =>{
        setOpenIntrested(!openintrested);
        const r= await axios.post('http://localhost:4000/Veteran/getIntrested',vetEmail)
            .then(res=> (setEventIntrested(res.data)));
    };
    const handleAttended = async () =>{
        setOpenAttended(!openattended);
        const r= await axios.post('http://localhost:4000/Veteran/getIntrested',vetEmail)
            .then(res=> (setEventIntrested(res.data)));
    };

    return (
        <Box sx={{width: '100%' , paddingTop: 2 }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                My Events
                            </ListSubheader>
                        }
                    >
                        <ListItemButton onClick={handleMyEvent}>
                            <ListItemIcon>
                                <EventIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Events" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                        {event.map((temp)=>(
                            <EventCard name={temp.name} date={temp.date} condition={false}/>
                        ))}
                        </Collapse>
                    </List>
                    
                </Grid>
                <Grid item xs={6}>
                <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Upcoming Events
                            </ListSubheader>
                        }
                    >
                        <ListItemButton onClick={handleUpEvent}>
                            <ListItemIcon>
                                <CalendarMonthIcon />
                            </ListItemIcon>
                            <ListItemText primary="Upcoming Events" />
                            {openup ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openup} timeout="auto" unmountOnExit>
                        {eventup.map((temp)=>(
                            <EventCard name={temp.name} date={temp.date} condition={true}/>
                        ))}
                        </Collapse>
                    </List>
                </Grid>
                <Grid item xs={6}>
                <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Intrested Events
                            </ListSubheader>
                        }
                    >
                        <ListItemButton onClick={handleIntrested}>
                            <ListItemIcon>
                                <EventNoteIcon />
                            </ListItemIcon>
                            <ListItemText primary="Intrested Events" />
                        {openintrested ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openintrested} timeout="auto" unmountOnExit>
                        {eventintresred.map((temp)=>(
                            <EventCard name={temp.name} date={temp.date} condition={false} attend={true}/>
                        ))}
                        </Collapse>
                    </List>
                </Grid>
                <Grid item xs={6}>
                <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Attended Events
                            </ListSubheader>
                        }
                    >
                        <ListItemButton onClick={handleAttended}>
                            <ListItemIcon>
                                <EventAvailableIcon />
                            </ListItemIcon>
                            <ListItemText primary="Attended Events" />
                            {openattended ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openattended} timeout="auto" unmountOnExit>
                        {eventintresred.map((temp)=>(
                            <EventCard name={temp.name} date={temp.date} condition={false}/>
                        ))}
                        </Collapse>
                    </List>
                </Grid>
            </Grid>
        </Box>

    );
}