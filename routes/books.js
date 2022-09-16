const express = require('express');
const router = express.Router();
const fileMulter = require('../middleware/file');
const { v4: uuid } = require('uuid');

const store = {
    book: []
}

class Book {
    constructor(
        id = uuid(),
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
    ) {
        this.id = id,
        this.title = title,
        this.description = description,
        this.authors = authors,
        this.favorite = favorite,
        this.fileCover = fileCover,
        this.fileName = fileName,
        this.fileBook = fileBook
    }
}

router.get('/api/books', (req, res) => {
    const { books } = store;
    res.json(books);
});

router.get('/api/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const index = books.findindex(el => el.id === id);

    if (index !== -1) {
        res.json(books[index]);
    } else {
        res.status(404);
        res.json('Code: 404');
    }
});

router.post('/api/books', (req, res) => {
    const { books } = store;
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook);
    req.status(201);
    res.json;
});

router.put('/api/books/:id', (req, res) => {
    const { books } = store;
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
    const { id } = req.params;
    const index = books.findindex(el => el.id === id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook
        };
        res.json(books[index]);
    } else {
        res.status(404);
        res.json('Code: 404');
    }
});

router.delete('/api/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const index = books.findindex(el => el.id === id);

    if (index !== -1) {
        books.slice(index, 1)
        res.json('ok')
    } else {
        res.status(404);
        res.json('Code: 404');
    }
});


router.post('/api/user/login', (req, res) => {
    req.status(201);
    res.json({ 
        id: 1,
        mail: "test@mail.ru"
    });
});

router.post('/api/upload-book', 
    fileMulter.single('book'),
    (req, res) => {
        if(req.file) {
            req.status(201);
            const { path } = req.file;
            res.json({path});
        }
        res.json();
    }
);


module.exports = router;
