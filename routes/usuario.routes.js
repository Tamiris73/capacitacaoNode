import express from "express"
import * as UsuarioController from "../controllers/usuario.controller.js"

const router = express.Router()

router.get('/usuario', UsuarioController.getUser)
router.get('/usuario/:usuarioId', UsuarioController.getUserId)
router.post('/usuario', UsuarioController.criaUser)
router.delete('/usuario/:usuarioId', UsuarioController.deletaUser)
router.put('/usuarios/:usuarioId', UsuarioController.updateUser)


export default router

