// Componente escrito dentro de um arquivo page.js (export simples, sem default)
export function Aviso(){
   return (
      <h2>Aviso: este componente mora em app/novarota/outra/page.js</h2>
   )
}

export default function OutraHome(){
    return (
       <div>
          <h1>Outra página</h1>
          <Aviso/>
       </div>
    )
}
