const userServices = require('../services/userServices')

let getlogin = async (req, res) =>{
    let email = req.body.email
    let password = req.body.password
    if(!email || !password){
        return res.status(200).json({
            errCode: 1,
            message: 'missing input params'
        })
    }
    let userData = await userServices.handleUserlogin(email, password)
    console.log(userData)
    return res.status(200).json({
        userData,
        errcode: userData.errCode,
        message: userData.message
    })
}

let getUserData = async (req, res) => {
    try{
        if(req.query.page && req.query.limit){
            let page = req.query.page
            let limit = req.query.limit
            let data = await userServices.getPagination(+page, +limit)
            return res.status(200).json({
                DT: data.DT,
            })
        }else{
            return res.status(200).json({
               
            })
        }
    }catch(error){
        console.log(error)
    }
}



module.exports = {
    getlogin,getUserData
}