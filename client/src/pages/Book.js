import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Card, CardContent, Typography, Button, Grid } from '@mui/material'; 


import CreateReview from '../components/CreateReview';
import ReviewList from '../components/AllReviews';
import MyReviews from '../components/MyReviews';

const BookDetail = () => {
  const { bookId } = useParams(); 
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const userId = localStorage.getItem('userId'); 
  const [reviews, setReviews] = useState([]); // used to store reviews

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/books/${bookId}`);
      const data = await response.json();
      setBook(data.book); 
      setAverageRating(data.averageRating);
  
    } catch (err) {
      setError('Failed to fetch book details');
    }
  };

  const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, newReview]); 
  };

  useEffect(() => {
    fetchBookDetails(); 
  }, [bookId]);

  if (error) return <p>{error}</p>;

  if (!book) return <p>Loading...</p>;

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: '20px' }}>

        <Card sx={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h3" component="h1" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>{book.title}</Typography>
            <Typography variant="h6" sx={{ marginBottom: '20px', fontStyle: 'italic' }}>Written By - {book.author}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <img
                src={book.coverImage}
                alt={book.title}
                style={{ maxWidth: '200px', maxHeight: '300px', objectFit: 'cover' }}
              />
            </Box>
            <Typography variant="body1" sx={{ marginBottom: '20px' }}>{book.description}</Typography>
            <Typography variant="h5" sx={{ marginTop: '20px', fontWeight: 'bold' }}>Average Rating: {averageRating} / 5</Typography>
          </CardContent>
        </Card>

        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' , marginTop:'100px'}}>
          Review Section
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ padding: '20px', backgroundColor: 'white', boxShadow: 2 }}>
              <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>Create a Review </Typography>
              <CreateReview bookId={bookId} onReviewSubmit={handleReviewSubmit} />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ padding: '20px', backgroundColor: 'white', boxShadow: 2}}>
              <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}> Your Reviews</Typography>
              <MyReviews userId={userId} bookId={bookId} />
            </Card>
          </Grid>
        </Grid>

        <ReviewList bookId={bookId} />

      </Box>
    </Container>
  );
};

export default BookDetail;