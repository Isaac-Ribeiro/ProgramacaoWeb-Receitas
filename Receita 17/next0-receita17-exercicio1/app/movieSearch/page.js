import Form from 'next/form'

export default function MovieForm() {
    return (
        <Form action="/movies">
            <label htmlFor="idTitleSearchKey">Título</label>
            <input id="idTitleSearchKey" name="titleSearchKey" />
            <label htmlFor="idYearSearchKey">Ano</label>
            <input id="idYearSearchKey" name="yearSearchKey" type="number" />
            <button type="submit">Pesquisar</button>
        </Form>
    )
}
