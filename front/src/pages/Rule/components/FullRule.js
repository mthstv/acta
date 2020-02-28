import React from 'react'
import { Card } from "react-bootstrap";
import { Romanize } from "../../../helpers"

const styles = {
  textFields: {
    textAlign: 'left',
    "&:hover": {
      backgroundColor: "#777777"
    },
  },
  nameFields: {
    textAlign: 'center',
    "&:hover": {
      backgroundColor: "#777777"
    },
  }
}

export const getItemList = (list) => {
    return (list.map((item) => (
        <div style={styles.textFields} key={item.id}>
            {item.number}. {item.text}
        </div>
    )))
}

export const getLineList = (list) => {
    return (list.map((line) => (
      <div key={line.id}>
        <div style={styles.textFields} key={line.id}>
          {line.letter}) {line.text}
        </div>
        {getItemList(line.items)}
      </div>
    )))
}

export const getInciseList = (list) => {
    return (list.map((incise) => (
      <div key={incise.id}>
        <div style={styles.textFields} key={incise.id}>
          {Romanize(incise.number)} - {incise.text}
        </div>
        {getLineList(incise.lines)}
      </div>
    )))
}

export const getParagraphList = (list) => {
    return (list.map((paragraph) => (
      <div key={paragraph.id}>
        <div style={styles.textFields} key={paragraph.id}>
          {list.length === 1 
            ? `Parágrafo único - ${paragraph.text}` 
            : `§ ${paragraph.number}º - ${paragraph.text}`
          }
        </div>
        {getInciseList(paragraph.incises)}
        {getLineList(paragraph.lines)}
      </div>
    )))
}

export const getArticleList = (list) => {
    return (list.map((article) => (
      <div key={article.id}>
        <div style={styles.textFields} key={article.id}>
        Art. {article.number < 10 ? article.number+'º' : article.number } - {article.text}
        </div>
        {getInciseList(article.incises)}
        {getLineList(article.lines)}
        {getParagraphList(article.paragraphs)}
      </div>
    )))
}

export const getSubSectionList = (list) => {
    return (list.map((subSection) => (
      <div key={subSection.id}>
        <div style={styles.textFields} key={subSection.id}>
          Subseção {Romanize(subSection.number)}<br/>
          {subSection.name}
        </div>
        {getArticleList(subSection.articles)}
      </div>
    )))
}

export const getSectionList = (list) => {
    return (list.map((section) => (
      <div key={section.id}>
        <div style={styles.nameFields} key={section.id}>
          Seção {Romanize(section.number)}<br/>
          {section.name}
        </div>
        {getArticleList(section.articles)}
        {getSubSectionList(section.sub_sections)}
      </div>
    )))
}

export const getChapterList = (list) => {
    return (list.map((chapter) => (
      <div key={chapter.id}>
        <div style={styles.nameFields} key={chapter.id}>
          Capítulo {Romanize(chapter.number)}<br/> 
          {chapter.name}
        </div>
        {getArticleList(chapter.articles)}
        {getSectionList(chapter.sections)}
      </div>
    )))
}

export const getTitleList = (list) => {
    return (list.map((title) => (
      <div key={title.id}>
        <div style={styles.nameFields} key={title.id}>
          Título {Romanize(title.number)}<br/>
          {title.name}
        </div>
        {getArticleList(title.articles)}
        {getChapterList(title.chapters)}
      </div>
    )))
}

export const getBookList = (list) => {
    return (list.map((book) => (
      <div key={book.id}>
        <div style={styles.nameFields} key={book.id}>
          Livro {Romanize(book.number)}<br/> 
          {book.name}
        </div>
        {getTitleList(book.titles)}
      </div>
    )))
}

export const getPartList = (list) => {
    return (list.map((part) => (
      <div key={part.id}>
        <div style={styles.nameFields} key={part.id}>
          {part.name}
        </div>
        {getBookList(part.books)}
        {getTitleList(part.titles)}
      </div>
    )))
}

export const getSingleRule = (rule) => {
    return (
      <>
        <Card.Title>{ rule.rule_title }</Card.Title>
        <div key={rule.id}>
          { rule.preamble }
        </div>
        {getPartList(rule.parts)}
        {getBookList(rule.books)}
        {getTitleList(rule.titles)}
      </>
    )
}