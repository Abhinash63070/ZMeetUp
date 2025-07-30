import * as React from 'react';
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  IconButton
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthContext } from '../contexts/AuthContext';

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0); // 0: Sign In, 1: Sign Up
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  // Clear fields when switching between Sign In and Sign Up
  const handleFormSwitch = (_, value) => {
    setFormState(value);
    setUsername('');
    setPassword('');
    setName('');
    setError('');
    setMessage('');
  };

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        setUsername('');
        setMessage(result);
        setOpen(true);
        setError('');
        setFormState(0);
        setPassword('');
        setName('');
      }
    } catch (err) {
      let message = (err.response?.data?.message) || "Something went wrong";
      setError(message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #648ea3ff, #000C40 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 6, borderRadius: 4 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 0 }}>
          <Avatar sx={{ bgcolor: 'secondary.main', mb: 2 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            {formState === 0 ? 'Sign In' : 'Sign Up'}
          </Typography>
          <ToggleButtonGroup
            value={formState}
            exclusive
            onChange={handleFormSwitch}
            sx={{ mb: 2 }}
          >
            <ToggleButton value={0}>Sign In</ToggleButton>
            <ToggleButton value={1}>Sign Up</ToggleButton>
          </ToggleButtonGroup>
          <Box component="form" sx={{ width: '100%' }}>
            {formState === 1 && (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ borderRadius: 2, py: 1, fontWeight: 600 }}
            onClick={handleAuth}
          >
            {formState === 0 ? 'Login' : 'Register'}
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
}