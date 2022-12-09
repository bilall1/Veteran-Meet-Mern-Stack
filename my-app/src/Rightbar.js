import React from 'react'
import { Box } from '@mui/system';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { AvatarGroup, Button } from '@mui/material';
import axios from "axios";
import { useState, useEffect } from 'react';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
//Local storage
let returned_state_string = localStorage.getItem("LoginData");
let returned_state_object = JSON.parse(returned_state_string);
var sessionEmail = returned_state_object.email;

const Rightbar = () => {

    const [friend, setFriend] = useState([]);

    const [catagory, setCatagory] = useState("");
    const [points, setPoints] = useState("");

    const arrayData = [];

    const handleAPI = () => {
        axios.post('http://localhost:4000/Veteran/getAllVeterans')
            .then(res => (arrayData.push(res.data), setFriend(res.data)));

    }

    const getCatagory = () => {
        const object = {
            email: sessionEmail
        }

        axios.post('http://localhost:4000/Veteran/getPoints', object)
            .then(res => (setPoints(res.data.stars), setCatagory(res.data.catagory)));

    }



    function addFriend(frnd) {


        const object = {
            email: sessionEmail,
            friend: frnd
        }

        axios.post('http://localhost:4000/Veteran/addFriends', object)
            .then(res => (alert("ok")));

        alert("Veteran Followed");
    }

    useEffect(() => {
        // call api or anything
        handleAPI();
        getCatagory();
    }, []);


    return (
        <Box bgcolor="" flex={2} p={2}>


            <Box position="fixed">

                <Box>

                    <Typography sx={{ marginTop: 1, marginBottom: 1, color: "gray", display: "block" }} variant='h6'>
                        Rank:
                    </Typography>


                    <StarsOutlinedIcon color="primary" />
                    <StarsOutlinedIcon color="primary" />
                    <StarsOutlinedIcon color="primary" />
                    <StarsOutlinedIcon color="primary" />
                    <StarsOutlinedIcon color="primary" />


                    <Typography sx={{ fontFamily: 'monospace', fontWeight: "Bold", marginTop: 0, marginBottom: 2, color: '#3f50b5', display: "block" }} variant='h6'>
                        {catagory} {points}
                    </Typography>


                </Box>



                <Box >

                    <Typography sx={{ marginTop: 2, marginBottom: 3, color: "gray" }} variant='h6'>
                        Online Friends:
                    </Typography>

                    <AvatarGroup max={4}>
                        <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                        <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
                        <Avatar alt="Cindy Baker" src="https://mui.com/static/images/avatar/3.jpg" />
                        <Avatar alt="Agnes Walker" src="https://mui.com/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="https://mui.com/static/images/avatar/5.jpg" />
                    </AvatarGroup>

                </Box>


                <Box position="fixed">
                    <Typography sx={{ marginTop: 5, marginBottom: 1, color: "gray", display: "block" }} variant='h6'>
                        Add Friends:
                    </Typography>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {friend.map((name) => (
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={name.photo} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={name.firstName}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                            </Typography>
                                            <Button onClick={() => addFriend(name.email)} sx={{ marginTop: 1 }} variant="outlined">Follow</Button>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        ))}
                        <Divider variant="inset" component="li" />

                    </List>


                </Box>


            </Box>



        </Box>
    )
}

export default Rightbar