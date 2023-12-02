import { Autocomplete, Avatar, Box, Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import filehandler from '../../utilites/createForm/fileHandler';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExtendUserForm from './ExtendUserForm'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const ExtendUser = () => {
   //LOAD THE WALLETS
   const [wallets, setwallets] = useState()
   const [currency, setcurrency] = useState();
   const [supportRegion, setsupportRegion] = useState('မြန်မာတနိုင်ငံလုံး')
   const [files, setfiles] = useState([])

   //Load the Wallet on Component Mount
   useEffect(() => {
     fetch("/api/loadWallet")
     .then(response => response.json())
   .then(data => (setwallets(data)))
   }, [])
   
   

   return(
    <Box
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
      <CalendarMonthIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
    PRFHQ Member Extend Form
    </Typography>
    <ExtendUserForm />
  </Box>
       )
}

export default ExtendUser