'use client'

import * as React from 'react';
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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody, { tableBodyClasses } from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Autocomplete, FormLabel, Radio, RadioGroup, Tab, Tabs } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import CreateOrExtend from './UI/CreateOrExtend/CreateOrExtend'
import ResponsiveAppBar from './UI/AppBar/AppBar'
import ExtendUser from './UI/ExtendUser/ExtendUser'
import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '../amplifyconfiguration.json';
Amplify.configure(config);


function HomePage({ signOut, user }) {
  const [page, setPage] = React.useState(2);

  return (
      <Container component='main' maxWidth='xl' disableGutters>
        <ResponsiveAppBar setPage={setPage} signOut={signOut} />
        <CssBaseline />
        
    <Container component='section' maxWidth='xs'>
        {
          page == 1 && <CreateOrExtend />
        }
        {
          page == 2 && <ExtendUser />
        }
        
    </Container>
      </Container>
  );
}

export default withAuthenticator(HomePage);