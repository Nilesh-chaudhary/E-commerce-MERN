const app = require('./app');

const dotenv = require('dotenv'); 
const connectDatabase = require('./config/database')

//Handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Uncaught exception`);
    process.exit(1);
});

//config

dotenv.config({path:"backend/config/config.env"});

// connecting to database
connectDatabase();

const server = app.listen(process.env.PORT,() => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
});

//unhandeled promise rejection
process.on("unhandeledRejection",(err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandeled promise rejection`);

    server.close(() =>{
        process.exit(1);

    });
});