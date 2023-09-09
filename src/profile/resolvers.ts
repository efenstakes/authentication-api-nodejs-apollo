import bcrypt from 'bcryptjs'
import AccountModel from "./model"
import { generateAccessToken } from '../utils/authentication'


// create profile
export const createAccount = async(parent, { input: { name, email, password, phone, } }, context)=> {

    console.log("args ", name, email, password, phone,)
    console.log("parent ", parent)
    console.log("context ", context)

    // validate with yup

    // check if email is used
    const emailResult = await AccountModel.findOne({ email, }).lean()

    if( emailResult ) {
        throw new Error("400")
    }

    // add user
    const account = await new AccountModel({ name, email, password, phone, }).save()

    // generate jwts
    const accessToken = generateAccessToken(account)
    const refreshToken = generateAccessToken(account)

    
    return {
        account,
        tokens: {
            accessToken,
            refreshToken,
        },
    }
}

// login
export const login = async(parent, { input: { email, password, } }, context)=> {

    console.log("args ", email, password)
    
    // get user with the email
    const account = await AccountModel.findOne({ email, }).lean()

    // if no result, return
    if( !account ) {
        throw new Error("400")
    }

    // verify password
    const isMatch = bcrypt.compare(password, account?.password)

    if( !isMatch ) {
        
        throw new Error("400")
    }

    // generate jwts
    const accessToken = generateAccessToken(account)
    const refreshToken = generateAccessToken(account)

    return {
        account,
        tokens: {
            accessToken,
            refreshToken,
        },
    }
}

// get accounts
// this exists here for testing only
// { filters: { offset, limit, } }
export const getAccounts = async(_parent, args, { user, })=> {

    console.log("user ", user)
    console.log("args ", args)
    // console.log("offset, limit ", offset, limit);
    
    return await AccountModel.find() // .skip(offset).limit(limit)
}