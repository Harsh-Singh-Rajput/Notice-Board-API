import sequelize from "../config/sequelize.js";
import { Notice } from "../models/NoticeBoardModel.js";
import express from "express";
import { DATE } from "sequelize";
const router = express.Router();

sequelize.sync().then(() =>{
    console.log("DB is running");
})


// Get all the Notices
router.get("/notice", async(req, res) =>{
    const allNotice = await Notice.findAll({
        order:[
            ['date']
        ]
    })
    if(allNotice.length != 0) return res.status(200).send(allNotice)
    else return res.status(404).send({message:"No Notice Found"})
})

// Get Notice with specific ID
router.get("/notice/:id", async(req, res) =>{
    const allNotice = await Notice.findOne({
        where:{
            id:req.params.id
        }
    })
    if(allNotice) return res.status(200).send(allNotice)
    else return res.status(404).send({message:"No Notice Found"})
})


// Create New Notice with incoming data
router.post("/notice", async(req, res) =>{

    // check whether notice contains author and message key or not
    if(!req.body.hasOwnProperty("author") || !req.body.hasOwnProperty("message")){
        return res.status(400).send({error:"Author or message key is missing"} )
    }
    const {author, message, date, likes} = req.body

    if(!author) return res.status(400).send({err:"Author can't be empty or null"})
    if(!message) return res.status(400).send({err:"Message can't be empty or null"})
    const createNotice = {
        author,
        message,
        date,
        likes
    }
    console.log(createNotice);
    const createdNotice = await Notice.create(createNotice)
    if(createNotice) return res.status(201).send(createdNotice)
    else return res.status(404).send({error:"Error creating in notice"})
})


// Update the like count
router.put("/notice/:id/like", async (req, res) =>{
    const id = req.params.id
    const notice = await Notice.findOne({
        where:{
            id
        }
    })

    if(!notice) return res.status(404).send({err:`Notice with id:${req.params.id} not found`});
    
    const likes = notice.likes + 1
    const updateNotice = {
        id,
        author:notice.author,
        message:notice.message,
        date:notice.date,
        likes
    }
    const updatedNotice = await Notice.update({likes},{
        where:{
            id
        }
    })
    return res.status(200).send(updateNotice)


})

// Delete Notice with specific id
router.delete("/notice/:id", async(req,res) =>{
    const id = req.params.id
    const notice = await Notice.findOne({
        where:{
            id
        }
    })
    if(!notice) return res.status(404).send({err:`Notice with id:${id} not found`});
    const deleted = await Notice.destroy({
        where:{
            id
        }
    })
    if(deleted) res.status(200).send({message:`Notice with id:${req.params.id} deleted successfully`})
})




export default router