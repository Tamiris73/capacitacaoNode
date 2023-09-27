import {PrismaClient}  from "@prisma/client"
import gerarToken from "../utils/jwt.js"
import nodemailer from "nodemailer";  
const prisma = new PrismaClient()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'email@gmail.com', 
      pass: 'senha', 
    },
  });
  
  export const criaUser = async (req, res) => {
    const role = req.body.role == "true" ? true : false;
    const User = await prisma.usuario.create({
      data: {
        email: req.body.email,
        senha: req.body.senha,
        role: role,
        perfil: {
          create: {
            nome: req.body.nome,
            telefone: req.body.telefone,
            nascimento: req.body.nascimento,
            bio: req.body.bio,
            fotoPerfil: req.body.fotoPerfil,
          },
        },
      },
    });
  
    // Envie um e-mail de confirmação para o novo usuário
    const mailOptions = {
        from: 'email@gmail.com',
        to: 'email@gmail.com',
        subject: 'Obrigada por se cadastrar',
        text: 'Seu cadastro foi efetuado com sucesso',
      };
      
      // Envie o e-mail
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Erro ao enviar o e-mail:', error);
        } else {
          console.log('E-mail enviado com sucesso:', info.response);
        }
      });
      
  
    const token = gerarToken(User);
    res.json({
      data: User,
      token: token,
      msg: "User criado com sucesso",
    });
  };
  

export const getUser = async (req,res)=>{
    const User = await prisma.usuario.findMany({
        where:{
            perfil:{
                nome:{
                    contains: req.query.nome
                },
                telefone:{
                    contains: req.query.telefone
                }
            }
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

export const login = async (req,res)=>{
    const User = await prisma.usuario.create({
        where:{
            AND:{
                email: req.body.email,
                senha: req.body.senha
            }
        }
        })
        if(User==null){
            res.status(401).json({
                msg:"email ou senha não conferem"
            })
        }
        const token=gerarToken(User)
        res.json({
            data:User,
            token:token,
            msg:"Login efetuado com sucesso"
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