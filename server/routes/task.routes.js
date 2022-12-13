const TaskController = require('../controllers/task.controller.js')


module.exports = (app) =>{
//get all
app.get('/api/allTasks', TaskController.getAll)
//get one by id
app.get('/api/task/:id', TaskController.getOne)
//Add one to db
app.post('/api/addTask', TaskController.addOne)
//Update/Edit one
app.put('/api/edit/:id', TaskController.editOne)
//Delete one
app.delete('/api/delete/:id', TaskController.deleteOne)
}