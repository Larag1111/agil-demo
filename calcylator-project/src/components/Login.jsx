import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [movies, setMovies] = useState([]);

  const handleLogin = async () => {
    const res = await fetch('https://tokenservice-jwt-2025.vercel.app/token-service/v1/request-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    const token = data.token;

    const movieRes = await fetch('https://tokenservice-jwt-2025.vercel.app/movies', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const moviesData = await movieRes.json();
    setMovies(moviesData);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Användarnamn"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Logga in och hämta filmer</button>

      <ul>
        {movies.map((m) => (
          <li key={m.id}>{m.title}</li>
        ))}
      </ul>
    </>
  );
}
