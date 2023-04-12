const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema



const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


userSchema.statics.signup = async function (email, password) {
    const exists = await this.findOne({ email })

    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (exists) {
        throw Error('Email is already exists')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email must contains @ and .')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password must contains 8 characters, special sign, number, and uppercase letter')
    }

    const hash = await bcrypt.hash(password, 10)


    const user = await this.create({
        email,
        password: hash
    })

    return user
}

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })

    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (!user) {
        throw Error('Invalid email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Invalid password')
    }

    return user
}


module.exports = mongoose.model('User', userSchema)



