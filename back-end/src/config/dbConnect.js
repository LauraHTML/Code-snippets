import mongoose from "mongosee";
require('dotenv').config();

// console.log(process.env.STRING_CONEXAO)

async function conectaDatabase () {
    mongoose.connect(process.env.STRING_CONEXAO);
    return mongoose.conection; 
}

export default conectaDatabase
