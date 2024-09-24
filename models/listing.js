const mongoose = require("mongoose")


function toPascalCase(str) {
    return str
        .split(/[\s-_]+/)  // Split by spaces, hyphens, or underscores
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize each word
        .join(' ');  // Join without spaces
}
const listingSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true,
        set: toPascalCase
    },
    description: {
        type: String,
        set: toPascalCase
    },
    image: {

        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1422493757035-1e5e03968f95?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v) => v === "" ? "https://images.unsplash.com/photo-1422493757035-1e5e03968f95?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
        }
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
        set: toPascalCase
    },
    country: {
        type: String,
        set: toPascalCase
    },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
