import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

const styles = {
    image: {
        width: "180px",
        padding: "20px 0px 20px 20px",
    }
}

class Saved extends Component {
    state = {
        books: []
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        // Gets the book with the given id
        API.getBook()
            .then(res => this.setState({ books: res.data }))
            .catch(err => console.log(err));

    };

    deleteBook = id => {
        API.deleteBook(id)
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
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
                        {this.state.books.length ? (
                            <List>
                                <p>Saved Books</p>
                                {this.state.books.map(book => (
                                    <ListItem key={book._id}>
                                        <div className="card mb-3">
                                            <div className="row no-gutters">
                                                <div className="col-md-4">

                                                    <img style={styles.image} src={book.image} className="card-img" alt="..."></img>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{book.title} by {book.author}</h5>
                                                        <p className="card-text">{book.description}</p>
                                                        <button><a href={book.link}> View</a></button>
                                                        <button onClick={() => this.deleteBook(book._id)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <>
                                    <p>Saved Books</p>
                                    <h3>No Results to Display</h3>
                                </>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Saved;
