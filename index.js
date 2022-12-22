const e = require('express')
const express = require('express')
const app = express()
app.use(express.json())
const port = 8000

let students = [
    {
        name:"kedar",
        email:"k@gmail.com",
        mobile:"95648756654",
        batch: "WDB40",
        mentor:"Nagrajan"
    },
    {
        name:"tony",
        email:"tony@gmail.com",
        mobile:"9569784454",
        batch: "WDB40",
        mentor:"Nagrajan"
    }
]
app.get('/',(req,res)=>{
    res.send(`<h1>Welcome to Express! student management</h1>
    <h4>Your app route is /students</h4>
    `)

})

app.get('/students',(req,res)=>{
    res.send(students)
    // res.send (`<h1>Welcome to Express</h1>`)
})
app.get('/students/:id',(req,res)=>{
    if( req.params.id < students.length )
        res.status(200).send(students[req.params.id])
    else
        res.status(400).send({
            message:"Invalid ID"
        })
})

app.post('/students',(req,res)=>{
    if(req.body.name && req.body.email && req.body.mobile)
   {
    let student = students.filter((e)=>e.email===req.body.email)
    if(student.length===0)
    {
        students.push(req.body)
        res.status(200).send({
            message:"Student Added Successfully"
        })
     }
     else{
        res.status(400).send({
            message:`${req.body.email} already exists`
        })
    }
   }
    
   else{
    res.status(400).send({
        message:"Name, Email, Mobile is mandatory!"
    })
}
   
})

app.put('/students/:id',(req,res)=>{
    if(req.params.id<students.length)
    {
        students.splice(req.params.id,1,req.body)
        res.status(200).send({
            message:"Details updated successfully!"
        })
    }
    else{
        res.status(400).send({
            message:"Invalid ID"
        })
    }
})

app.delete('/students/:id',(req,res)=>{
    if(req.params.id<students.length)
    {
        let deletedData = students.splice(req.params.id,1,req.body)
        res.status(200).send({
            message:"Details Deleted successfully!",
            data:deletedData
        })
    }
    else{
        res.status(400).send({
            message:"Invalid ID"
        })
    }
})

app.listen(port,()=>{
    console.log("App is listening to "+port)
})


