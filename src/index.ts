import express from "express";
import { ApolloServer } from 'apollo-server-express'
import path from "path";

import cors from 'cors'
import * as dotenv from 'dotenv'
import morgan from 'morgan'

import { createAccount, getAccounts, login } from "./profile/resolvers";

import { connectToDb } from "./utils/database";
import { authenticateAuthorizationHeaders, authenticateCookies } from "./utils/authentication";
import { AccountTypes } from "./profile/types";
import { addTask, getTaskAccount, getTasks } from "./task/resolvers";
import { TaskTypes } from "./task/types";


const resolvers = {
    Query: {
        getAccounts,
        getTasks,
    },
    Mutation: {
        login,
        createAccount,

        addTask,
    },
    Task: {
        account: getTaskAccount,
    }
}

const start = async ()=> {

    // create express server
    const app = express()

    // get environment variables
    dotenv.config({ path: path.join(__dirname, '.env')})
    // console.log("path.join(__dirname, '.env') ", path.join(__dirname, '.env'));
    

    // connect to db
    connectToDb()

    // allow cross origin requests
    app.use(cors())

    // show dev logs
    app.use(morgan('dev'))

    app.use(express.json())

    console.log("env", process.env.DB_URL)

    // get auth user
    app.use(authenticateAuthorizationHeaders)
    app.use(authenticateCookies)


    // create apollo server
    const server = new ApolloServer({
        typeDefs: [ AccountTypes, TaskTypes, ],
        resolvers,
        context : ({ req, res, }) => {

            return { res, user: req['user'], }
        },
    });

    await server.start()
    server.applyMiddleware({ app, path: '/api' })


    app.get("/", (_req, res)=> {

        res.json({
            "api": "Target",
            running: true
        })
    })


    const PORT = 4000
    app.listen(PORT, ()=> {
        console.log(`api running on ${PORT}`);
        
    })
}

start()
