const Book = require("../models/Book")
const User = require("../models/User")

// Create Book entry
exports.createBook = async (req, res) => {
    const { title, author, isbn, category, bookCover, review  } = req.body
  
    if (!['Action and Adventure', 'Classics', 'Comic Book or Graphic Novel', 'Detective and Mystery', 'Fantasy', 'Historical Fiction', 'Horror', 'Arts & Music', 'Biographies', 'Business', 'Computers & Tech', 'Cooking', 'Edu & Reference', 'Entertainment', 'Health & Fitness', 'History', 'Hobbies & Crafts', 'Home & Garden', 'Kids', 'Literature & Fiction', 'Medical', 'Parenting', 'Religion', 'Romance', 'Sci-Fi & Fantasy', 'Science & Math', 'Self-Help', 'Social Sciences', 'Sports', 'Travel', 'Teen', 'True Crime', 'Special editions', 'Other'].includes(category)) {
      return res.status(400).json({ message: "Please select a category" })
    }
  
    const book = await Book.create({
        title, 
        author, 
        isbn,
        category, 
        bookCover, 
        review,
        owner: req.user._id
    })
    await User.findByIdAndUpdate(req.user._id, {
      $push: { bookshelf: book._id }
    })
  
    res.status(201).json(book)
  }

// Read Book entry
exports.getAllBooks = async (req, res) => {
  const books = await Book.find()
  res.status(200).json({ books })
}

exports.getBooksByCategory = async (req, res) => {
  const { category } = req.params

  const books = await Book.find({ category })
  res.status(200).json({ books })
}

exports.getBookById = async (req, res) => {
  const { booktId } = req.params

  const book = await Book.findById(bookId)
    .populate("owner","email username review")
  res.status(200).json(book)
}

// Update Book entry
exports.updateBook = async (req, res) => {
  const { bookId } = req.params
  const { title, author, isbn, category, bookCover, review } = req.body

  const book = await Book.findById(bookId)

  if (book.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const bookNew = await Book.findByIdAndUpdate(
    bookId,
    { title, author, isbn, category, bookCover, review },
    { new: true }
  )

  res.status(200).json(bookNew)
}

// Delete Book entry
exports.deleteBook = async (req, res) => {
  const { bookId } = req.params

  await Book.findByIdAndRemove(bookId)

  res.status(200).json({
    message: "Book entry deleted"
  })
}