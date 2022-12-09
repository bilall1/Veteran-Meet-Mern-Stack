import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

let returned_state_string = localStorage.getItem("LoginData");
let returned_state_object = JSON.parse(returned_state_string);
var sessionEmail = returned_state_object.email;

export default function EventCard(props) {

  const [buttonText, setButtonText] = React.useState('Mark as Intrested');

  const [buttonAttendText, setAttendButtonText] = React.useState('Mark as Attended');

  const handleIntrested = () => {
    const object = {
      email: sessionEmail,
      eventName: props.name,
      eventTime: props.date
    }
    axios.post('http://localhost:4000/Veteran/addIntrestedEvent', object)
      .then(res => (setButtonText('Intrested')));
  };

  const handleAttend = () => {
    setAttendButtonText('Attended');
    const object = {
      email: sessionEmail
    }
    axios.post('http://localhost:4000/Veteran/addPoints', object)
      .then(res => (alert("Points added")));
  };

  const isLoggedIn = props.condition;

  const isAttend = props.attend;
  return (
    <Card sx={{ marginTop: 1, minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
          {props.name}
        </Typography>
        <Typography variant="h5" component="div">
          {/* be{bull}nev{bull}o{bull}lent */}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.date}
        </Typography>
        <Typography variant="body2">
          Event
        </Typography>
      </CardContent>
      <CardActions>
        {
          isLoggedIn
            ? <Button onClick={handleIntrested} size="small">{buttonText}</Button>
            : ''
        }
        {
          isAttend
            ? <Button onClick={handleAttend} size="small">{buttonAttendText}</Button>
            : ''
        }
      </CardActions>
    </Card>
  );
}