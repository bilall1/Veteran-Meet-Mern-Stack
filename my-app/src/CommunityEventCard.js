import React from 'react'
import { Box } from '@mui/system';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { AvatarGroup, Button, Card, CardActions, CardContent } from '@mui/material';
import axios from "axios";

import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
let returned_state_string = localStorage.getItem("CommunityLogInData");
let returned_state_object = JSON.parse(returned_state_string);
var sessionEmail = returned_state_object.email;

export default function EventCard(props) {

  const [friend, setFriend] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  
  const Inivitaions = async () => {
    setOpen(!open);

    axios.post('http://localhost:4000/Veteran/getAllVeterans')
            .then((res => setFriend(res.data)));
  };

  function addInvitations(name,date,data) {

    var obj={
      email:data,
      eventName: props.name,
      eventTime: props.date
    }

    axios.post('http://localhost:4000/Veteran/addIntrestedEvent', obj)
      .then(res => (console.log("Done")));
  };


  return (
    <Card sx={{ marginTop: 1, minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
          {props.name}
        </Typography>
        <Typography variant="h5" component="div">
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.date}
        </Typography>
        <Typography variant="body2">
          Community Event
        </Typography>
      </CardContent>
      <CardActions>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"

        >
          <ListItemButton onClick={Inivitaions} >
            <ListItemText primary="Invite Veterans" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open} timeout="auto" unmountOnExit>
          {friend.map((temp) => (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={temp.photo}/>
              </ListItemAvatar>
              <ListItemText
                primary={temp.firstName}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                    </Typography>
                    <Button onClick={()=>addInvitations(props.name,props.date,temp.email)} sx={{ marginTop: 1}} variant="outlined">Invite</Button>
                  </React.Fragment>
                }
              />
            </ListItem>
            ))}

          </Collapse>

        </List>
      </CardActions>
    </Card>
  );
}