export const dynamic = 'force-dynamic'

function getSearchValue(value) {
    const candidate = Array.isArray(value) ? value[0] : value
    return typeof candidate === 'string' ? candidate.trim() : ''
}

export default async function Home({ searchParams }) {
    const apiKey = process.env.OMDB_API_KEY
    if (!apiKey) {
        throw new Error('OMDB_API_KEY is missing. Set it in .env.local.')
    }

    const { titleSearchKey, typeSearchKey, yearSearchKey } = await searchParams
    const title = getSearchValue(titleSearchKey) || 'bagdad'
    const type = getSearchValue(typeSearchKey)
    const year = getSearchValue(yearSearchKey)

    if (type && !['movie', 'series', 'episode'].includes(type)) {
        return <p role="alert">Tipo inválido. Use movie, series ou episode.</p>
    }
    if (year && !/^\d{4}$/.test(year)) {
        return <p role="alert">Informe o ano com quatro dígitos.</p>
    }

    const params = new URLSearchParams({ apikey: apiKey, s: title })
    if (type) params.set('type', type)
    if (year) params.set('y', year)

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
            {data.Search.map((movie) => (
                <div key={movie.imdbID}>{movie.Title} --- {movie.Year}</div>
            ))}
        </div>
    )
}
