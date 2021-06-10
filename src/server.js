import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const posts = [{
    id: 1,
    title: 'Hello World',
    coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
    contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
    content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
    commentCount: 2
  }]

const comments = [{
    id: 1,
    postId: 1,
    author: 'João',
    content: 'Muito bom esse post! Tá de parabéns'
  }, {
    id: 2,
    postId: 1,
    author: 'Maria',
    content: 'Como faz pra dar palmas?'
  }]

  let id = 1
  let commentId = comments.length

app.get("/posts", (req, res) =>{
    res.send(posts)
})

app.get("/posts/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const selectedPost = posts.find(p=> id===p.id)
    res.send(selectedPost)
})

app.post("/posts", (req,res)=>{
    id++
    const newPost = {...req.body, id: id, contentPreview: req.body.content.substring(3, req.body.content.length>50? 53: req.body.content.length-4 ), commentCount: 0 }
    posts.push(newPost)
    res.send(newPost)
})

app.get("/posts/:id/comments", (req, res)=>{
    const id = parseInt(req.params.id)
    res.send(comments.filter(c=>id===c.postId))
})

app.post("/posts/:id/comments", (req,res)=>{
    const id = parseInt(req.params.id)
    commentId++
    posts.forEach(p=>p.id === req.body.postId && p.commentCount++)
    comments.push({id: commentId ,...req.body })
    res.send("ok")
    
})

app.listen(4000)