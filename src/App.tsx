import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { MovieSearch } from './components/MovieSearch';
import { Login } from './components/Login';
import { MovieDetails } from './components/MovieDetails';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Favorites } from './components/Favorites';
import { NotFound } from './components/NotFound';
import { NavBar } from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<MovieSearch />} />
        <Route path='login' element={<Login />} />
        <Route path='movies/:movieId' element={<MovieDetails />} />
        <Route
          path='favorites'
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
