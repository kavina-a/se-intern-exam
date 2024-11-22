import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookDetail from './pages/Book';

function App() {
  return (
      <Router>
         <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/book/:bookId" element={<BookDetail />} /> 
          </Routes>
        </main>
      </Router>
  );
}

export default App;