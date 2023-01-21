import sequelize from "../config/sequelize.js";
import { Notice } from "../models/NoticeBoardModel.js";
import express from "express";
import { DATE } from "sequelize";
const router = express.Router();

sequelize.sync().then(() =>{
    console.log("DB is running");
})

/**
 * @swagger
 * components:
 *  schemas:
 *      Notice:
 *          type: object
 *          required:
 *              - author
 *              - message
 *              
 *          properties:
 *              id:
 *                 type: INTEGER
 *                 description: The auto generated id
 *              author:
 *                  type: STRING
 *                  description: The author's name
 *              message:
 *                  type: STRING
 *                  description: Notice message 
 *              date:
 *                  type: STRING
 *                  description: Date of the notice created
 *              likes:
 *                  type: INTEGER
 *                  description: like count for notice
 *          
 *          example:
 *              author: Harsh,
 *              message: This is sample text
 *              date: 10 September, 2022
 *              likes: 1
 */

/**
 * @swagger
 * 
 * /api/notice:
 *  post:
 *      summary: Creates a Notice
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Notice'
 *      responses:
 *        201:
 *          description: Notice is successfully created
 *        400:
 *          description: Author or Message is missing
 *        500:
 *          description: Internal server error
 * 
 */
 
 /**
 * @swagger
 * /api/notice:
 *  get:
 *      summary: Gets All the Notice list created sorted by date
 *      requestBody:
 *          required: false
 *      responses:
 *          200:
 *              description: Successfull Response
 *          404:
 *              description: No Notice found
 *          500:
 *              description: Internal server error
 *         
 *          
 */

 /**
 * @swagger
 * /api/notice/:id:
 *  get:
 *      summary: Gets the Notice with specific id
 *      requestBody:
 *          required: false
 *      responses:
 *          200:
 *              description: Successfull Response
 *          404:
 *              description: No Notice found with :id
 *          500:
 *              description: Internal server error
 *         
 *          
 */




// Get all the Notices
router.get("/notice", async(req, res) =>{
    const allNotice = await Notice.findAll({
        order:[
            ['date', 'DESC']
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