import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { ProtectedRoute } from './components/ProtectedRoute';
import { NavBar } from './components/NavBar';
import { lazy, Suspense } from 'react';
import { LoadingMessage } from './components/LoadingMessage';

const LazyMovieSearch = lazy(() =>
  import('./components/MovieSearch').then((module) => ({
    default: module.MovieSearch,
  }))
);
const LazyLogin = lazy(() =>
  import('./components/Login').then((module) => ({ default: module.Login }))
);
const LazyMovieDetails = lazy(() =>
  import('./components/MovieDetails').then((module) => ({
    default: module.MovieDetails,
  }))
);
const LazyFavorites = lazy(() =>
  import('./components/Favorites').then((module) => ({
    default: module.Favorites,
  }))
);
const LazyNotFound = lazy(() =>
  import('./components/NotFound').then((module) => ({
    default: module.NotFound,
  }))
);

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<LoadingMessage />}>
        <Routes>
          <Route path='/' element={<LazyMovieSearch />} />
          <Route path='login' element={<LazyLogin />} />
          <Route path='movies/:movieId' element={<LazyMovieDetails />} />
          <Route
            path='favorites'
            element={
              <ProtectedRoute>
                <LazyFavorites />
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<LazyNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
