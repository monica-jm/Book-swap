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
        //Asociate created book to logged in User
        owner: req.user
    })
    // Add new book to users bookshelf (collection)
    await User.findByIdAndUpdate(req.user._id, {
      $push: { bookshelf: book._id }
    })
    res.status(201).json(book)
  }

// Read Book entry
exports.getAllBooks = async (req, res) => {
  // Find all the books and return them 
  const books = await Book.find()
  res.status(200).json({ books })
}

exports.getBookById = async (req, res) => {
  // Get book ID from params(url)
  const { bookId } = req.params

  const book = await Book.findById(bookId)
  res.status(200).json(book)
}

// Update Book entry
exports.updateBook = async (req, res) => {
  const { bookId } = req.params
  const { title, author, isbn, category, bookCover, review } = req.body

  const book = await Book.findByIdAndUpdate(
    bookId,
    { title, author, isbn, category, bookCover, review },
    { new: true }
  )
  res.status(200).json(book)
}

exports.updateBookmarks = async (req, res) => {
 // 1. Get book ID
const { bookId } = req.params
const { bookshelf, bookmarks, _id} = req.user

 // 2. Prevent adding your own books 
 if (bookshelf.includes(bookId))
 return res.status(401).json({
   message: "Unauthorized"
 })
 let book

 const user = await User.findOne({_id}) //We need to declare the user again in order to save it on the data base

 // 3. Search for selected book in users bookmarks
 if(bookmarks.includes(bookId)){
    // 4. If the book is already on the wish list we remove it
    user.bookmarks.splice(bookmarks.indexOf(bookId), 1), 
    book = await Book.findByIdAndUpdate(
      bookId,
      { $inc: { likes: -1 } },
    {new:true}
    )
 }else{
    // 5. If the book is not on the wish list we add it 
    user.bookmarks.push(bookId)
    book = await Book.findByIdAndUpdate(
      bookId,
      { $inc: { likes: 1 } },
      { new: true }
    )
 }
 console.log(book)
 await user.save()
 res.json({user, book})
}

// Delete Book
exports.deleteBook = async (req, res) => {
  const { bookId } = req.params

  await Book.findByIdAndRemove(bookId)

  res.status(200).json({
    message: "Book deleted"
  })
}