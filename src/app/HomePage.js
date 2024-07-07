'use client'

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import {  CircularProgress } from '@mui/material';
import CreateOrExtend from './UI/CreateOrExtend/CreateOrExtend'
import ResponsiveAppBar from './UI/AppBar/AppBar'
import ExtendUser from './UI/ExtendUser/ExtendUser'
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import {fetchAuthSession} from 'aws-amplify/auth'
import '@aws-amplify/ui-react/styles.css';
import config from '../amplifyconfiguration.json';
import { generateClient } from 'aws-amplify/api';
import { listApps } from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import OpenCloseForm from './UI/OpenCloseForm.js'
import PendingFormTable from './UI/PendingForm/PendingFormTable'

Amplify.configure(config);

const client = generateClient();

export const UserContext = React.createContext()

function HomePage({ signOut, user }) {
  const [page, setPage] = React.useState(1);
  //It can be loading, enable, disable
  const [status, setStatus] = React.useState('loading')
  //User Role = admin | user
  const [userRole, setUserRole] = React.useState('user')
  
  //Get the page is unable or not
  React.useEffect(() => {
    client.graphql({ query: listApps }).then(result => 
      {
        let enable = result.data.listApps.items[0].status ? "enable" : "disable";
        setStatus(enable)
      })

      //always listen for changes in status
      const updateSub = client
      .graphql({ query: subscriptions.onUpdateApp })
      .subscribe({
        next: ({ data }) => {
          let enable = data['onUpdateApp']['status'] ? "enable" : "disable";
          setStatus(enable)
        },
        error: (error) => console.warn(error)
      });
  }, [])

 



  //Get user role
  React.useEffect(
    () => {
      fetchAuthSession().then(
        session =>
        {
          let accesstoken = session.tokens.accessToken;
          let scope = accesstoken.payload['cognito:groups']
          if(scope === undefined)
          {
            return;
          }
          if(scope.find(ele => ele === 'Admin'))
          {
            setUserRole('admin')
          }
        }
      )
    }
  ,[])
  

    
  

  return (
    <UserContext.Provider value={user}>
      <Container component='main' maxWidth={false} disableGutters>
        <ResponsiveAppBar setPage={setPage} signOut={signOut} userRole={userRole} />
        {/* <LabAppBar setPage={setPage} signOut={signOut} userRole={userRole} /> */}
        <CssBaseline />
        
    <Container component='section' maxWidth='lg'>
      {
        status === 'loading' && <CircularProgress />
      }
        {
         ( userRole =='admin' || status === 'enable') && page == 1 && <CreateOrExtend userRole={userRole} />
        }
        {
          ( userRole =='admin' || status === 'enable') && page == 2 && <ExtendUser userRole={userRole} />
        }
        {
          userRole =='admin' && page == 3 && <OpenCloseForm status={status}  />
        }
        {
          userRole == 'admin' || userRole == 'user' && page == 4 && <PendingFormTable></PendingFormTable>
        }
        {
          status === 'disable' && userRole == 'user' && 
          (
            <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
          <Alert severity="warning">Form ခဏပိတ်ထားပါတယ်။ တခုခု လိုချင်ပါက admin ကို ဆက်သွယ်ပါ။</Alert>

          </Box>
          )
        }
        
    </Container>
      </Container>
      </UserContext.Provider>
  );
}

export default withAuthenticator(HomePage);