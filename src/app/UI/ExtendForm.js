import { Autocomplete, Box, Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import extendFormSubmit from '../utilites/extendForm/extendFormSubmit'
import filehandler from '../utilites/createForm/fileHandler';
import { UserContext } from '../HomePage';
import { SUPPORTREGIONCONST } from '../variables/const';
import Dropzone from 'react-dropzone'

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

const ExtendForm = ({userInfo, setloading}) => {
    const [wallets, setwallets] = useState()
    const [currency, setcurrency] = useState();
    const [supportRegion, setsupportRegion] = useState('မြန်မာတနိုင်ငံလုံး')
    const [files, setfiles] = useState([])

    const [amountValidate, setAmountValidate] = useState(false)
    const [monthValidate, setmonthValidate] = useState(false)
    const [manyChatValidate, setmanyChatValidate] = useState(false)
    const [fileExist, setfileExist] = useState(true)

    //Load the Wallet on Component Mount
    useEffect(() => {
      fetch("/api/loadWallet")
      .then(response => response.json())
    .then(data => (setwallets(data)))
    }, [])

    const formFillingPerson = useContext(UserContext).username;
  return (
    <>
        <Typography component="h1" variant="h5">
                Extend this User
              </Typography>
              <Box component="form"  sx={{ mt: 1 }} onSubmit={(event) => extendFormSubmit(event, currency, supportRegion, files, userInfo, setloading, formFillingPerson, setAmountValidate, setmonthValidate, setmanyChatValidate, fileExist,setfileExist)}>
              <FormLabel id="prf_no">PRF No</FormLabel>
              <TextField
                  autoFocus
                  margin="normal"
                  required
                  fullWidth
                  name="prf_no"
                  type="text"
                  value={userInfo['prf_no']}
                  disabled
                  id="prf_no"
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                />
              <TextField
                  autoFocus
                  margin="normal"
                  required
                  fullWidth
                  name="amount"
                  label="Amount"
                  type="text"
                  id="amount"
                  helperText={amountValidate && "ဂဏန်းဘဲသွင်းပါ"}
                  error = {amountValidate}
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
                  helperText={monthValidate && "ဂဏန်းဘဲသွင်းပါ"}
                  error = {monthValidate}
                  type='text'
                  InputProps={{
                    inputProps: { min: 1 }
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
            defaultValue={supportRegion}
            options={SUPPORTREGIONCONST}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Support Region" required />}
            />
            <TextField
                  margin="normal"
                  fullWidth
                  id="manychat"
                  label="Many Chat ID"
                  required
                  name="manychat"
                  type='text'
                  error = {manyChatValidate}
                  helperText={manyChatValidate && "ဂဏန်းဘဲသွင်းပါ"}

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
    
    <div style={{"width" : "100%", width : "100%", height : "50%", border : "1px solid black"}} onDrop={(e) => {
    e.preventDefault();
    e.nativeEvent.dataTransfer.items[0].getAsString(function(url){
      console.log(url)
      if(url == null)
      {
        console.log("this run")
        console.log(url)
        return;
      }
      setfiles([...files, {href: url}])
    });
}} onDragOver={e => {e.preventDefault(); }}>
            <Dropzone onDrop={acceptedFiles => filehandler(acceptedFiles, setfiles, files)} accept={['text/*, img/*']}>
  {({getRootProps, getInputProps}) => (
    <section >
      <div {...getRootProps()} style={{padding: "20% 20%"}}>
        <input {...getInputProps()}  />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  )}
</Dropzone>
            </div>
          {!fileExist && <p style={{color: 'red'}}>You need to have a file</p>}
            {files ? files.map(url => <img style={{'width': 100, 'height': 100}} src={url.href}/>): <h1>Hello</h1>} 
            <Button
            type = 'submit'
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, }}
            >
            Submit
            </Button>
        </Box>       
    </>
  )
}

export default ExtendForm