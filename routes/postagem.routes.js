import express from "express"
import * as PostagemController from "../controllers/postagem.controller.js"

const router = express.Router()

router.get('/postagem', PostagemController.getPost)
router.get('/postagem/:postagemId', PostagemController.getPostId)
router.post('/postagem', PostagemController.criaPost)
router.delete('/postagem/:postagemId', PostagemController.deletaPost)
router.put('/postagens/:postagemId', PostagemController.updatePost)


export default router

