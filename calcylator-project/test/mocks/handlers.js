import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mocka login-anropet
  http.post('https://tokenservice-jwt-2025.vercel.app/token-service/v1/request-token', async ({ request }) => {
    const { username, password } = await request.json();
    if (username === 'demo' && password === 'demo') {
      return new HttpResponse(JSON.stringify({ token: 'mocked-jwt' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }),

  // Mocka hämtning av filmer
  http.get('https://tokenservice-jwt-2025.vercel.app/movies', () => {
    return HttpResponse.json([
      { id: 1, title: 'Inception' },
      { id: 2, title: 'Interstellar' }
    ]);
  })
];
