const montarTabela = (itens, idElemento, colunas, cabecalhos) => {
  const div = document.getElementById(idElemento)

  const linhaCabecalho = `<tr>${cabecalhos.map(c => `<th>${c}</th>`).join("")}</tr>`

  const linhas = itens.map(item => {
    const celulas = colunas.map(coluna => `<td>${item[coluna]}</td>`).join("")
    return `<tr>${celulas}</tr>`
  })

  div.innerHTML = `
    <table border="1">
      ${linhaCabecalho}
      ${linhas.join("\n")}
    </table>
  `
}
