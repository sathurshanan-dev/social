import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Post from './pages/Post';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new" element={<Post />} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
