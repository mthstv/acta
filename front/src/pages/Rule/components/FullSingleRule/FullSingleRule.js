import React from "react";
import { Card } from "react-bootstrap";
import { Romanize } from "../../../../helpers";
import './style.scss';

const styles = {
  textFields: {
    textAlign: "left",
  },
  nameFields: {
    textAlign: "center",
  },
};

export const GetSingleRule = (props) => {

  const getItemList = (list) => {
    return (list.map((item) => (
      <div style={styles.textFields} key={item.id} className={props.editorMode ? "editorStyle" : null}>
        {item.number}. {item.text}
      </div>
    )));
  };
  
  const getLineList = (list) => {
    return (list.map((line) => (
      <div key={line.id}>
        <div style={styles.textFields} key={line.id} className={props.editorMode ? "editorStyle" : null}>
          {line.letter + ')'} {line.text}
        </div>
        {getItemList(line.items)}
      </div>
    )));
  };
  
  const getInciseList = (list) => {
    return (list.map((incise) => (
      <div key={incise.id}>
        <div style={styles.textFields} key={incise.id} className={props.editorMode ? "editorStyle" : null}>
          {Romanize(incise.number)} - {incise.text}
        </div>
        {getLineList(incise.lines)}
      </div>
    )));
  };
  
  const getParagraphList = (list) => {
    return (list.map((paragraph) => (
      <div key={paragraph.id}>
        <div style={styles.textFields} key={paragraph.id} className={props.editorMode ? "editorStyle" : null}>
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
        <div style={styles.textFields} key={article.id} className={props.editorMode ? "editorStyle" : null}>
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
        <div style={styles.nameFields} key={subSection.id} className={props.editorMode ? "editorStyle" : null}>
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
        <div style={styles.nameFields} key={section.id} className={props.editorMode ? "editorStyle" : null}>
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
        <div style={styles.nameFields} key={chapter.id} className={props.editorMode ? "editorStyle" : null}>
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
        <div style={styles.nameFields} key={title.id} className={props.editorMode ? "editorStyle" : null}>
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
        <div style={styles.nameFields} key={book.id} className={props.editorMode ? "editorStyle" : null}>
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
        <div style={styles.nameFields} key={part.id} className={props.editorMode ? "editorStyle" : null}>
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
        key={props.rule.id}
        className={props.editorMode ? "editorStyle" : null}>
        { props.rule.preamble }
      </div>
      {getPartList(props.rule.parts)}
      {getBookList(props.rule.books)}
      {getTitleList(props.rule.titles)}
    </>
  );
};