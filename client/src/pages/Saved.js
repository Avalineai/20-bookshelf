import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Saved extends Component {
    state = {
        books: [],
        author: "",
        description: "",
        image: "",
        link: "",
        title: "",
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API.searchBooks()
        .then(res =>
          (this.setState({ books: res.data.items }),
          console.log("search data", res.data.items))
        )
        .catch(err => console.log(err));
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
                synopsis: this.state.synopsis
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
                        {this.state.books.length ? (
                            
                            <List>
                                <p>Saved Books</p>
                                {this.state.books.map(book => (
                                    <ListItem key={book.id}>
                                        <Link to={"/books/" + book.id}>
                                            <strong>
                                                {book.title} by {book.author}
                                            </strong>
                                        </Link>
                                        <DeleteBtn onClick={() => this.deleteBook(book._id)} />
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
