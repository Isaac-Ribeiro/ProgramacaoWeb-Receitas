import { MariaPrea } from "./componentes";
import { Mensagem } from "./componentes";

export default function NovaRotaHome(){
    return (
       <div>
          <h1>Nova Rota, Nova Página</h1>
          <MariaPrea/>
          <Mensagem texto="Morreu Maria Preá..." cor="crimson" tamanho="28px"/>
          <Mensagem texto="Viva Santana!" cor="green" tamanho="20px"/>
          <Mensagem texto="Mensagem sem cor nem tamanho"/>
       </div>
    )
}
