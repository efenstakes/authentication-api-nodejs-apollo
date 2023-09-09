// include external libraries
import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'



const accountSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: (mail) => {
            return validator.isEmail(mail)
        },
        index: true,
    },

    phone: {
        type: String,
        required: false
    },

    password: {
        type: String,
        required: true
    },
    
    avatar: {
        type: String,
        required: false,
    },
    
    joinedOn: {
        type: Date,
        default: Date.now()
    },

}, {
    collation: { locale: 'en_US', strength: 2 }
})

// hash the password before saving a record
accountSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10)  
    next()
})


const AccountModel = mongoose.model('Account', accountSchema)

export default AccountModel