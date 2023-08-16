import jsonwebtoken from 'jsonwebtoken'

export const useToken = (req,res,next) =>{
    const authorization = req.get('Authorization')

    const token = authorization ? authorization.split(" ")[1]: null
    let decodedToken={}
    try {
        decodedToken = jsonwebtoken.verify(token,process.env.Secret)
        req.email = decodedToken.email

        next()
    } catch (error) {
        return res.status(401).json({error:'token missing or invalid'})
    }
}