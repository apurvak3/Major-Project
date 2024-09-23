const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema ({
    title : {
        type: String ,
        required : true ,
    },
    price : {
        type: String,
        required : true ,
    },
    description : {
        type:String ,
        required : true ,
    },
     location:{
        type: String,
        required : true,
     },
     image : {
        type: String,
        set :(v) => v === " " ? "https://www.pexels.com/photo/a-train-is-traveling-down-the-tracks-next-to-a-station-27206011/": v ,
     },

})
const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;