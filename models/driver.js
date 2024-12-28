const { Schema, default: mongoose } = require("mongoose");

const driverSchema = new Schema(
    {
            
            
            image: {
                type: String,
                enum: ["default.jpg", "default2.jpg", "default3.jpg"],
                default: "default.jpg",
            },
            phone: {
                type: String,
                match: [/^[0-9]{10}$/, "Phone number should be 10 digits"],
            },
            car: {
                type: Object,
                required: true,
            },
            route: {
                type: Object,
                required: true,
            },
            review: {
                type: Array,
                default: [],
            },
            plateNumber : {
                type: String,
            },
            
            driver:{
                type: Object,
                
               // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
            },
            license: {
                type: String,
                required: true,
            },
        },
{
    timestamps : true,

})

const Driver = mongoose.models.Driver || mongoose.model("Driver", driverSchema);

export default Driver;