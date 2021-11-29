require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

const authRouter = require("./routes/auth");
const Links = require("./routes/Links");
const Page = require('./routes/page')
const profile = require('./routes/profile')
const card = require('./routes/card')

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jagsx.mongodb.net/KTPM?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("connected");
    } catch (err) {
        console.log(`err: ${err}`);
        process.exit(1);
    }
};

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(cors())

app.use("/api/auth", authRouter);
app.use("/api/Links", Links);
app.use('/api/page', Page);
app.use('/api/profile', profile)
app.use('/api/card', card)

connectDB();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`run on port ${port}`));
