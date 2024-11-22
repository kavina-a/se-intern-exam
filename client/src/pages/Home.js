import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Button, CardActionArea ,Box, AppBar, Toolbar} from '@mui/material'; 
import { Link } from 'react-router-dom';


const Home = () => {
  const [books, setBooks] = useState([]); 
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/books');
      const data = await response.json();//json 
      setBooks(data); // Set books to state
    } catch (err) {
      setError('Failed to fetch books');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []); 


return (

  <div>
    <AppBar position="static" sx={{backgroundColor: '#4CAF50'}}>
        <Toolbar sx={{color: 'white'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Book Review Hub
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
  
      <Container sx={{ marginTop: 4 }}>
      <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{fontWeight: 'bold',color: '#4CAF50',}}>Explore, Review and Share Your Thoughts on Books</Typography>

          <Typography
          variant="body1"
          align="center"
          sx={{ marginBottom: 4, color: '#81C784' }}
        >
          Dive into a world of stories and ideas. Share your reviews and find
          your next favorite book!
        </Typography>

    <Grid container spacing={4}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <Card
                sx={{
                  boxShadow: 3,
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s',
                  },
                }}>
                <CardActionArea href={`/book/${book._id}`}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      style={{
                        maxWidth: '200px',
                        maxHeight: '300px',
                        marginTop: '16px',
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 'bold', color: '#333' }}
                    >
                      {book.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      By {book.author}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;