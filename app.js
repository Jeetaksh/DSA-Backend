const express = require("express");

const app = express();

const cors=require("cors");

app.use(cors());
app.use(express.json());

const topicrouter = require("./Routes/QuestionRoutes/Route");

const companyRoutes = require("./Routes/CompanyRoutes/Route");

const noteRouter = require("./Routes/NoteRoutes/Route");

const questionRoutes = require("./Routes/TopicRoutes/Routes");

const addQuestion = require("./Routes/UserQuestions/Route");

const userRoutes = require("./Routes/UserRoutes/Route");
const revisionRouter = require("./Routes/RevisionQuestio/revisionRouter");
const Auth = require('./Routes/MiddleWare/Auth');


app.use(topicrouter);

app.use(companyRoutes);

// app.use(questionRoutes);

app.use(noteRouter);

app.use(userRoutes);


app.use(revisionRouter);


app.use(addQuestion);

app.get("/",async(req,res)=>{  

    res.send("started");

})


app.listen(8000,()=>{

    console.log("app started succ");

})

