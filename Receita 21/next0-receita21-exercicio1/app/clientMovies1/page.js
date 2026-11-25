'use client'

import Form from 'next/form'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
    const [resultMovies, setResultMovies] = useState([])
    const [error, setError] = useState('')

    async function handleAction(formData) {
        const titleSearchKey = String(formData.get('titleSearchKey') ?? '').trim()
        if (!titleSearchKey) {
            setResultMovies([])
            setError('Informe um título para pesquisar.')
            return
        }

        setError('')
        try {
            const response = await fetch(`/api/movies?s=${encodeURIComponent(titleSearchKey)}`)
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
    }

    return (
        <div>
            <MovieForm handleAction={handleAction} />
            {error && <p role="alert">{error}</p>}
            <MovieTable movies={resultMovies} />
        </div>
    )
}

export function MovieForm({ handleAction }) {
    return (
        <Form action={handleAction}>
            <label htmlFor="idTitleSearchKey">Título</label>
            <input id="idTitleSearchKey" name="titleSearchKey" required />
            <button type="submit">Pesquisar</button>
        </Form>
    )
}

export function MovieTable({ movies }) {
    return (
        <div>
            <div>
                {movies.map((movie) => (
                    <div key={movie.imdbID}>
                        <Link href={`/movie/${movie.imdbID}`}>{movie.Title}</Link> --- {movie.Year}
                    </div>
                ))}
            </div>
        </div>
    )
}
