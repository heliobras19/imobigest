export const cpfMask = value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}
  
export const cnpjMask = (value) => {
  return value
  .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
  .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
  .replace(/(\d{4})(\d)/, '$1-$2')
  .replace(/(-\d{2})\d+?$/, '$1') // captura os dois últimos 2 números, com um - antes dos dois números
}

export const phoneMask = (value) => {
  return value
    .replace(/\D/g,'')
    .replace(/(\d{2})(\d)/,"($1) $2")
    .replace(/(\d)(\d{4})$/,"$1-$2")
}

export const cepMask = (value) => {
  return value
    .replace(/\D/g,'')
    .replace(/(\d{5})(\d)/,"$1-$2")
    .substr(0, 9); // Limita o tamanho máximo do valor em 9 caracteres
};