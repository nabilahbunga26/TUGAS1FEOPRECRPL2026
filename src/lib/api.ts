import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockFilms, mockGenres, mockReviews } from './mockData';
import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  limit as fsLimit, 
  startAfter, 
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

const API_URL = 'https://film-management-api.labse.id/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup mock adapter
const mock = new MockAdapter(api, { delayResponse: 500 });

// Mock /auth/login
mock.onPost('/auth/login').reply((config) => {
  const { email, password } = JSON.parse(config.data);
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: any) => u.email === email && u.password === password);
  
  if (user) {
    return [200, {
      success: true,
      message: "success login",
      data: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF0bWluQGVtYWlsLmNvbSIsImV4cCI6MTc0NTIyMzA1OSwiaXNzIjoiRmlsbSBNYW5hZ2VtZW50Iiwicm9sZSI6IkFETUlOIiwidXNlcl9pZCI6ImExYTJiNDczLWYzOTgtNDQ4OS1iN2VmLTY5ODRiNjBlNGYxMCJ9.igelKg3yF69t3bu8kwhIRigNSI8vIxso9JePUEb9sKw",
        role: email === 'atmin@email.com' ? 'ADMIN' : 'USER'
      }
    }];
  }
  
  return [401, {
    success: false,
    message: "failed login",
    error: "invalid email or password"
  }];
});

// Mock /api/ping (GET)
mock.onGet('/api/ping').reply(200, {
  message: "pong"
});

// Mock /reactions/:id (PUT)
mock.onPut(/\/reactions\/[a-zA-Z0-9-]+$/).reply((config) => {
  const token = config.headers?.Authorization?.split(' ')[1];
  
  if (!token) {
    return [401, { success: false, message: "unauthorized" }];
  }
  
  // Parse the request body to get the status
  const body = JSON.parse(config.data);
  
  return [200, {
    status: body.status
  }];
});

// Mock /reactions (POST)
mock.onPost('/reactions').reply((config) => {
  const token = config.headers?.Authorization?.split(' ')[1];
  
  if (!token) {
    return [401, { success: false, message: "unauthorized" }];
  }
  
  return [201, {
    success: true,
    message: "success create reaction"
  }];
});

// Mock /reviews (POST)
mock.onPost('/reviews').reply((config) => {
  const token = config.headers?.Authorization?.split(' ')[1];
  
  if (!token) {
    return [401, { success: false, message: "unauthorized" }];
  }
  
  return [201, {
    success: true,
    message: "success create review"
  }];
});

// Mock /film-lists/:id (PATCH)
mock.onPatch(/\/film-lists\/[a-zA-Z0-9-]+$/).reply((config) => {
  const token = config.headers?.Authorization?.split(' ')[1];
  
  if (!token) {
    return [401, { success: false, message: "unauthorized" }];
  }
  
  return [200, {
    success: true,
    message: "success update film list"
  }];
});

// Mock /film-lists (POST)
mock.onPost('/film-lists').reply((config) => {
  const token = config.headers?.Authorization?.split(' ')[1];
  
  if (!token) {
    return [401, { success: false, message: "unauthorized" }];
  }
  
  return [201, {
    success: true,
    message: "success create film list"
  }];
});

// Mock /genres/:id (PUT)
mock.onPut(/\/genres\/[a-zA-Z0-9-]+$/).reply((config) => {
  const token = config.headers?.Authorization?.split(' ')[1];
  
  if (!token) {
    return [401, { success: false, message: "unauthorized" }];
  }
  
  const id = config.url?.split('/').pop();
  const { name } = JSON.parse(config.data);
  
  return [200, {
    success: true,
    message: "success update genre",
    data: {
      id: id,
      name: name
    }
  }];
});

// Mock /genres (GET)
mock.onGet('/genres').reply(async () => {
  try {
    const genresCol = collection(db, 'genres');
    const snapshot = await getDocs(genresCol);
    const genres = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // If empty, use mock data as fallback or seed
    if (genres.length === 0) {
      return [200, { success: true, message: "success get list genre", data: mockGenres }];
    }
    
    return [200, { success: true, message: "success get list genre", data: genres }];
  } catch (error) {
    console.error("Firebase Error:", error);
    return [200, { success: true, message: "success get list genre", data: mockGenres }];
  }
});

