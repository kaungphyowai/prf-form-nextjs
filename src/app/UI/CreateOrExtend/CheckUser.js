'use client'

import { Box, Button, CircularProgress, TextField } from "@mui/material"
import checkUserSubmit from "../../utilites/checkUserSubmit"
import { use, useState } from "react"
import { ExtendOrNot } from "../ExtendOrNot";
import CreateForm from "../CreateForm";
import ExtendForm from "../ExtendForm";
import { useSearchParams } from 'next/navigation'

export default function CheckUser() {
    const [userExistState, setUserExistState] = useState(false);

    const [finishCheck, setFinishCheck] = useState(false)
    const [createFormShow, setCreateFormShow] = useState(false)
    const [userInfo, setUserInfo] = useState({});
    const [hasContinue, sethasContinue] = useState(false)
    const [loading, setloading] = useState(false)

    const searchParams = useSearchParams()
    const user = searchParams.get('user')

    return (
      loading ? (<Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>):
      (<> 
        <Box component="form" onSubmit={(event) => checkUserSubmit(event, setUserExistState, setFinishCheck, setCreateFormShow, setUserInfo)}  sx={{ mt: 1 }}>
          <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type='email'
            />

            <Button
                type = 'submit'
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={finishCheck}
                >
                Check
            </Button>
                {/* Ask want to extend or not */}
          {
            userExistState && <ExtendOrNot userInfo={userInfo} sethasContinue={sethasContinue} formFillingPerson={user}/>
          }
          </Box>
          {
            !hasContinue && <ExtendForm userInfo={userInfo}  setloading={setloading} formFillingPerson={user}/>
          }

          {
            createFormShow && <CreateForm userInfo={userInfo} setloading={setloading} formFillingPerson={user}/>
          }
        </>)
    )
}