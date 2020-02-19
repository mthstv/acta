import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import api from "../services/api";

class RulePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    componentDidMount() {
      api.get(`/rule/${this.props.match.params.rule}`)
      .then((res) => {
        this.setState({ rule: res.data.data });
      })
    }
  
    getArticleList(list) {
      console.log(list)
      return (list.map((article) => (
        <div key={article.id}>
          <div style={{textAlign: 'left'}} key={article.id}>
            Art. {article.number}º - {article.text}
          </div>
          {article.paragraphs.map((paragraph) => (
            <div style={{textAlign: 'left'}} key={paragraph.id}>
              {article.paragraphs.length === 1 
                ? `Parágrafo único - ${paragraph.text}` 
                : `§ ${paragraph.number}º - ${paragraph.text}`
              }
            </div>
          ))}
        </div>
      )))
    }

    //É preciso fazer ao contrario, primeiro item e line, depois incise, etc., montar as funções para serem reexecutadas em uma chain
                    
    render() {
      const { rule } = this.state;
      console.log(rule)
      return (
        rule ?
          <Row>
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Card.Title>{ rule.rule_title }</Card.Title>
                    <div key={rule.id}>
                      { rule.preamble }
                    </div>
                    {/* Listagem de partes da regra */}
                    {rule.parts.map((part) => (
                      <div key={part.id}>
                        <div style={{textAlign: 'center'}} key={part.id}>
                          {part.name}
                        </div>

                        {/* Listagem dos títulos da parte */}
                        {part.titles.map((title) => (
                          <div key={title.id}>
                            <div style={{textAlign: 'center'}} key={title.id}>
                              Título {title.number}<br/>
                              {title.name}
                            </div>
                            
                            {/* Listagem dos artigos do titulo */}
                            {this.getArticleList(title.articles)}

                            {/* Listagem dos capítulos do título */}
                            {title.chapters.map((chapter) => (
                              <div style={{textAlign: 'center'}} key={chapter.id}>
                                Título {chapter.number}<br/>
                                {chapter.name}
                              </div>
                            ))}

                          </div>
                        ))}
                      
                        {/* Listagem dos livros da parte */}
                        {part.books.map((book) => (
                          <div style={{textAlign: 'center'}} key={book.id}>
                            Título {book.number}<br/>
                            {book.name}
                          </div>
                        ))}
                      </div>  
                    ))}

                    {/* Listagem de livros da regra */}
                    {rule.books.map((book) => (
                      <div style={{textAlign: 'center'}} key={book.id}>
                        {book.name}
                      </div>
                    ))}

                    {/* Listagem de títulos da regra */}
                    {rule.titles.map((title) => (
                      <div style={{textAlign: 'center'}} key={title.id}>
                        {title.name}
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
          </Row>
        :
        <div/>
      );
    }
  }
  
  export default RulePage;