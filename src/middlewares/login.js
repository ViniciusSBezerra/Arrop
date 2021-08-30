const User = require("../database/models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
    async login(req, res){
        const { email, password } = req.body;

        //pesquisando os dados
        const users = await User.findOne({
            atributes: ["id", "email", "password"],
            where:{
                email
            }

        })

        //verificando se existe um user
        if(email === null){
            return res.json({
                error: true,
                message: "Erro: Email ou password incorreto!"
            });
        }

        //verificando se as senhas sao iguais
        if(!(await bcrypt.compare(password, users.password))) {
            return res.json({
                error: true,
                message: "Erro: email ou password incorreto!"
            })
        }

        const token = jwt.sign({ id: users.id }, process.env.secret, {
            expiresIn: "7d"
        });

        return res.json({
            message: "login realizado!",
            token
        })

    }
}


