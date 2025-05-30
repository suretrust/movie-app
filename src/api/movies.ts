export interface MovieSummary {
  movieId: string;
  title: string;
  year: string;
  poster: string;
}

export interface MovieDetails extends MovieSummary {
  plot: string;
  director: string;
  cast: string;
  genre: string;
}

export interface ErrorWithStatus extends Error {
  status?: number;
}

const genres = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Sci-Fi',
  'Thriller',
  'Romance',
  'Fantasy',
];
const directors = [
  'Jane Doe',
  'John Smith',
  'Emily Clark',
  'Robert Brown',
  'Alice Johnson',
];
const actors = [
  'Actor A',
  'Actor B',
  'Actor C',
  'Actor D',
  'Actor E',
  'Actor F',
];

const generateMockMovie = (i: number): MovieDetails => {
  const title = `Movie Title ${i}`;
  const year = `${1980 + Math.floor(Math.random() * 45)}`;
  const genre = genres
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
    .join(', ');
  const director = directors[Math.floor(Math.random() * directors.length)];
  const cast = actors
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .join(', ');
  const plot = `In the year ${year}, "${title}" takes audiences on a
    thrilling journey through the world of ${genre.toLowerCase()}.
    Directed by the visionary ${director}, the story follows the lives of ${cast},
    whose destinies intertwine in unexpected ways. As secrets unravel and
    challenges mount, the characters must confront their deepest fears and desires.
    With breathtaking visuals and a gripping narrative, "${title}" explores themes
    of love, betrayal, and redemption, keeping viewers on the edge of
    their seats from start to finish. The film's rich storytelling and
    unforgettable performances make it a standout in the genre,
    leaving a lasting impression long after the credits roll.`;
  const poster = `https://picsum.photos/200.webp?random=${i}`;

  return {
    movieId: crypto.randomUUID(),
    title,
    year,
    poster,
    plot,
    director,
    cast,
    genre,
  };
};

const mockMovies: MovieDetails[] = Array.from({ length: 7000 }, (_, i) =>
  generateMockMovie(i + 1)
);

const mockSearchMovies = (query: string): Promise<MovieSummary[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockMovies
        .filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        )
        .splice(0, 20);
      resolve(filtered);
    }, 1000);
  });
};

const mockGetMovieDetails = (movieId: string): Promise<MovieDetails> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const movie = mockMovies.find((m) => m.movieId === movieId);
      if (!movie) {
        const error: ErrorWithStatus = new Error('Movie not found.');
        error.name = 'NotFoundError';
        error.status = 404;
        reject(error);
      } else {
        resolve(movie);
      }
    }, 800);
  });
};

export const api = {
  searchMovies: mockSearchMovies,
  getMovieDetails: mockGetMovieDetails,
  mockMovies, // For testing purposes
};
