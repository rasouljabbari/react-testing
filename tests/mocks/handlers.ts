import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/categories', () => {
        return HttpResponse.json([
            {
                id: 1,
                name: 'Electronices'
            },
            {
                id: 2,
                name: 'Beauty'
            },
            {
                id: 3,
                name: 'Gardening'
            }
        ])
    })
]