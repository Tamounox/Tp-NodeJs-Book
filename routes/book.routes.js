const express = require('express')
const router = express.Router()
const book = require('../models/book.model')
const m = require('../helpers/middlewares')


// Routes
module.exports = router

router.get('/', async (req, res) => {
    await book.getBooks()
    .then(books => res.json(books))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Un livre par id*/
router.get('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    await book.getBook(id)
    .then(book => res.json(book))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})
/* Ajout d'un livre */
router.post('/', m.checkFieldsBook, async (req, res) => {
    await book.insertBook(req.body)
    .then(post => res.status(201).json({
        message: `The book #${book.id} has been created`,
        content: book
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})
/* Update d'un livre */
router.put('/:id', m.mustBeInteger, m.checkFieldsBook, async (req, res) => {
    const id = req.params.id
    await book.updateBook(id, req.body)
    .then(book => res.json({
        message: `The book #${id} has been updated`,
        content: book
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Suppression d'un livre */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    
    await book.deleteBook(id)
    .then(book => res.json({
        message: `The book #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})