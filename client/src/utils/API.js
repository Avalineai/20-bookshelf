import axios from "axios";

export default {
    // Gets all books
    searchBooks: function (input) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${input}`);
    },
    onPageLoad: function() {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=kittens`)
    },
    // Gets the book with the given id
    getBook: function () {
        return axios.get("/api/books/");
    },
    // Deletes the book with the given id
    deleteBook: function (id) {
        return axios.delete("/api/books/" + id);
    },
    // Saves a book to the database
    saveBook: function (bookData) {
        return axios.post("/api/books", bookData);
    }
};
