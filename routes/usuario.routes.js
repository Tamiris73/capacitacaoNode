import express from "express"
import multer from "multer"
import path from "path"
import * as UsuarioController from "../controllers/usuario.controller.js"
import autorizarUsuario from "../middleware/auth.middlewares.js"
import autorizarAdmin from "../middleware/admin.middlewares.js"

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public')
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+path.extname(file))
    }
})
const router = express.Router()
const upload = multer({storage: storage})

router.get('/usuario', UsuarioController.getUser)
router.post('/login', UsuarioController.login)
router.get('/usuario/:usuarioId', UsuarioController.getUserId)
router.post('/usuario', upload.single('foto_perfil'), UsuarioController.criaUser)
router.delete('/usuario/:usuarioId', UsuarioController.deletaUser)
router.put('/usuarios/:usuarioId', UsuarioController.updateUser)


export default router

