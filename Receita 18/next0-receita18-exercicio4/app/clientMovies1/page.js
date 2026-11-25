'use client'

import Form from 'next/form'
import { useState } from 'react'
import styles from './clientMovies1.module.css'

export default function Home() {
    const [resultMovies, setResultMovies] = useState([])
    const [error, setError] = useState('')

    async function handleAction(formData) {
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
    }

    return (
        <main className={styles.page}>
            <MovieForm handleAction={handleAction} />
            {error && <p className={styles.error} role="alert">{error}</p>}
            <MovieTable movies={resultMovies} />
        </main>
    )
}

export function MovieForm({ handleAction }) {
    return (
        <Form action={handleAction} className={styles.form}>
            <div className={styles.field}>
                <label htmlFor="idTitleSearchKey">Título</label>
                <input className={styles.input} id="idTitleSearchKey" name="titleSearchKey" required />
            </div>
            <button className={styles.button} type="submit">Pesquisar</button>
        </Form>
    )
}

export function MovieTable({ movies }) {
    return (
        <div className={styles.results}>
            {movies.map((movie) => (
                <div className={styles.movieRow} key={movie.imdbID}>
                    {movie.Title} --- {movie.Year}
                </div>
            ))}
        </div>
    )
}
