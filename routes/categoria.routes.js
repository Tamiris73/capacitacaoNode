import express from "express"
import * as CategoriaController from "../controllers/categoria.controller.js"

const router = express.Router()

router.get('/categoria', CategoriaController.getCat)
router.post('/categoria', CategoriaController.criaCat)
router.delete('/categoria/:categoriaId', CategoriaController.deletaCat)


export default router

