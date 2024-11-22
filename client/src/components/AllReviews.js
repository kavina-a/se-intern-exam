import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';  

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    const token = localStorage.getItem('token'); 
    try {
      const response = await fetch(`http://localhost:5001/api/reviews/${bookId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });
      
      const data = await response.json();

      console.log("Fetched reviews data:", data);  // Log the response


      if (Array.isArray(data)) { //check if its an array, cause u get an error if not when calling map()
        setReviews(data); 
      } else {
        setError('Reviews data is not in the expected array format');
      }

      } catch (err) {
      setError('Failed to fetch reviews');
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchReviews();  
    }
  }, [bookId]);

  if (error) return <p>{error}</p>;
  if (reviews.length === 0) return <p>No reviews yet for this book.</p>;

  return (
    <Box sx={{ padding: '20px 0', marginTop: '50px' }}>

<Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' , marginTop:'100px'}}>
Reviews from Around the Globe
</Typography>
    
      {reviews.map((review) => (
        <Card key={review._id} sx={{ marginBottom: '20px', boxShadow: 3, borderLeft: `5px solid #4CAF50`, backgroundColor: '#ffffff' }}>
          <CardContent>
            <Typography 
              variant="h6" 
              component="h4" 
              gutterBottom 
              sx={{ color: '#4CAF50', fontWeight: 'bold' }}
            >
              Rating: {review.rating} / 5
            </Typography>
            <Typography 
              variant="body1" 
              gutterBottom 
              sx={{ color: '#555', fontSize: '1rem' }}
            >
              {review.reviewText}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ color: '#888', fontSize: '0.875rem' }}
            >
              Review posted on {new Date(review.createdAt).toLocaleDateString()} at{' '}
              {new Date(review.createdAt).toLocaleTimeString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ReviewList;