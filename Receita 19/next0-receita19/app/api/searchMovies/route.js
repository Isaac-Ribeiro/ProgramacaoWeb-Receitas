export async function GET(request) {
    const apiKey = process.env.OMDB_API_KEY
    if (!apiKey) {
        return Response.json(
            { Response: 'False', Error: 'OMDB_API_KEY is missing. Set it in .env.local.' },
            { status: 500 }
        )
    }

    const titleSearchKey = new URL(request.url).searchParams.get('titleSearchKey')?.trim()
    if (!titleSearchKey) {
        return Response.json(
            { Response: 'False', Error: 'A movie title is required.' },
            { status: 400 }
        )
    }

    const params = new URLSearchParams({ apikey: apiKey, s: titleSearchKey })
    const response = await fetch(`https://www.omdbapi.com/?${params}`, { cache: 'no-store' })
    const data = await response.json()

    return Response.json(data, { status: response.status })
}
