import mongoose from "mongoose";

const conn = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName: "photogram",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to database successfully")
    }).catch((err) => {
        console.log(`DB connection error:, ${err}`)
    });
};

export default conn;