import mongoose, { mongo } from "mongoose"
import Email from "next-auth/providers/email"

const UserSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    image: {type: String},
    cart: [{

    }],
    provider: {type: String},
    password: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    isAdmin: {type: Boolean, default: false}
})

export default mongoose.models.User || mongoose.model("User", UserSchema);