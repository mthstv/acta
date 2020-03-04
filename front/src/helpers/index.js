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
};

export const handleRole = (role) => {
  switch(role) {
  case "CONSULTANT":
    return "Consultor";
  case "ADMIN":
    return "Administrador";
  default:
    return "";
  }
};

export const handleElementName = (element) => {
  switch(element.toLowerCase()) {
  case "rule":
    return "Regra";
  case "part":
    return "Parte";
  case "book":
    return "Livro";
  case "title":
    return "Título";
  case "chapter":
    return "Capítulo";
  case "section":
    return "Seção";
  case "subsection":
    return "Subseção";
  case "article":
    return "Artigo";
  case "paragraph":
    return "Parágrafo";
  case "incise":
    return "Inciso";
  case "line":
    return "Alínea";
  case "item":
    return "Item";
  default:
    return "";
  }
};

export const handleUrlTranslateElement = (element) => {
  switch(element.toLowerCase()) {
  case "regra":
    return "rule";
  case "parte":
    return "part";
  case "livro":
    return "book";
  case "titulo":
    return "title";
  case "capitulo":
    return "chapter";
  case "secao":
    return "section";
  case "subsecao":
    return "subsection";
  case "artigo":
    return "article";
  case "paragrafo":
    return "paragraph";
  case "inciso":
    return "incise";
  case "alinea":
    return "line";
  case "item":
    return "item";
  default:
    return "";
  }
};

export const elementToString = (elementName, element) => {
  switch(elementName.toLowerCase()) {
  case "part":
    return element.name;
  case "book":
    return `Livro ${Romanize(element.number)} - ${element.name}`;
  case "title":
    return `Título ${Romanize(element.number)} - ${element.name}`;
  case "chapter":
    return `Capítulo ${Romanize(element.number)} - ${element.name}`;
  case "section":
    return `Seção ${Romanize(element.number)} - ${element.name}`;
  case "subsection":
    return `Subseção ${Romanize(element.number)} - ${element.name}`;
  case "article":
    return `Art. ${element.number < 10 ? element.number+"º" : element.number } - ${element.text}`;
  case "paragraph":
    return `§ ${element.number}º - ${element.text}`;
  case "incise":
    return `${Romanize(element.number)} - ${element.text}`;
  case "line":
    return `${element.letter}) ${element.text}`;
  case "item":
    return `${element.number}. ${element.text}`;
  default:
    return "";
  }
};
