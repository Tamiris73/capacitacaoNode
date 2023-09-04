import express from "express"
import * as helloController from "../controllers/hello.controller.js"

const router = express.Router()

router.get('/hello', helloController.hello)

export default router

