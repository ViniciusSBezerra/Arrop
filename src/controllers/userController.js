
const User = require("../database/models/users");
const bcrypt = require("bcrypt")

module.exports = {

    async createUser(req, res) {
        let { userName, email, phone, password } = req.body;

        password = await bcrypt.hashSync(password, 8);

       const userAlreadyExists = await User.findOne({ where: { email } });

        if(userAlreadyExists){
            return res.json({
                error: true,
                message: "Erro: Usuario já cadastrado!"
            })
        }
        
        await User.create({
            userName,
            email,
            phone,
            password
        })
        .then(() => {
            return res.json({
                error: false,
                message: "Usuario cadastrado com sucesso!"
            })
        })
    },

    async updateUser(req, res){
        const {userName, email, phone, password} = req.body;
        const { id } = req.params;

        await User.update({ userName, email, phone, password },{
            where: { id }
        })
        .then(() =>{
            return res.json({
                error: false,
                message: "Usuario alterado com sucesso!"
            })
        })
    },

    async listUser(req, res) {

        User.findAll().then((response) =>{
            return res.json({
                response
            })
        })
    },

    async deleteUser(req, res) {
        await User.destroy({ where: { id: req.params.id }})
        .then(() =>{
            return res.json({
                error: false,
                message: "Usuario deletado com sucesso!"
            })
        })
    }
}