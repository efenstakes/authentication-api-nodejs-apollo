import AccountModel from "../profile/model"
import TaskModel from "./model"

// add task
export const addTask = async(parent, { input: { title, description, } }, { user, })=> {
    if(!user) {
        return null
    }

    console.log("args ", title, description,)
    console.log("parent ", parent)

    // validate with yup

    // add
    const task = await new TaskModel({ title, description, accountId: user?._id }).save()
    
    return task
}

// get accounts
export const getTasks = async(_parent, { filters: { offset = 0, limit = 50, } }, { user, })=> {

    console.log("user ", user)
    // console.log("args ", args)
    console.log("offset, limit ", offset, limit);
    
    return await TaskModel.find() // .skip(offset).limit(limit)
}


// get accounts
export const getTaskAccount = async({ accountId, }, args, { user, })=> {

    console.log("user ", user)
    // console.log("parent ", parent)
    console.log("args ", args);
    
    return await AccountModel.findById(accountId) // .skip(offset).limit(limit)
}
