export const Romanize = (num) => {
  if (isNaN(num))
    return NaN;
  var digits = String(+num).split(""),
    key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"],
    roman = "",
    i = 3;
  while (i--)
    roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

export const handleRole = (role) => {
  switch(role) {
    case 'CONSULTANT':
      return 'Consultor';
    case 'ADMIN':
      return 'Administrador';
    default:
      return '';
  }
}

export const handleElement = (element) => {
  switch(element.toLowerCase()) {
    case 'rule':
      return 'Regra';
    case 'part':
      return 'Parte';
    case 'book':
      return 'Livro';
    case 'title':
      return 'Título';
    case 'chapter':
      return 'Capítulo';
    case 'section':
      return 'Seção';
    case 'subsection':
      return 'Subseção';
    case 'article':
      return 'Artigo';
    case 'paragraph':
      return 'Parágrafo';
    case 'incise':
      return 'Inciso';
    case 'line':
      return 'Alínea';
    case 'item':
      return 'Item';
    default:
      return '';
  }
}