// Mock /films (GET)
mock.onGet('/films').reply(async (config) => {
  try {
    const { search, genre_id, page = 1, limit = 12 } = config.params || {};
    const filmsCol = collection(db, 'films');
    let q = query(filmsCol);

    if (genre_id && genre_id !== 'all') {
      q = query(q, where('genre_id', '==', genre_id));
    }

    const snapshot = await getDocs(q);
    const firestoreFilms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Merge firestore films with mock films, avoiding duplicates by ID
    let allFilms = [...firestoreFilms];
    const firestoreIds = new Set(firestoreFilms.map((f: any) => f.id));
    
    mockFilms.forEach(mockFilm => {
      if (!firestoreIds.has(mockFilm.id)) {
        // Apply genre filter to mock films if needed
        if (!genre_id || genre_id === 'all' || mockFilm.genre_id === genre_id) {
          allFilms.push(mockFilm);
        }
      }
    });

    // Local search filter
    if (search) {
      const searchLower = search.toLowerCase();
      allFilms = allFilms.filter((f: any) => f.title.toLowerCase().includes(searchLower));
    }

    const total = allFilms.length;
    const total_pages = Math.ceil(total / limit);
    const paginatedFilms = allFilms.slice((page - 1) * limit, page * limit);

    return [200, {
      success: true,
      message: "success get list film",
      data: paginatedFilms,
      meta: [
        {
          take: limit,
          page: page,
          total_data: total,
          total_page: total_pages
        }
      ]
    }];
  } catch (error) {
    console.error("Firebase Error:", error);
    return [200, {
      success: true,
      message: "success get list film",
      data: mockFilms.slice(0, 12),
      meta: [
        {
          take: 12,
          page: 1,
          total_data: mockFilms.length,
          total_page: Math.ceil(mockFilms.length / 12)
        }
      ]
    }];
  }
});

// Mock /films/:id (GET)
mock.onGet(/\/films\/[a-zA-Z0-9-]+$/).reply(async (config) => {
  const id = config.url?.split('/').pop();
  
  try {
    const filmDoc = await getDoc(doc(db, 'films', id!));
    if (filmDoc.exists()) {
      return [200, {
        success: true,
        message: "success get detail film",
        data: { id: filmDoc.id, ...filmDoc.data() }
      }];
    }
  } catch (error) {
    console.error("Firebase Error:", error);
  }

  const film = mockFilms.find(f => f.id === id);
  if (film) {
    return [200, {
      success: true,
      message: "success get detail film",
      data: film
    }];
  }

  return [404, {
    success: false,
    message: "film not found"
  }];
});

// Mock /films/:id/reviews
mock.onGet(/\/films\/[a-zA-Z0-9]+\/reviews/).reply((config) => {
  const id = config.url?.split('/')[2]; // /films/id/reviews
  const reviews = mockReviews.filter(r => r.film_id === id);
  return [200, { data: reviews }];
});

// Mock /film-lists
mock.onGet('/film-lists').reply(200, {
  data: []
});

// Mock /auth/me
mock.onGet('/auth/me').reply((config) => {
  const token = config.headers?.Authorization?.split(' ')[1];
  
  if (token) {
    // In a real app, we would decode the JWT. Here we mock it based on the token.
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === 'atmin@email.com'); // Mocking admin user
    
    if (user) {
      return [200, {
        success: true,
        message: "success get me",
        data: {
          personal_info: {
            id: user.id,
            username: user.username,
            email: user.email,
            display_name: user.display_name,
            bio: user.bio,
            role: user.email === 'atmin@email.com' ? 'ADMIN' : 'USER'
          }
        }
      }];
    }
  }
  
  return [401, {
    success: false,
    message: "failed get me",
    error: "unauthorized"
  }];
});

// Mock /genres (POST)
mock.onPost('/genres').reply((config) => {
  const { name } = JSON.parse(config.data);
  const newGenre = {
    id: Math.random().toString(36).substr(2, 9),
    name
  };
  
  return [201, {
    success: true,
    message: "success create genre",
    data: newGenre
  }];
});

// Mock /users/:id
mock.onGet(/\/users\/[a-zA-Z0-9-]+$/).reply((config) => {
  const id = config.url?.split('/').pop();
  
  return [200, {
    success: true,
    message: "success get detail user",
    data: {
      id: id,
      username: "azka rizqullah",
      name: "azka rizqullah",
      display_name: "Azkuun",
      role: "User",
      bio: "Aku Sigma boy",
      film_lists: [
        {
          film_title: "The Matrix",
          list_status: "watching"
        }
      ],
      reviews: [
        {
          film: "The Matrix",
          rating: 9,
          comment: "Mind-blowing action and philosophy."
        },
        {
          film: "Inception",
          rating: 9,
          comment: "A masterpiece of storytelling."
        },
        {
          film: "The Dark Knight",
          rating: 10,
          comment: "Best superhero movie ever."
        }
      ]
    }
  }];
});

// Pass through any other requests (though they will fail if the real API is down)
mock.onAny().passThrough();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Optional: redirect to login
    }
    return Promise.reject(error);
  }
);
