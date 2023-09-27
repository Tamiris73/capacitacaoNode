import {PrismaClient}  from "@prisma/client"
const prisma = new PrismaClient()

export const getPost = async (req,res)=>{
    const Post = await prisma.postagem.findMany({
        include:{
           categoria: true
        }
    })
    res.json({
        data:Post,
        msg:"Post encontrado com sucesso"
    })
}

export const getPostId = async (req,res)=>{
    const Post = await prisma.postagem.findUnique({
        where: {
            id: parseInt(req.params.postagemId)
           },
        include:{
            categoria: true
        }
    })
    res.json({
        data:Post,
        msg:"Post encontrado com sucesso"
    })
}

export const criaPost = async (req,res)=>{
    const Post = await prisma.postagem.create({
        data:{
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            usuario:{
                connect:{
                    id: req.body.usuario
                } 
            },
            categoria:{
                connect: req.body.categorias
            }
        }
    })
        res.json({
            data:Post,
            msg:"Post criado com sucesso"
    })
}

export const deletaPost = async (req,res)=>{
    const postagemDeletado = await prisma.postagem.deleteMany({
       where: {
        postagem:{
            id: parseInt(req.params.postagemId)
       }
    }
    })
        res.json({
            data:postagemDeletado,
            msg:"Post deletado com sucesso"
    })
}

export const updatePost = async (req,res)=>{
    const Post = await prisma.postagem.update({
       where: {
        id: parseInt(req.params.postagemId)
       },
       data:{
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            categoria:{
                connect: req.body.categorias
        }
    }
    })
        res.json({
            data:Post,
            msg:"Post atualizado com sucesso"
    })
}