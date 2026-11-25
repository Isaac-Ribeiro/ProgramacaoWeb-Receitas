'use client'

import Form from 'next/form'
import { memo, useCallback, useState } from 'react'

export default function Home() {
    const [titleSearchKey, setTitleSearchKey] = useState('')
    const [resultMovies, setResultMovies] = useState([])
    const [error, setError] = useState('')

    const handleTitleChange = useCallback((event) => {
        setTitleSearchKey(event.target.value)
    }, [])

    const handleAction = useCallback(async (formData) => {
        const title = String(formData.get('titleSearchKey') ?? '').trim()
        if (!title) {
            setResultMovies([])
            setError('Informe um título para pesquisar.')
            return
        }

        setError('')
        try {
            const response = await fetch(`/api/movies?s=${encodeURIComponent(title)}`)
            const jsonRes = await response.json()
            if (!response.ok || jsonRes.Response !== 'True') {
                setResultMovies([])
                setError(jsonRes.Error ?? `A pesquisa falhou (${response.status}).`)
                return
            }
            setResultMovies(jsonRes.Search ?? [])
        } catch (error) {
            if (!(error instanceof TypeError) && !(error instanceof SyntaxError)) {
                throw error
            }
            setResultMovies([])
            setError('Não foi possível conectar ao serviço de filmes.')
        }
    }, [])

    return (
        <div>
            <MovieForm
                handleAction={handleAction}
                onTitleChange={handleTitleChange}
                titleSearchKey={titleSearchKey}
            />
            {error && <p role="alert">{error}</p>}
            <MovieTable movies={resultMovies} />
        </div>
    )
}

export const MovieForm = memo(function MovieForm({
    handleAction,
    onTitleChange,
    titleSearchKey,
}) {
    return (
        <Form action={handleAction}>
            <label htmlFor="idTitleSearchKey">Título</label>
            <input
                id="idTitleSearchKey"
                name="titleSearchKey"
                onChange={onTitleChange}
                required
                value={titleSearchKey}
            />
            <button type="submit">Pesquisar</button>
        </Form>
    )
})

export const MovieTable = memo(function MovieTable({ movies }) {
    return (
        <div>
            {movies.map((movie) => (
                <div key={movie.imdbID}>{movie.Title} --- {movie.Year}</div>
            ))}
        </div>
    )
})
