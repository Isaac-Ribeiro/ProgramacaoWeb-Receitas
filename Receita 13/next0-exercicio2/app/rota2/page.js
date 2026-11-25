import { Cabecalho, Titulo, Rodape } from '../page.js'

export default function Pagina(){
    return (
        <div>
            <Cabecalho />
            <Titulo />
            <div>Estou na rota2, reutilizando componentes de app/page.js</div>
            <Rodape />
        </div>
    )
}
