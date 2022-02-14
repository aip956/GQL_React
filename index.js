
require("dotenv").config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");


const { URL } = process.env;


//  Database connection
mongoose.connect(
    URL,
    { 
        useUnifiedTopology:true,
        UseNewUrlParser:true,
     },
     () => console.log("DB Connected")
     );



const startServer=async()=>{
    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs,resolvers,
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({app:app});
    app.listen(4000,()=>console.log("Server up and running on 4000"));
}
startServer(); 