const { Schema, default: mongoose,  } = require("mongoose");


const vehicleSchema = new Schema(
    {
        plateNumber: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            default: "Unknown",
            required: true,
        },
        color: {
            type: String,
            default: "Unknown",
        },
        owner: {
            type: String,
            default: "Unknown",
        },
        location: {
            type: String,
            default: "Unknown",
        },
        description: {
            type: String,
            default: "No description provided",
        },
        image: {
            type: String,
            default: "https://via.placeholder.com/150",
        },
        driver: {
            type: String,
            ref: "Driver",
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        route: {
            type: String,   
            ref: "Route",
            required: true,
        },
        
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.models.Post || mongoose.model("Post", vehicleSchema);

export default Post;