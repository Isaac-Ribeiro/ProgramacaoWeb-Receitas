export function Cabecalho(){
    return (
        <div>Menu principal</div>
    )
}

export function Titulo(){
    return (
        <div>
            <h1>
                Viva Santana!
            </h1>
        </div>
    )
}

export function Rodape(){
    return (
        <div>Rodapé compartilhado</div>
    )
}

export default function Home(){
    return (
        <div>
            <Cabecalho />
            <Titulo />
            <Rodape />
        </div>
    )
}
