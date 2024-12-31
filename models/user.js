const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
    {
            
            name:{
                type: String,
                //match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
                //default: "default",
                unique:[true, "Username already exists"],
                },
            email:{
                type: String,
                required: [true, "Email is required"],
                unique:[true, "Email already exists"],
                match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
            },
            
            password: {
                type: String,
                minlength: [4, "Password should be at least 4 characters long"],

            },
            image: {
                type: String,
                enum: ["default.jpg", "default2.jpg", "default3.jpg"],
                default: "default.jpg",
            },
            phone: {
                type: String,
                default: "default",
            },
            tracked: {
                type: Array,
                default: [],
            },
            adress: {
                type: String,
                default: "default",
            },
            city: {
                type: String,
                default: "default",
            },
            state: {
                type: String,
                default: "default",
            },


},
{
    timestamps : true,

})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;