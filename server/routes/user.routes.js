
const UserController = require('../controllers/user.controller.js')

    module.exports = (app) =>{
    // get all
    app.get('/api/allUsers', UserController.getAllUsers)
    //get one by id
    app.post('/api/login', UserController.login)
    //get one by id
    app.get('/api/login/:id', UserController.login)
    //Add one to db
    app.post('/api/register', UserController.register)
    //Logout
    app.get('/api/logout', UserController.logOut)
    //Update/Edit one
    app.put('/api/editUser/:id', UserController.editOneUser)
    //Delete one
    app.delete('/api/deleteUser/:id', UserController.deleteOneUser)
}