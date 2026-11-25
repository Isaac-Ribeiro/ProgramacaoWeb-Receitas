import Image from 'next/image'
import { notFound } from 'next/navigation'

export const revalidate = 86400

function getApiKey() {
    const apiKey = process.env.OMDB_API_KEY
    if (!apiKey) {
        throw new Error('OMDB_API_KEY is missing. Set it in .env.local before building.')
    }
    return apiKey
}

function createOmdbUrl(params) {
    const url = new URL('https://www.omdbapi.com/')
    url.search = params.toString()
    return url
}

export async function generateStaticParams() {
    const params = new URLSearchParams({
        apikey: getApiKey(),
        s: 'lady',
    })
    const response = await fetch(createOmdbUrl(params))
    const data = await response.json()

    if (!response.ok || data.Response !== 'True' || !Array.isArray(data.Search)) {
        throw new Error(data.Error ?? `OMDb search failed with status ${response.status}.`)
    }

    return data.Search.map((movie) => ({ id: movie.imdbID }))
}

export default async function MoviePage({ params }) {
    const { id } = await params
    const query = new URLSearchParams({ apikey: getApiKey(), i: id })
    const response = await fetch(createOmdbUrl(query), {
        next: { revalidate },
    })
    const movie = await response.json()

    if (!response.ok) {
        throw new Error(movie.Error ?? `OMDb request failed with status ${response.status}.`)
    }
    if (movie.Response !== 'True') {
        notFound()
    }

    return (
        <main>
            <h1>{movie.Title} ({movie.Year})</h1>
            <p>Director: {movie.Director}</p>
            <p>Plot: {movie.Plot}</p>
            {movie.Poster && movie.Poster !== 'N/A' && (
                <Image
                    src={movie.Poster}
                    alt={`Poster for ${movie.Title}`}
                    width={300}
                    height={450}
                />
            )}
        </main>
    )
}
