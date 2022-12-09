import * as React from 'react';
import { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { useRef } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useEffect } from 'react';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';

let returned_state_string = localStorage.getItem("LoginData");
let returned_state_object = JSON.parse(returned_state_string);
var sessionEmail = returned_state_object.email;

const ProfileRightSide = () => {

    const emailPost = {
        email: sessionEmail
    }

    const [update, setUpdate] = useState("");

    //use state for hobbies change
    const [updatehobby, setUpdatehobby] = useState("");

    const hiddenFileInput = useRef(null);

    const [image, setImage] = useState({
        databaseimg: ""
    });

    const [image2, setImage2] = useState({
        check: false,
        img1: ""
    });

    useEffect(() => {
        getImage();
    }, [update]);


    useEffect(() => {
        getHobbies();
      }, [updatehobby]);

    const getImage = async (e) => {

        axios.post('http://localhost:4000/Veteran/getProfilePhoto', emailPost)
            .then(res => (setImage2({ check: true, img1: res.data })));

    }




    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = async (e) => {
        const base64 = await convertToBase64(e.target.files[0]);
        setImage({ databaseimg: base64 });
    }

    const handleAPI = () => {

        const contentImage = {
            picture: image.databaseimg,
            email: sessionEmail
        }

        axios.post('http://localhost:4000/Veteran/profile', contentImage)
            .then(res => (alert("Content Posted")));

        setUpdate("o");
    }

    const [hobby,setHobby]=useState('Dummy');
    
    const saveHobbies = () => {

        const object={
            email:sessionEmail,
            hobbyName:hobby,
        }

        axios.post('http://localhost:4000/Veteran/addHobby',object)
        .then(res=> (console.log("Hobbies Added"))); 

        setUpdatehobby("o");

    }
    const [hobbyArray,setHobbyArray] = React.useState([]);
    const getHobbies = () => {

        const object={
            email:sessionEmail
        }

        axios.post('http://localhost:4000/Veteran/getHobby', object)
        .then(res=> (setHobbyArray(res.data))); 

    }

    return (
        <Container component="main" sx={{ paddingTop: 3, width: '30%', maxWidth: 255, bgcolor: 'background.paper' }} >
            <Grid item lg={12} >
                <Avatar sx={{ width: 170, height: 170 }} alt="Remy Sharp" src={image2.img1} />

                <Button onClick={handleClick} >
                    Add
                    <PhotoCamera />
                </Button>
                <Button onClick={handleAPI} sx={{ height: 20, width: 20 }} variant="outlined">Update</Button>

                <input type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                />

                {/* <Typography sx={{ marginLeft: 5, marginTop: 2 }} variant='h6' >{sessionEmail}</Typography> */}
            </Grid>

            <Container>

                <Grid item lg={12}>
                    <h2>Hobbies:</h2>

                    {hobbyArray.map((temp)=>(
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <SportsHandballIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={temp} />
                        </ListItem>

                    </List>

                    ))}

                    <h3>Add Hobbies:</h3>
                    <TextField
                        margin="normal"
                        id="Hobbies"
                        label="Hobbies"
                        name="Hobbies"
                        onChange={(e)=>setHobby(e.target.value)}
                    />
                    <Button onClick={()=>saveHobbies()} variant='outlined'>Add</Button>
                </Grid>


            </Container>


        </Container>
    )
}

export default ProfileRightSide
