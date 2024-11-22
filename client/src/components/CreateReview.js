import { useState } from 'react';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


const CreateReview = ({ bookId, onReviewSubmit }) => {
  
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const token = localStorage.getItem('token'); // getting the JWT token

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!bookId) {
      alert('Book ID is required');
      return;
    }
    
    const newReview = { reviewText, rating, bookId };

    try {
      const response = await fetch(`http://localhost:5001/api/reviews/${bookId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(newReview),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('Review submitted successfully!');
        
        onReviewSubmit(data); 
        setReviewText('');
        setRating(1);
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to submit review');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Something went wrong!');
    }

  };

  return (
    <Box sx={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>

      <form onSubmit={handleSubmit}>

        <TextField
          label="Write your review"
          multiline
          rows={2}
          variant="outlined"
          fullWidth
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />

        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel>Rating</InputLabel>
          <Select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            label="Rating"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <MenuItem key={star} value={star}>
                {star} Star{star > 1 ? 's' : ''}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ padding: '10px', fontSize: '12px' , backgroundColor: '#4CAF50'}}
        >
          Submit Review
        </Button>
      </form>
    </Box>
  );
};

export default CreateReview;