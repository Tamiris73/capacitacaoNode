import {PrismaClient}  from "@prisma/client"
const prisma = new PrismaClient()

export const getCat = async (req,res)=>{
    const categoria = await prisma.categoria.findMany()
    res.json({
        data:categoria,
        msg:"categoria encontrada com sucesso"
    })
}

export const criaCat = async (req,res)=>{
    const categoria = await prisma.categoria.create({
        data:{
            nome: req.body.nome
        }
        })
        res.json({
            data:categoria,
            msg:"categoria criada com sucesso"
    })
}

export const deletaCat = async (req,res)=>{
    const categoria = await prisma.categoria.delete({
       where: {
        id: parseInt(req.params.catergoriaId)
       }
    })
        res.json({
            data:categoria,
            msg:"categoria criada com sucesso"
    })
}