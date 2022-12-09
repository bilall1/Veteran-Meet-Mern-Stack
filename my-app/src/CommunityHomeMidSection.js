import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import EventCard from './CommunityEventCard'
import axios from 'axios';


let returned_state_string = localStorage.getItem("CommunityLogInData");
let returned_state_object = JSON.parse(returned_state_string);
var sessionEmail =returned_state_object.email;

const CommunityHomeMidSection = () => {

    const [event,setEvent] = React.useState([]);

    useEffect(() => {
        handleMyEvent();
      }, []);

    const handleMyEvent = async () => {

        var CommunityEmail={
            email:sessionEmail
        }

        const r = await axios.post('http://localhost:4000/Community/getMyEvent', CommunityEmail)
            .then(res => (setEvent(res.data)));
    };

    return (
        <Box sx={{ width: '100%', paddingTop: 8 }}>
            {event.map((temp)=>(
                <EventCard name={temp.name} date={temp.date} />
            ))}
        </Box>
    )
}

export default CommunityHomeMidSection