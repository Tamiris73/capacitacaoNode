import express from "express"
import categoriaRouter from "./routes/categoria.routes.js"
import usuarioRouter from "./routes/usuario.routes.js"
import postagemRouter from "./routes/postagem.routes.js"

const app = express()
const port = 3031
app.use(express.json())
app.use('/public', express.static('public'))
app.use('/', categoriaRouter)
app.use('/', usuarioRouter)
app.use('/', postagemRouter)

app.listen(port, ()=>{
    console.log(`Ta rodando na porta ${port}`)
})
