const express=require("express");
const cors=require("cors");
require("dotenv").config();

const {openai}=require("./config/config");

const app=express();

app.use(express.json());
app.use(cors());

app.post("/getdata",async (req,res)=>{
    try {
        const {text,type,langauge}=req.body;
        const data = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `generate one beautiful ${type} on ${text} in ${langauge}` }],
            model: 'gpt-3.5-turbo',
          });
        res.status(200).send({
            isError:false,
            data:data.choices[0].message.content
        })
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error
        })
    }
})

app.listen(process.env.port,async (req,res)=>{
    try {
        console.log(`server is running on port ${process.env.port}`)
    } catch (error) {
        console.log(error);
    }
})
