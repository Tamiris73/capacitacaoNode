import {PrismaClient}  from "@prisma/client"
const prisma = new PrismaClient()

export const getUser = async (req,res)=>{
    const User = await prisma.usuario.findMany({
        include:{
            perfil: true
        }
    })
    res.json({
        data:User,
        msg:"User encontrado com sucesso"
    })
}

export const getUserId = async (req,res)=>{
    const User = await prisma.usuario.findUnique({
        where: {
            id: parseInt(req.params.usuarioId)
           },
        include:{
            perfil: true
        }
    })
    res.json({
        data:User,
        msg:"User encontrado com sucesso"
    })
}

export const criaUser = async (req,res)=>{
    const User = await prisma.usuario.create({
        data:{
            email: req.body.email,
            senha: req.body.senha,
            role: req.body.role,
            perfil:{
                create:{
                    nome: req.body.nome,
                    telefone: req.body.telefone,
                    nascimento: req.body.nascimento,
                    bio: req.body.bio,
                }
            }
        }
        })
        res.json({
            data:User,
            msg:"User criado com sucesso"
    })
}

export const deletaUser = async (req,res)=>{
    const perfilDeletado = await prisma.perfil.deleteMany({
       where: {
        usuario:{
            id: parseInt(req.params.usuarioId)
       }
    }
    })
        res.json({
            data:perfilDeletado,
            msg:"User deletado com sucesso"
    })
}

export const updateUser = async (req,res)=>{
    const User = await prisma.usuario.update({
       where: {
        id: parseInt(req.params.usuarioId)
       },
       data:{
        email: req.body.email,
        perfil:{
            update:{
                nome: req.body.nome,
                telefone: req.body.telefone,
                nascimento: req.body.nascimento,
                bio: req.body.bio,
            }
        }
    }
    })
        res.json({
            data:User,
            msg:"User atualizado com sucesso"
    })
}