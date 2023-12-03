import { Alert, AlertTitle, Autocomplete, Box, Button, CircularProgress, FormControlLabel, FormLabel, ImageList, ImageListItem, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import extendUserSubmit from '../../utilites/ExtendUser/extendUserSubmit'
import { styled } from '@mui/material/styles';
import { UserContext } from '../../HomePage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import filehandler from '../../utilites/createForm/fileHandler';


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

const ExtendUserForm = () => {
  const [loading, setloading] = useState(false)
  //LOAD THE WALLETS
  const [wallets, setwallets] = useState()
  const [currency, setcurrency] = useState();
  const [supportRegion, setsupportRegion] = useState('မြန်မာတနိုင်ငံလုံး')
  const [files, setfiles] = useState([])

  //check if the user exist
  const [userExist, setuserExist] = useState(true)

  //Load the Wallet on Component Mount
  useEffect(() => {
    fetch("/api/loadWallet")
    .then(response => response.json())
  .then(data => (setwallets(data)))
  }, [])
  
  const formFillingPerson = useContext(UserContext).username

  return (
    !userExist ? (<Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    ဒီ user မရှိပါဘူး — <strong>အရင်စာရင်းသွင်းပါ</strong>
  </Alert>) :
    loading ? (<Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>):
      (
        <Box component="form" onSubmit={(event) => extendUserSubmit(event, currency, supportRegion, files, setloading, formFillingPerson, setuserExist)}  sx={{ mt: 1 }}>
          <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              name="prfno"
              label="PRF-NO"
              type="string"
              id="prfno"
            />
            <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="amount"
                  label="Amount"
                  type="number"
                  id="amount"
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="month"
                  label="Month"
                  name="month"
                  type='number'
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                />
              <FormLabel id="currency">Currency</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="Currency"
            row
            onChange={(event) => setcurrency(event.target.value)}
            
          >
            <FormControlLabel value="MMK" control={<Radio required={true} />} label="MMK" />
            <FormControlLabel value="THB" control={<Radio required={true}/>} label="THB" />
            <FormControlLabel value="SGD" control={<Radio required={true}/>} label="SGD" />
            <FormControlLabel value="USD" control={<Radio required={true}/>} label="USD" />
            <FormControlLabel value="USDT" control={<Radio required={true}/>} label="USDT" />
          </RadioGroup>
          <FormLabel id="wallets">Wallets</FormLabel>
        {
            // only if wallet has been fetched and currency has been selected
            wallets && currency ? (
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="wallets">
                    {
                        //if the currency wallet exists
                       wallets[currency] ? wallets[currency].map((wallet) => <FormControlLabel value={JSON.stringify(wallet)} control={<Radio />} label={wallet.name} key={wallet.id} required={true} />): <h1>There is no wallet</h1>
                    }
                </RadioGroup>
                ) : <h1>No Selected Wallet Yet</h1>
        }
            <Autocomplete
            disablePortal
            id="supportRegion"
            onChange={(event, value) => setsupportRegion(value)}
            required
            options={['မြန်မာတနိုင်ငံလုံး','ကချင်ပြည်နယ်', 'ကရင်ပြည်နယ်']}
            sx={{ width: 300 }}
            defaultValue={supportRegion}
            renderInput={(params) => <TextField {...params} label="Support Region" required />}
            />
            <TextField
                  margin="normal"
                  fullWidth
                  id="manychat"
                  label="Many Chat ID"
                  name="manychat"
                  type='number'
                />
    
                <TextField
                  margin="normal"
                  fullWidth
                  id="contactLink"
                  label="Contact Person Link"
                  name="contactLink"
                  type='url'
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="notes"
                  label="Notes"
                  name="notes"
                  type='text-area'
                />
    
            <Button component="label" onChange={(event) => filehandler(event.target.files, setfiles, files)} variant="contained" startIcon={<CloudUploadIcon />}>
                 Upload file
                <VisuallyHiddenInput type="file" multiple/>
            </Button>
             
            {
              files.length != 0 && <ImageList sx={{ width: 500, height: 200 }} cols={3} rowHeight={164}>
              {files.map((item) => (
                <ImageListItem key={item.href}>
                  <img
                    src={`${item.href}`}
                    alt={"hello"}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
              </ImageList>
            }
            
            <Button
                type = 'submit'
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Submit
            </Button>
          </Box>
          )
  )
}

export default ExtendUserForm