// const express = require("express");
// const router = express.Router(); 
const router=require("express").Router();
const User=require("../models/user");
const jwt=require("jsonwebtoken");
const {authenticateToken}=require("./userAuth");
const Book=require("../models/book");


const upload = require("../config/multer");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

//add book --admin

router.post("/add-book", authenticateToken, upload.single("image"), async (req, res) => {
  console.log("inside add book")
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    console.log("inside add book")
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Upload the locally saved file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "book_images",
    });

    // Delete the local file after uploading to Cloudinary (to save space)
    fs.unlinkSync(req.file.path);

    // Save the Cloudinary URL in MongoDB
    const book = new Book({
      url: result.secure_url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });

    await book.save();
    res.status(201).json({ message: "Book added successfully", data: book });
  } catch (error) {
    console.log("inside add book")
    console.error("error",error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// -------------------- Update Book Route --------------------
router.put("/update-book", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    const { bookid,id } = req.headers;

    const user=await User.findById({_id:id});
    // if(user.role!='admin'){
    //   return res.status(403).json({status:false,message:"Only admin can update the book"});
    // }
    console.log("user",user);
    if (user.role == "user") {
      return res.status(403).json({ message: "Access denied" });
    }
  
    


    // Check if book exists
    const book = await Book.findById(bookid);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Build updated data object from request body
    const updatedData = {
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    };

    // If a new image is uploaded, upload to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "book_images",
      });
      updatedData.url = result.secure_url;
      fs.unlinkSync(req.file.path); // Delete local temp file
    }

    // Update book in MongoDB
    await Book.findByIdAndUpdate(bookid, updatedData, { new: true });

    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;


router.delete("/delete-book",authenticateToken,async (req,res)=>{

    try {
       const {bookid}=req.headers;
       await Book.findByIdAndDelete(bookid);
       return res.status(200).json({message:"book deleted succesfull"}) 
    } catch (error) {
      res.status(500).json({message:"Intenal server error"});
    }

})

router.get("/get-all-books",async (req,res)=>{
    try {
       const book=await Book.find().sort({createdAt:-1});
       return res.status(200).json({message:"Success",data:book});
    } catch (error) {
      res.status(500).json({message:"Intenal server error"});
    }
})
router.get("/get-recent-books",async (req,res)=>{
  try {
     const book=await Book.find().sort({createdAt:-1}).limit(4);
     return res.status(200).json({message:"Success",data:book});
  } catch (error) {
    res.status(500).json({message:"Intenal server error"});
  }
})
router.get("/get-book-by-id/:id",async (req,res)=>{
   try {
      const {id}=req.params;
      const book=await Book.findById(id);
      return res.status(200).json({message:"success",data:book});
   } catch (error) {
    res.status(500).json({message:"Intenal server error"});
   }
})
// router.get("/get-book-by-id/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate the ID format
//     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ message: "Invalid book ID format" });
//     }

//     // Find the book by ID
//     const book = await Book.findById(id);

//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     // Return the book data
//     return res.status(200).json({ message: "success", data: book });
//   } catch (error) {
//     console.error("Error fetching book by ID:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });











module.exports=router;