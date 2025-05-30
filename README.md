# 🎬 Simple Movies App

A React + TypeScript movie search and favorites application. This app demonstrates debounced search, global state management with Context + Reducer, protected routing, and component-level performance optimization.


## How to search and find a movie

Since the application is built using a mock API, all movies are titled `Movie Title ${index}`, searching within this parameter would make it easy to find a movie.

---

## ✨ Features

- 🔍 **Movie Search** with debounced query input and dynamic results.
- 📄 **Movie Details Page** with director, plot, cast, and genre.
- ⭐ **Favorites** functionality with Context API + `useReducer`.
- 👤 **Login system** with route redirection and protected access.
- ⚙️ **Mocked API** for movie search and detail fetching with artificial delays.
- 🧪 **Complete Unit Testing** using Vitest + Testing Library.
- 💅 **Responsive UI** using `styled-components`.

---

## 🚀 Demo

[Netlify link](https://68398165083d3e246b641dd1--gghdsw.netlify.app/) — or deploy locally using the instructions below.

---

## 📦 Tech Stack

| Tool                  | Purpose                       |
| --------------------- | ----------------------------- |
| **React 19**          | UI library                    |
| **TypeScript**        | Static typing                 |
| **React Router v7**   | Routing                       |
| **Styled Components** | CSS-in-JS styling             |
| **Vitest**            | Unit testing                  |
| **Testing Library**   | React testing utilities       |
| **Vite**              | Build and dev server          |
| **Context + Reducer** | Global state (auth/favorites) |
| **JSDOM**             | Browser-like test env         |

---

## 📂 Folder Structure (Simplified)

```bash
src/
├── api/ # Mock movie API
├── components/ # Reusable UI components
├── constants.ts # Constant keys & route config
├── contexts/ # Auth & favorites context
├── hooks/ # Custom React hooks
├── test-utils/ # Testing utilities
├── App.tsx # Main app with routing
├── main.tsx # Entry point
```

## 🛠️ Setup & Development

### 1. Install Yarn (if not installed)

```bash
npm install -g yarn
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Start development server

```bash
yarn dev
```

### 4. Run tests

```bash
yarn test
```

### 5. Run tests in watch/UI/coverage mode

```bash
yarn test:watch        # Watch mode
yarn test:ui           # Vitest UI dashboard
yarn test:coverage     # Coverage report
```

### 6. Lint the project

```bash
yarn lint
```

### 7. Build for production

```bash
yarn build
yarn preview
```

### 🔐 Protected Routes

The `/favorites` page is protected. Attempting to access it when not authenticated will redirect to the login page and then return after login.

### 🧪 Test Coverage

All major components and hooks are tested:

- useAuth, useFavoritesOperation, useMovieDetails, useSearchMovies

- Components like MovieSearch, MovieDetails, Favorites, NavBar, etc.

Tests include:

- Route behavior

- Hook behavior with mocked contexts

- Form submission and redirects

- Reducer logic

Run:

```bash
yarn test:coverage
```

### 🧠 Architectural Highlights

- useDebouncedQueryParam: Combines URL sync and debounce

- useAuth + ProtectedRoute: Lightweight login mechanism with redirect support

- useFavoritesOperation: Encapsulates add/remove logic from favorites

- api: All movie data is mock-generated (7000+ items) to simulate real-world mini-scale

### 📌 Future Enhancements

- Move navigation bar from top to bottom for mobile view

- Save how far user has scrolled when they click on favorites should in case they are not logged in so that they are scrolled to the exact movie after logging in. (Another solution is to use a modal for logging in to improve UX)

- Pagination or infinite scroll

- Genre-based filtering

- CI workflow for test + lint

- E2E test using tools like Playwright

- Add caching with expiry time to context: Cache API responses (e.g. movie details or search results) in context, and expire them after a specified duration (e.g. 10 minutes) to avoid stale data and reduce API load.

### 📃 License

MIT — feel free to fork and use.

### 🙋‍♂️ Author

Saheed Oladele — [GitHub](https://github.com/suretrust) | [LinkedIn](https://www.linkedin.com/in/saheed-oladele/)
