import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const databasePath = join(process.cwd(), '.data', 'movies.sqlite')
const seedMovies = [
    { imdbID: 'local-001', Title: 'The Green Horizon', Year: '2023' },
    { imdbID: 'local-002', Title: 'A Quiet Station', Year: '2021' },
    { imdbID: 'local-003', Title: 'River of Stars', Year: '2024' },
    { imdbID: 'local-004', Title: 'The Last Orchard', Year: '2020' },
]

let database

function getDatabase() {
    if (database) return database

    mkdirSync(join(process.cwd(), '.data'), { recursive: true })
    database = new Database(databasePath)
    database.exec(`
        CREATE TABLE IF NOT EXISTS movies (
            imdb_id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            year TEXT NOT NULL
        )
    `)

    const count = database.prepare('SELECT COUNT(*) AS count FROM movies').get().count
    if (count === 0) {
        const insertMovie = database.prepare(
            'INSERT INTO movies (imdb_id, title, year) VALUES (@imdbID, @Title, @Year)'
        )
        database.transaction((movies) => {
            for (const movie of movies) insertMovie.run(movie)
        })(seedMovies)
    }

    return database
}

export function searchMovies(titleSearchKey) {
    const movies = getDatabase()
        .prepare('SELECT imdb_id AS imdbID, title AS Title, year AS Year FROM movies WHERE title LIKE ? COLLATE NOCASE ORDER BY title')
        .all(`%${titleSearchKey}%`)

    return {
        Search: movies,
        totalResults: String(movies.length),
        Response: movies.length ? 'True' : 'False',
        ...(movies.length ? {} : { Error: 'Movie not found!' }),
    }
}
