import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

const styles = {
  image: {
    width: "180px",
    padding: "20px 0px 20px 20px",
  }
}

class Books extends Component {
  state = {
    search: "",
    results: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  getBooks = (userInput) => {
    API.searchBooks(userInput)
    .then(res =>
      (this.setState({ results: res.data.items }),
      console.log("search data", res.data.items))
    )
    .catch(err => console.log(err));
  }

  loadBooks = () => {
    API.onPageLoad()
      .then(res => (this.setState({ results: res.data.items }),
        console.log(res.data.items)))
      .catch(err => console.log(err))
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getBooks(this.state.search)
  };

  handleSave = book => {
    console.log("save a book?", book)
    API.saveBook({
      author: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.smallThumbnail,
      link: book.volumeInfo.previewLink,
      title: book.volumeInfo.title
    })
    .then(
      res => console.log(res.data)
    )
      .catch(err => console.log(err))
  }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Google Books Search</h1>
              <h5>Search for and Save Books of Interest</h5>
            </Jumbotron>
            <form>
              <h3>Book Search</h3>
              <p>Book</p>
              <Input
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Search Term (required)"
              />
              <FormBtn
                handleFormSubmit={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col >
          <Col size="md-12">

            <List>
              <p>Results</p>
              {this.state.results.map(book => (
                <ListItem key={book.id}>
                    <div className="card mb-3">
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <img style={styles.image} src={(
                            "imageLinks" in book.volumeInfo) ?
                            book.volumeInfo.imageLinks.smallThumbnail : ""
                            } className="card-img" alt={book.volumeInfo.title}></img>
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{book.volumeInfo.title} by {
                              ("authors" in book.volumeInfo) ?
                              book.volumeInfo.authors.join(", ") : ""
                            }</h5>
                            <p className="card-text">{book.volumeInfo.description}</p>
                            <button><a href={book.volumeInfo.previewLink}> View</a></button>
                            <button onClick={() => this.handleSave(book)}>Save</button>
                          </div>
                        </div>
                      </div>
                    </div>
                </ListItem>
              ))}
            </List>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
