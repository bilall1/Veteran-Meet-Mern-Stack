import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupIcon from '@mui/icons-material/Group';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);

  const gotoHomePage = () => {
    navigate("/CommunityHomePage");
  };

  const logout = () => {
    navigate("/");
  };

  return (

    <List
      sx={{ marginTop:2,width: '100%', maxWidth: 255, bgcolor: 'background.paper' }}
      
    >
    <List sx={{position:"fixed"}}
    component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Typography variant='h5' sx={{marginBottom:1}}>
          Community Mode
          </Typography>
        </ListSubheader>
      }
    
    >
    <ListItemButton onClick={gotoHomePage}>
        <ListItemIcon>
          <HomeIcon  />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
     

      <ListItemButton onClick={logout}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>




    </List>
      
      
    </List>
  );
}