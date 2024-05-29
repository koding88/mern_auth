import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
    const { username, email, password } = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    console.log(hashedPassword)
    const newUser = new User({ username: username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json({
            message: `Hello ${username}, your account was registered!`,
        })
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
    }
}