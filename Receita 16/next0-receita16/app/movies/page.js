export const dynamic = 'force-dynamic'

function getSearchTitle(value) {
    const candidate = Array.isArray(value) ? value[0] : value
    return typeof candidate === 'string' && candidate.trim()
        ? candidate.trim()
        : 'bagdad'
}

export default async function Home({ searchParams }) {
    const apiKey = process.env.OMDB_API_KEY
    if (!apiKey) {
        throw new Error('OMDB_API_KEY is missing. Set it in .env.local.')
    }

    const { titleSearchKey } = await searchParams
    const title = getSearchTitle(titleSearchKey)
    const params = new URLSearchParams({ apikey: apiKey, s: title })
    const response = await fetch(`https://www.omdbapi.com/?${params}`)

    if (!response.ok) {
        throw new Error(`OMDb request failed with status ${response.status}.`)
    }

    const data = await response.json()
    if (data.Response !== 'True') {
        return <p role="status">{data.Error ?? 'A busca não retornou resultados.'}</p>
    }

    return (
        <div>
            <div>
                {data.Search.map((movie) => (
                    <div key={movie.imdbID}>{movie.Title} --- {movie.Year}</div>
                ))}
            </div>
        </div>
    )
}
