import { useState, useEffect } from 'react';
import { Card, CardContent, Button, Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel, colors } from '@mui/material';


const MyReviews = ({ userId, bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  const [editingReview, setEditingReview] = useState(null);
  const [editedReviewText, setEditedReviewText] = useState('');
  const [editedRating, setEditedRating] = useState(1);

  const fetchMyReviews = async () => {
    const token = localStorage.getItem('token'); 
    
    try {
      const response = await fetch(`http://localhost:5001/api/reviews/book/${bookId}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setReviews(data); 
      } else {
        const error = await response.json();
        console.error("Error fetching reviews:", error);
        setError(error.message);
      }
    } catch (err) {
      console.error("Network error fetching reviews:", err);
      setError('Network error');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMyReviews();  //fetch data when mounts
    }
  }, [userId]);


  const handleDelete = async (reviewId) => {
    const token = localStorage.getItem('token'); 

    try {
      const response = await fetch(`http://localhost:5001/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  
        },
      });

      if (response.ok) {
        setReviews(reviews.filter((review) => review._id !== reviewId)); // Remove deleted review from the state
        alert('Review deleted successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.message );
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Something went wrong!');
    }
  };

  const handleSaveEdit = async () => {
    const token = localStorage.getItem('token'); 
    const reviewId = editingReview._id;

    const updatedReview = {
      reviewText: editedReviewText,
      rating: editedRating,
    };

    try {
      const response = await fetch(`http://localhost:5001/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  
        },
        body: JSON.stringify(updatedReview),  
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(
          reviews.map((review) =>
            review._id === reviewId ? { ...review, ...data } : review
          )
        ); 
        setEditingReview(null);  // Clear the edit form
        alert('Review updated successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (err) {
      alert('Something went wrong!');
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review); 
    setEditedReviewText(review.reviewText);
    setEditedRating(review.rating);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {error && <Typography color="error">{error}</Typography>}
      {reviews.length === 0 ? (
        <Typography>You haven't posted any reviews yet.</Typography>
      ) : (
        reviews.map((review) => (
          <Card key={review._id} sx={{ marginBottom: '20px', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="body1" >Review: {review.reviewText}</Typography>
              <Typography variant="body1" component="body1">Rating: {review.rating} / 5</Typography>
              <Typography variant="body2" color="textSecondary" >
                Review posted on {new Date(review.createdAt).toLocaleDateString()} at {new Date(review.createdAt).toLocaleTimeString()}
              </Typography>

              <Button
                onClick={() => handleDelete(review._id)}
                variant="outlined"
                color="error"
                sx={{ marginRight: '11px' , marginTop: '22px'}}
              >
                Delete
              </Button>

              <Button
                onClick={() => handleEdit(review)}
                variant="contained"
                sx={{ marginRight: '11px' , marginTop: '22px', backgroundColor: '#4CAF50'}}
              >
                Edit
              </Button>

              {editingReview && editingReview._id === review._id && (
                <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
                  <Typography variant="h6" sx={{marginBottom: '20px'}}>Edit Your Review</Typography>
                  
                  <TextField
                    label="Review"
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    value={editedReviewText}
                    onChange={(e) => setEditedReviewText(e.target.value)}
                    sx={{ marginBottom: '23px' }}
                  />

                  <FormControl fullWidth sx={{ marginBottom: '22px' }}>
                    <InputLabel>Rating</InputLabel>
                    <Select
                      value={editedRating}
                      onChange={(e) => setEditedRating(Number(e.target.value))}
                      label="Rating"
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <MenuItem key={star} value={star}>
                          {star} Star{star > 1 ? 's' : ''}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button onClick={handleSaveEdit} variant="contained"  sx={{ marginRight: '11px' , backgroundColor: '#4CAF50'}}>
                    Save Edit
                  </Button>
                  <Button onClick={() => setEditingReview(null)} variant="outlined" sx={{ color: '#4CAF50'}}>
                    Cancel
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default MyReviews;