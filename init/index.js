const mongoose = require("mongoose")
const Listing = require("../models/listing")
const initData = require("./data")

main()
    .then((res) => {
        console.log("DB connection Established!");
    })
    .catch((err) => {
        console.error("error occoured is ", err)
    });

async function main() {
    const connStr = "mongodb+srv://alamrehan1234:Q2xs7iEUYtUqmZyE@cluster0.oqfnh.mongodb.net/staynest?retryWrites=true&w=majority&appName=Cluster0/staynest"
    await mongoose.connect(connStr);
}

const initDB = async () => {
    await Listing.deleteMany({})
    await Listing.insertMany((initData.data))
    console.log("data was initialized")
}

initDB();