const filename = '../data/book.json'
let books = require(filename)
const helper = require('../helpers/helper.js')

function getBooks() {
    return new Promise((resolve, reject) => {
        if (books.length === 0) {
            reject({
                message: 'no books available',
                status: 202
            })
        }
        resolve(books)
    })
}

function getBook(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(books, id)
        .then(book => resolve(book))
        .catch(err => reject(err))
    })
}

function insertBook(newBook) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(books) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        newBook = { ...id, ...date, ...newBook }
        books.push(newBook)
        helper.writeJSONFile(filename, books)
        resolve(newBook)
    })
}

function updateBook(id, newBook) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(books, id)
        .then(book => {
            const index = books.findIndex(b => b.id == book.id)
            id = { id: book.id }
            const date = {
                createdAt: book.createdAt,
                updatedAt: helper.newDate()
            } 
            books[index] = { ...id, ...date, ...newBook }
            helper.writeJSONFile(filename, books)
            resolve(books[index])
        })
        .catch(err => reject(err))
    })
}
function deleteBook(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(books, id)
        .then(() => {
            books = books.filter(b => b.id !== id)
            helper.writeJSONFile(filename, books)
            resolve()
        })
        .catch(err => reject(err))
    })
}
module.exports = {
    insertBook,
    getBooks,
    getBook, 
    updateBook,
    deleteBook
}