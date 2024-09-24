const express = require("express")
const app = express()
const port = 3000;
const path = require("path")
const mongoose = require("mongoose")
const Listing = require("./models/listing");
const methodOverride = require('method-override')
const ejsMate = require("ejs-mate");

main()
    .then((res) => {
        console.log("DB connection Established!");
    })
    .catch((err) => {
        console.error("error occoured is ", err)
    })

async function main() {
    const connStr = "mongodb+srv://alamrehan1234:Q2xs7iEUYtUqmZyE@cluster0.oqfnh.mongodb.net/staynest?retryWrites=true&w=majority&appName=Cluster0/staynest"
    await mongoose.connect(connStr);
}

app.set("view engine", "ejs")
app.engine("ejs", ejsMate)
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))



//INDEX ROUTE

app.get("/listings", async (req, res) => {
    let allListings = await Listing.find({})
    let page = "Home"
    res.render("listings/index.ejs", { allListings, page })

})

// CREATE ROUTE

//Get Form

app.get("/listings/new", async (req, res) => {
    let page = "Add New Listing"
    res.render("listings/new.ejs", { page })
})

//Add Data

app.post("/listings", async (req, res) => {

    await Listing.insertMany(req.body.listings)
    res.redirect("/listings")
    console.log(req.body.listings)

})

// SHOW ROUTE

app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let page = "Show Details"
    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid listing ID' });
    }

    try {
        // Find listing by ID
        let listing = await Listing.findById(id);

        // If listing not found, return a 404 error
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        // Render the page with the listing and image source
        res.render("listings/show.ejs", { listing, page });

    } catch (err) {
        // Handle server errors
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


//UPDATE ROUTE

// Get form

app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    let page = "Edit Details";
    let listing = await Listing.findById(id)
    res.render("listings/edit.ejs", { listing, page })

})
// update data 

app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listings, { runValidators: true })
    res.redirect(`/listings/${id}`)
})

// DELETE ROUTE

app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id)
    res.redirect(`/listings`)
})

//ALL OTHER UNKNOWN ROUTE

app.get("*", async (req, res) => {
    let page = "Unknown";
    res.render("listings/unknown.ejs", { page })
})

// LISTEN PORT
app.listen(port, () => {
    console.log(`listening to port: ${port}`)
})
