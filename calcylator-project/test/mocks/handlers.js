import { http, HttpResponse } from 'msw';

export const handlers = [

  http.get('https://api.example.com/movies', () => {
    return HttpResponse.json([{ title: 'Film 1' }]);
  })
];
