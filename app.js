import express from "express"
import categoriaRouter from "./routes/categoria.routes.js"
import usuarioRouter from "./routes/usuario.routes.js"

const app = express()
const port = 3030
app.use(express.json())
app.use('/', categoriaRouter)
app.use('/', usuarioRouter)

app.listen(port, ()=>{
    console.log(`Ta rodando na porta ${port}`)
})
