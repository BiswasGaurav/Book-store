import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route for save a new Book
router.post('/' , async (req, res) => {
    try {
        if(!req.body.title && !req.body.author && !req.body.publishYear){
            return res.send(400).send("Title, Author and Publish Year are required");
        } else {
            const newBook = {
                title : req.body.title,
                author : req.body.author,
                publishYear : req.body.publishYear
            }
            const book = await Book.create(newBook); 
            return res.status(201).send(book);
        }
    } catch (error) {
        console.log(error.message);
        response.send(500).send(error.message);
    }
})

//Getting all books from database
router.get('/' , async (req, res) => {
    try {
        const books = await Book.find({});
        
        return res.status(200).json({
            count : books.length,
            data : books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
})

//Getting a particular book from database
router.get('/:id' , async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
})

// Route for updating a particular book
router.put('/:id' , async (req, res) => {
    try {
        const { id } = req.params;
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send("title, author and publishYear are required");
        } else {
            const result = await Book.findByIdAndUpdate(id , req.body);
            if(!result) {
                return res.status(404).send("Book not found");
            } else {
                return res.status(200).send("Book updated successfully");
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
})

// Route for deleting a particular book
router.delete('/:id' , async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result) {
            return res.status(404).send("Book not found");
        } else {
            return res.status(200).send("Book deleted successfully");
        } 
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
})

export default router;