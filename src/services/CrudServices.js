const { resolve } = require('app-root-path');
const db = require('../models/index')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) =>{
    return new Promise( async (resolve, reject) =>{
        try {
            let hashfromPassword = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashfromPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                RoleId: data.RoleId
            })
            resolve('ok')
        } catch (error) {
            reject(error)
        }
    })
}
let hashUserPassword = (password) =>{
    return new Promise( async (resolve, reject) =>{
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error)
        }
    
    })
}

let getAllUser = () =>{
    return new Promise( async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true
            });
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let EditUser = (UserId) =>{
    return new Promise( async (resolve, reject) => {
        try {   
        let user = await db.User.findOne({
            where: {id: UserId},
            raw: true
        })
        resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}
// update user
let updateUserData = (data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: data.id}
                
            })
            if(user){
                user.email = data.email;
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;

                await user.save()
                resolve()
            }else{
                resolve()
            }
        } catch (error) {
            
        }
    })
}
//Delete User
let DeleteUser = (useid) =>{
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: useid}
            })
            if(user){
              await  user.destroy()
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

let getPagina= async (page, limit) =>{
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

module.exports ={
    createNewUser,getAllUser,EditUser,updateUserData,DeleteUser,getPagina
}