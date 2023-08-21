const db = require('../models/index')
const CrudServices = require('../services/CrudServices')

let HomePage = async (req, res) => {
    let data = await db.User.findAll();
    res.render('homePage.ejs')
}
let getCrud = (req, res) => {
    res.render('crud.ejs')
}

let PostCrud = async (req, res) => {
    let message = await CrudServices.createNewUser(req.body)
    // console.log(message)
    return res.redirect('/get-crud')
}


let displayCrud = async (req, res) => {
    let data = await CrudServices.getAllUser(req.body)
    // console.log("data cua long: ", data)
    return res.render('display-crud.ejs', {
        listUser: data
    })
}
let getEdit = async (req, res) => {
    let UserId = req.params.id
    let Data = await CrudServices.EditUser(UserId)
    return res.render('Edit-crud.ejs', {
        userData: Data
    })
}

let PutCrud = async (req, res) => {
    let data = req.body;
    await CrudServices.updateUserData(data)
    // console.log("Data change: ", data)
    return res.redirect('/get-crud')

}

let getDeleteUser = (req, res) => {
    let useid = req.params.id
    CrudServices.DeleteUser(useid)
    return res.redirect('/get-crud')
}

let getUpload = (req, res) => {
    res.render('uploadfile.ejs')
}

let UploadFile = (req, res) => {
    if (req.file) {
        return res.send(`you have upload this image:<hr> <img src="/image/${req.file.filename}" with="500px" /><hr><a href="/upload">upload anther image</a`)
    } else if (!req.file) {
        return res.send('please select an inmage to upload')
    }
    // res.send(`you have upload this image: <img src="/image/${req.file.filename}" with="500" /><a href="/upload">upload anther image</a`)
}

// let MultipleFile = (req, res) =>{
//     let files = req.file
//     let result = "You have uploaded these images: <hr />";
//     let index, len
//     for(index = 0, len = files.length; index < len; ++index){
//         result += `<hr/><img src="${files[index].filename}" width="300" style="margin-right: 20px;"><hr/><a href="/upload">upload anther image</a>`;
//     }

//     res.send(result)
// }

let getPagination = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page
            let limit = req.query.limit
            let data = await CrudServices.getPagina(+page, +limit)
            return res.render('pagination.ejs', {
                Data: data.DT
            })
        } else {
            return res.redirect('/get-crud');
        }
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    HomePage, getCrud, PostCrud, displayCrud, getEdit, PutCrud, getDeleteUser,
    getUpload, UploadFile, getPagination
}