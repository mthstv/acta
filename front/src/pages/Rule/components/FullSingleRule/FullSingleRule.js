import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Romanize } from "../../../../helpers";
const styles = {
  textFields: {
    textAlign: "left",
  },
  nameFields: {
    textAlign: "center",
  },
};

export const GetSingleRule = (props) => {

  // Getting the search element to add highlight class
  useEffect(() => {
    if(props.searchElement) {
      const highlightedElement = document.getElementById(props.searchElement.label + '-' + props.searchElement.id);
      if (highlightedElement) {
        highlightedElement.classList.add('search-highlight');
        window.scrollTo(0, highlightedElement.offsetTop)
        return () => highlightedElement.classList.remove('search-highlight');
      }
    }
  },[props.match.url, props.searchElement])

  // Handling redirect
  const editRedirect = (label, id) => {
    if(props.user.is_admin) {
      return props.editorMode ? props.history.push(`/editar-elemento/${label}/${id}`) : ''
    }
    if(props.user.is_consultant) {
      return props.editorMode ? props.history.push(`/nova-solicitacao/${label}/${id}`) : ''
    }
  }

  const getItemList = (list) => {
    return (list.map((item) => (
      <div
        id={'item-'+item.id} 
        style={styles.textFields} key={item.id} 
        className={props.editorMode ? "editorStyle" : null}
        onClick={() => editRedirect('item', item.id)}>
        {item.number}. {item.text}
      </div>
    )));
  };
  
  const getLineList = (list) => {
    return (list.map((line) => (
      <div key={line.id}>
        <div
          id={'line-'+line.id} 
          style={styles.textFields} key={line.id} 
          className={props.editorMode ? "editorStyle" : null}
          onClick={() => editRedirect('alinea', line.id)}>
          {line.letter + ')'} {line.text}
        </div>
        {getItemList(line.items)}
      </div>
    )));
  };
  
  const getInciseList = (list) => {
    return (list.map((incise) => (
      <div key={incise.id}>
        <div
          id={'incise-'+incise.id} 
          style={styles.textFields} key={incise.id} 
          className={props.editorMode ? "editorStyle" : null}
          onClick={() => editRedirect('inciso', incise.id)}>
          {Romanize(incise.number)} - {incise.text}
        </div>
        {getLineList(incise.lines)}
      </div>
    )));
  };
  
  const getParagraphList = (list) => {
    return (list.map((paragraph) => (
      <div key={paragraph.id}>
        <div
          id={'paragraph-'+paragraph.id} 
          style={styles.textFields} key={paragraph.id} 
          className={props.editorMode ? "editorStyle" : null}
          onClick={() => editRedirect('paragrafo', paragraph.id)}>
          {list.length === 1 
            ? `Parágrafo único - ${paragraph.text}` 
            : `§ ${paragraph.number}º - ${paragraph.text}`
          }
        </div>
        {getInciseList(paragraph.incises)}
        {getLineList(paragraph.lines)}
      </div>
    )));
  };
  
  const getArticleList = (list) => {
    return (list.map((article) => (
      <div key={article.id}>
        <div
          id={'article-'+article.id} 
          style={styles.textFields} key={article.id} 
          className={props.editorMode ? "editorStyle" : null}
          onClick={() => editRedirect('artigo', article.id)}>
          Art. {article.number < 10 ? article.number+"º" : article.number } - {article.text}
        </div>
        {getInciseList(article.incises)}
        {getLineList(article.lines)}
        {getParagraphList(article.paragraphs)}
      </div>
    )));
  };
  
  const getSubsectionList = (list) => {
    return (list.map((subSection) => (
      <div key={subSection.id}>
        <div
          id={'subsection-'+subSection.id} 
          style={styles.nameFields} key={subSection.id} 
          className={props.editorMode ? "editorStyle" : null}
          onClick={() => editRedirect('subsecao', subSection.id)}>
            Subseção {Romanize(subSection.number)}<br/>
          {subSection.name}
        </div>
        {getArticleList(subSection.articles)}
      </div>
    )));
  };
  
  const getSectionList = (list) => {
    return (list.map((section) => (
      <div key={section.id}>
        <div
          id={'section-'+section.id} 
          style={styles.nameFields} key={section.id} 
          className={props.editorMode ? "editorStyle" : null}
          onClick={() => editRedirect('secao', section.id)}>
            Seção {Romanize(section.number)}<br/>
          {section.name}
        </div>
        {getArticleList(section.articles)}
        {getSubsectionList(section.subsections)}
      </div>
    )));
  };
  
  const getChapterList = (list) => {
    return (list.map((chapter) => (
      <div key={chapter.id}>
        <div
          id={'chapter-'+chapter.id} 
          style={styles.nameFields} key={chapter.id} 
          className={props.editorMode ? "editorStyle" : null}
          onClick={() => editRedirect('capitulo', chapter.id)}>
            Capítulo {Romanize(chapter.number)}<br/> 
          {chapter.name}
        </div>
        {getArticleList(chapter.articles)}
        {getSectionList(chapter.sections)}
      </div>
    )));
  };
  
  const getTitleList = (list) => {
    return (list.map((title) => (
      <div key={title.id}>
        <div
          id={'title-'+title.id} 
          style={styles.nameFields} key={title.id} 
          className={props.editorMode ? "editorStyle" : null}
          onClick={() => editRedirect('titulo', title.id)}>
            Título {Romanize(title.number)}<br/>
          {title.name}
        </div>
        {getArticleList(title.articles)}
        {getChapterList(title.chapters)}
      </div>
    )));
  };
  
  const getBookList = (list) => {
    return (list.map((book) => (
      <div key={book.id}>
        <div
          id={'book-'+book.id} 
          style={styles.nameFields} key={book.id} 
          className={props.editorMode ? "editorStyle" : null}
          onClick={() => editRedirect('livro', book.id)}>
            Livro {Romanize(book.number)}<br/> 
          {book.name}
        </div>
        {getTitleList(book.titles)}
      </div>
    )));
  };
  
  const getPartList = (list) => {
    return (list.map((part) => (
      <div key={part.id} >
        <div
          id={'part-'+part.id} 
          style={styles.nameFields} key={part.id} 
          className={props.editorMode ? "editorStyle" : null}
          onClick={() => editRedirect('parte', part.id)}>
          {part.name}
        </div>
        {getBookList(part.books)}
        {getTitleList(part.titles)}
      </div>
    )));
  };  

  return (
    <>
      <Card.Title>{ props.rule.rule_title }</Card.Title>
      <div 
        key={props.rule.id}>
        { props.rule.preamble }
      </div>
      {getPartList(props.rule.parts)}
      {getBookList(props.rule.books)}
      {getTitleList(props.rule.titles)}
    </>
  );
};