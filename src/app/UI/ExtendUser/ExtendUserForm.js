import { Alert, AlertTitle, Autocomplete, Box, Button, CircularProgress, FormControlLabel, FormLabel, ImageList, ImageListItem, Radio, RadioGroup, Stack, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import extendUserSubmit from '../../utilites/ExtendUser/extendUserSubmit'
import { styled } from '@mui/material/styles';
import { UserContext } from '../../HomePage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import filehandler from '../../utilites/createForm/fileHandler';
import checkPrfSubmit from '../../utilites/ExtendUser/checkPrfSubmit'
import {SUPPORTREGIONCONST} from '../../variables/const'
import { MuiOtpInput } from 'mui-one-time-password-input';
import { ExtendOrNot } from '../ExtendOrNot';


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
  const [userInfo, setUserInfo] = useState({});
  const [files, setfiles] = useState([])

  const [amountValidate, setAmountValidate] = useState(false)
  const [monthValidate, setmonthValidate] = useState(false)
  const [manyChatValidate, setmanyChatValidate] = useState(false)

  //check if the user exist
  const [userExist, setuserExist] = useState()
  const [checkInputComplete, setcheckInputComplete] = useState(false)
  const [isChecking, setisChecking] = useState(false)
  const [hasContinue, sethasContinue] = useState(false)
  const [hasPermissonThisMonth, setHasPermissonThisMonth] = useState(true)


  //Load the Wallet on Component Mount
  useEffect(() => {
    fetch("/api/loadWallet")
    .then(response => response.json())
  .then(data => (setwallets(data)))
  }, [])
  
  const formFillingPerson = useContext(UserContext).username
  const [otp, setOtp] = React.useState('')

  const handleChange = (newValue) => {
    setOtp(newValue)
  }

  return (
    <>

    <MuiOtpInput autoFocus gap={1} length={7} validateChar={(text) => !isNaN(text)} value={otp} onChange={handleChange} onComplete={(value) => {setcheckInputComplete(true); checkPrfSubmit(value, setuserExist, setisChecking, setUserInfo, setHasPermissonThisMonth)}} TextFieldsProps={{ disabled: checkInputComplete}} />

    {/* //if the user don't exist */}
    {
      !userExist && checkInputComplete && !isChecking && (
      <>
      <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      ဒီ user မရှိပါဘူး — <strong>အရင်စာရင်းသွင်းပါ</strong>
    </Alert>
    <Stack spacing={2} direction="row" justifyContent={'flex-end'} sx={{ mt: 3, mb: 2, }}>
                    <Button variant="contained" onClick={() => {
                      setOtp('');
                      setcheckInputComplete(false); 

                    }} >သက်တမ်းပြန်တိုးမယ်</Button>
                    <Button variant="contained" color='error' onClick={() => {
                        location.reload();  // reload the page  
                        }}>အသစ်သွင်းမယ်</Button>
            </Stack>
    </>
    )
    }



    {isChecking && (<Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>)
}
    {loading && (<Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>)
    }

  {
    userExist && !isChecking && checkInputComplete && !hasPermissonThisMonth && (
      <h1>ယခုလအတွင်း ဖော်ပြပါထောက်ပို့တပ်သားအတွက် စာရင်းသွင်းထားပြီးပါပြီ။ ထူးခြားဖြစ်စဥ် ဖြစ်ပါက Admin ကိုဆက်သွယ်ပါ</h1>
    )
  }
  
  {
    userExist && !isChecking  && checkInputComplete && hasPermissonThisMonth && (
      <ExtendOrNot userInfo={userInfo} sethasContinue={sethasContinue}/>
    )
  }

    {
      userExist && !loading && hasContinue && (
        <Box component="form" onSubmit={(event) => extendUserSubmit(event, userInfo, currency, supportRegion, files, setloading, formFillingPerson, setAmountValidate, setmonthValidate, setmanyChatValidate)}  sx={{ mt: 1 }}>
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
            options={SUPPORTREGIONCONST}
            sx={{ width: 300 }}
            defaultValue={supportRegion}
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
    
            <Button component="label" onChange={(event) => filehandler(event.target.files, setfiles, files)} variant="contained" startIcon={<CloudUploadIcon />}>
                 Upload file
                <VisuallyHiddenInput type="file" multiple required/>
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
    }
      
          </>
  )
}

export default ExtendUserForm