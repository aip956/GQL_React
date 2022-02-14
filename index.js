
require("dotenv").config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const {gql} = require('apollo-server-express');
// const { MONGODB_URL } = process.env;
const URL = "mongodb+srv://sei:seirocks@cluster0.acqm3.mongodb.net/GQL_React?retryWrites=true&w=majority"


mongoose.connect(
    URL,
    { 
        useUnifiedTopology:true,
        UseNewUrlParser:true,
     },
     () => console.log("DB Connected")
     );

// Queries
const typeDefs = gql`
type Query {
hello: String
}
`;

// Resolvers
const resolvers = {
    Query: {
        hello: () => {
            return "Hello World";
        },
    },
};

const startServer=async()=>{
    const app=express()
    const ApolloServer=new ApolloServer({
        typeDefs,resolvers
    })
    await ApolloServer.start()
    ApolloServer.applyMiddleware({app:app});
    app.listen(4000,()=>console.log("Server up and running on 4000"));
}
