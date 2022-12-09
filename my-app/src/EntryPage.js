import * as React from 'react';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

import { Stack } from '@mui/system';


export default function HomePage() {

    const navigate = useNavigate();

    function handleComm(){

        navigate("/CommunitySignIn");

    }
    function handleVet(){
        navigate("/sign-in");
    }


    
    return (
        <Box>
            <Typography variant='h4' sx={{ fontFamily:'monospace',marginTop: 4,flexGrow: 1, textAlign: "center", color: "gray", display: "block" }}>
                Veteran Meet
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="space-around" paddingTop={9}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="180"
                        image="/vet.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Veteran Mode
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            VeteranMeet helps to connect with veterans and engage them into community
                            services based on their interests.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={()=>handleVet()} size="small">Continue to Sign In</Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="180"
                        image="/comm.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Community Mode
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            VeteranMeet helps to connect with veterans and engage them into community
                            services based on their interests.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={()=>handleComm()} size="small">Continue to Sign In</Button>
                    </CardActions>
                </Card>
            </Stack>
        </Box>
    );
}
