import Form from 'next/form'

export default function MoviesLayout({ children }) {
    return (
        <section>
            <Form action="/movies">
                <label htmlFor="idTitleSearchKey">Título</label>
                <input id="idTitleSearchKey" name="titleSearchKey" />
                <button type="submit">Pesquisar</button>
            </Form>
            <div aria-live="polite">{children}</div>
        </section>
    )
}
