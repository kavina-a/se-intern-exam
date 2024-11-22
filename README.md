# **Leaf and Lit**

Welcome to **Leaf and Lit**, a web application where book lovers can explore, review and share thoughts on their favorite books. This project was designed to provide users with an interactive platform to discover books, write reviews and engage with a community of readers.

---

## **Assumptions**

### **1. Reviews for Specific Books**
From what I understood, the functionality of retrieving a specific review by its ID is already indirectly achieved. Each book displays its associated reviews which means reviews are inherently tied to their respective books.  

Since I already implemented a system where reviews for a specific book are fetched and displayed, adding a separate route to retrieve a specific review by its ID felt redundant in this context.  

If a user needs to locate a particular review, they can browse through the reviews listed for the respective book. 

---  

## **Features**

### **1. User Authentication**
- Users can securely sign up, log in, and log out.
- Authentication is handled using **JWT tokens** for secure session management.

### **2. Book Exploration**
- Users can browse a grid of books, complete with titles, authors and cover images.
- Clicking on a book provides detailed information, including:
  - Book Title
  - Author
  - Description
  - Average Rating

### **3. Reviews and Ratings**
- Users can:
  - Write reviews for books.
  - Rate books on a scale of 1 to 5 stars.
- Each book displays:
  - A list of all user reviews.
  - The average rating calculated dynamically.

### **4. Personal Review Management**
- Users can view, edit and delete their own reviews directly.
- Editing and deleting reviews are secured and only accessible by the review owner.

---

## **Technologies Used**

### **Frontend**
- **React**
- **Material UI**
- **React Router**

### **Backend**
- **Node.js** and **Express**
- **MongoDB**
- **JWT**

---

### **Future Improvements**
While the project is functional and was time limited, there are areas that could be enhanced:

- **Search and Filter**: 
  - Add functionality to search for books by title, author or genre.

- **User Profile**: 
  - Implement a profile page where users can manage their reviews, view their review history and update their account settings.

- **File Upload**:
  - Currently, book cover images are stored with a URL. Implement functionality for uploading cover images directly and storing them on cloud storage platforms like **AWS S3** for better scalability and storage management.

- **Admin Dashboard**: 
  - Add an admin panel where an authorized user can handle.

- **Enhanced User Interaction**: 
  - Implement a "Like" or "Helpful" button for reviews so users can interact more with the reviews they find useful.

- **Rating System Improvement**: 
  - Add the ability for users to edit their rating for a book after posting a review.

---

## **Setting Up - Installation - FrontEnd**

### **1. Clone the repository **
   `git clone https://github.com/kavina-a/book-review-application.git`


### **2. 	Navigate to the backend directory:**
`cd book-review-application/server`


### **3. 	Install the required dependencies:**
`npm install`


### **4. 	Set up your environment variables:**
`MONGO_URI=your_mongodb_connection_string`
`JWT_SECRET=your_jwt_secret`
`PORT=5001`


### **5. 	Run the server:**
`npm start`



## **Setting Up - Installation - BackEnd**

### **1. 	Navigate to the frontend directory:**
`cd book-review-application/client`


### **2. 	Install the required dependencies:**
`cd book-review-application/server`


### **3. 	Run the server:**
`npm start`

