import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material';  

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      const { token, userId } = data;

      login(token, userId, { email });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed, Try Again!');
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
        <Typography variant="h4" gutterBottom>Login</Typography>

        <form onSubmit={handleLogin}>
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
            fullWidth
            sx={{ marginTop: 2 , color: '#4CAF50'}}
          >
            Login
          </Button>
        </form>

        <Typography variant="body2" sx={{ marginTop: 2 }}> Don't have an account?{' '}
          <Button onClick={() => navigate('/signup')} color='green'>
            Sign Up
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;