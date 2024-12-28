const { Schema, default: mongoose,  } = require("mongoose");


const emergencySchema = new Schema(
    {
        
        driver: {
            type: Object,
            

        },
        user: {
            type: String,
            ref: "User",
            required: true,
        },
        
    },
    {
        timestamps: true,
    }
);

const Emergency = mongoose.models.Emergency || mongoose.model("Emergency", emergencySchema);

export default Emergency;