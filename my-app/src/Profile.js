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

import Sidebar from './Sidebar';
import { Stack } from '@mui/system';
import ProfileMidSection from './ProfileMidSection';
import Feed from './Feed';
import ProfileRightSide from './ProfileRightSide';

export default function Profile() {
    return (
        <Box>
            <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar />
            <ProfileMidSection />           
            <ProfileRightSide />
            </Stack>
        </Box>




        // <div>

        // <Avatar variant={"rounded"} alt="The image" src={"pak.png"} style={{
        //     width: 200,
        //     height: 200,
        //   }} />

        //     <h1>Hello</h1>
        // </div>
    );
}