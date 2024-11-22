import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed, Try Again!');
      }

      // If successful, navigate to login page
      navigate('/login'); } catch (err) { setError(err.response?.data?.message || 'Signup failed, Try Again!');
    }
  };

  return (

    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h1" sx={{color: '#4CAF50'}}gutterBottom>Leaf & Lit</Typography>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>



    <form onSubmit={handleSignup}>
      {error && <Typography color="error">{error}</Typography>} 

      <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color='green'
            fullWidth
            sx={{ marginTop: 2 ,color: '#4CAF50'}}
          >
            Sign Up
          </Button>
        </form>

        <Typography variant="body2" sx={{ marginTop: 2 }}> Already have an account?{' '}
          <Button onClick={() => navigate('/login')} color="green">
            Login
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};
export default Signup;