import { searchMovies } from './database.js'

export const dynamic = 'force-dynamic'

export async function GET(request) {
    const titleSearchKey = new URL(request.url).searchParams.get('titleSearchKey')?.trim()
    if (!titleSearchKey) {
        return Response.json(
            { Response: 'False', Error: 'A movie title is required.' },
            { status: 400 }
        )
    }

    return Response.json(searchMovies(titleSearchKey))
}
