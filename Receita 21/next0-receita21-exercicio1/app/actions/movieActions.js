'use server'

export async function searchMovies(formData) {
    const rawTitle = formData.get('titleSearchKey')
    const titleSearchKey = typeof rawTitle === 'string' ? rawTitle.trim() : ''
    if (!titleSearchKey) {
        return { Response: 'False', Search: [], error: 'Informe um título para pesquisar.' }
    }

    const apiKey = process.env.OMDB_API_KEY
    if (!apiKey) {
        return {
            Response: 'False',
            Search: [],
            error: 'OMDB_API_KEY is missing. Set it in .env.local.',
        }
    }

    const params = new URLSearchParams({ apikey: apiKey, s: titleSearchKey })
    try {
        const response = await fetch(`https://www.omdbapi.com/?${params}`, { cache: 'no-store' })
        const data = await response.json()
        if (!response.ok || data.Response !== 'True') {
            return {
                Response: 'False',
                Search: [],
                error: data.Error ?? `A pesquisa falhou (${response.status}).`,
            }
        }
        return data
    } catch (error) {
        if (!(error instanceof TypeError) && !(error instanceof SyntaxError)) {
            throw error
        }
        return { Response: 'False', Search: [], error: 'Não foi possível consultar a OMDb.' }
    }
}
