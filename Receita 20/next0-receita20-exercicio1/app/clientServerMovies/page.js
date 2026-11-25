'use client'

import Form from 'next/form'
import { useState } from 'react'
import { searchMovies } from '../actions/movieActions'

export default function Home() {
    const [data, setData] = useState({})

    async function handleAction(formData) {
        const result = await searchMovies(formData)
        setData(result)
    }

    return (
        <div>
            <MovieForm actionHandler={handleAction} />
            {data.error && <p role="alert">{data.error}</p>}
            {data.Search && <MovieTable movies={data.Search} />}
        </div>
    )
}

export function MovieForm({ actionHandler }) {
    return (
        <Form action={actionHandler}>
            <label htmlFor="idTitleSearchKey">Título</label>
            <input id="idTitleSearchKey" name="titleSearchKey" required />
            <label htmlFor="idYearSearchKey">Ano</label>
            <input id="idYearSearchKey" name="yearSearchKey" type="number" />
            <button type="submit">Pesquisar</button>
        </Form>
    )
}

export function MovieTable({ movies }) {
    return (
        <div>
            <div>
                {movies.map((movie) => (
                    <div key={movie.imdbID}>{movie.Title} --- {movie.Year}</div>
                ))}
            </div>
        </div>
    )
}
