const bcrypt = require('bcryptjs');
const db = require('../models/index');
const { resolve } = require('app-root-path');
let handleUserlogin = (email, password) =>{
    return new Promise( async (resolve, reject) => {
        try {
            let data = {}
            let exist = await checkUser(email)
            if(exist){
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId'],
                    where: {email: email },
                    raw: true
                })
                if(user){
                   let check = await bcrypt.compareSync(password, user.password)
                   if(check){
                    data.errCode = 0
                    data.message = 'ok'
                    delete user.password
                    data.user = user

                   }else{
                    data.errCode = 3
                    data.message = 'wrong password'
                   }
                }else{
                    data.errCode = 2
                    data.message = `User's not found`
                }
            }else{
                 
                data.errCode = 1;
                data.message = `Your's email isn't exist`
               
            }
            resolve(data)
        } catch (error) {
            reject(error)            
        }
    })
    
}
let checkUser = (Useremail) => {
    return new Promise( async (resolve, reject) => {
        try {
            let userlogin = await db.User.findOne({
                where: {email: Useremail}
            })
            if(userlogin){
                resolve(true)
            }else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getPagination = async (page, limit) =>{
        try {
            let offset =  (page - 1) * limit
            let {count, rows} = await db.User.findAndCountAll({
                attributes: ['email', 'firstName'],
                    offset: offset,
                    limit: limit ,
            })
            let totalPages = Math.ceil(count / limit);
            let Data = {
                totalRow: count,
                totalPages: totalPages,
                users: rows
            }
            return {
                EM: "something wrong with services",
                EC: 1,
                DT: Data.users
            }
            
        } catch (error) {
            console.log(error)
            return {
                EM: "something wrong with services",
                EC: 1,
                DT: [],
            }
        }
}

module.exports = {
    handleUserlogin,getPagination
}