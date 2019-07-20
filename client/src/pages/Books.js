import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

const styles = {
  image: {
    width: "200px"
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

  loadBooks = () => {
    // API.getBooks()
    //   .then(res =>
    //     this.setState({ books: res.data, title: "", author: "", synopsis: "" })
    //   )
    //   .catch(err => console.log(err));
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
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        description: this.state.description
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

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
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col >
          <Col size="md-12">

            <List>
              {/* <>
              <div>
                <p>Title</p>
                <p>Author</p>
                <p>Image Here</p>
                <p>Description</p>
                <button>View</button>
                <button>Save</button>
              </div>
            </> */}
              <p>Results</p>
              {this.state.results.map(book => (
                <ListItem key={book.id}>
                  
                    <div className="card mb-3">
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <img style={styles.image} src={book.volumeInfo.imageLinks.smallThumbnail} className="card-img" alt="..."></img>
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{book.volumeInfo.title} by {book.volumeInfo.authors}</h5>
                            <p className="card-text">{book.volumeInfo.description}</p>
                            <button><a href={book.volumeInfo.previewLink}> View</a></button>
                            <button>Save</button>
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
