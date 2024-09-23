const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path"); // Import path module
const Listing = require("./models/Listing.js");

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ourHotel");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Corrected URL path
app.get("/listings", async (req, res) => {
  // Assuming `id` should be passed as a query or fetched from the request
  const allListing = await Listing.find({}); // Fetch all listings
  res.render("index.ejs", { allListing }); // Correct file extension
});

// Define the root route
app.get("/", (req, res) => {
    res.send("Hi! I am root");
  });
  app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({}); // Fetch all listings
    res.render("index.ejs", { allListings }); // Pass allListings
  });
  

app.get("/listings/new" , (req,res) =>{
    res.render("new.ejs");
})
//create route
app.post("/listings" , async(req, res) =>{
   const newListing = new Listing(req.body.listing);
   await newListing.save();
    res.redirect("/listings");

})
app.get("/listings/:id" , async(req,res) => {
    let {id} = req.params ; 
    const listing = await Listing.findById(id);
    res.render("show.ejs" , {listing}); 
})
app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "My new villa",
    description: "By the beach",
    price: 1200,
    location: "Patna, Bihar",
    country: "India",
  });
  await sampleListing.save();
  console.log("Sample was saved");
  res.send("Successful testing");
});

// Start the server
app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});

