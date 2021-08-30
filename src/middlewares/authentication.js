const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = {
    async authentication(req, res, next){
        const authenticationHeader = req.headers.authorization;

        if(!authenticationHeader){
            return res.json({
                error: true,
                message: "Erro: Necessario realizar login para acessar a pagina"
            });
        }

        const [, token ] = authenticationHeader.split(" ");
        
        if(!token){
            return res.json({
                error: true,
                message: "Erro: Token invalido!"
            });
        }

        try {
            const decode = await promisify(jwt.verify)(token, process.env.secret)
            req.userId = decode.id;
            return next();
        } catch (error) {
            return res.json({
                error: true,
                message: "Erro: Token invalido!"
            });
        }
    }
}