const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

UserSchema.pre("save", async function hashPassword(next) {
    if (!this.isModified("password")) next()

    this.password = await bcrypt.hash(this.password, 8)
})

UserSchema.methods = {
    compareHash(hash) {
        return bcrypt.compare(hash, this.password)
    },

    generateToken() {
        return jwt.sign({ id: this.id }, process.env.JWT_KEY, {
            expiresIn: 3600
        })
    }
}

module.exports = mongoose.model("User", UserSchema)