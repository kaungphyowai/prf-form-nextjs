import { Box, Button, CircularProgress, TextField } from '@mui/material'
import React, { useState } from 'react'
import extendUserSubmit from '../../utilites/ExtendUser/extendUserSubmit'

const ExtendUserForm = () => {
  const [loading, setloading] = useState(false)

  return (
    loading ? (<Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>):
      (
        <Box component="form" onSubmit={extendUserSubmit}  sx={{ mt: 1 }}>
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
                >
                Check
            </Button>
          </Box>
          )
  )
}

export default ExtendUserForm