export function MariaPrea(){
   return (
      <h2>Morreu Maria Preá...</h2>
   )
}

// Componente com parâmetros: recebe mensagem, cor e tamanho como propriedades
export function Mensagem({ texto, cor, tamanho }){
   return (
      <h2 style={{ color: cor, fontSize: tamanho }}>{texto}</h2>
   )
}
