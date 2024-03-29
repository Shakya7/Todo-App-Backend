const express=require("express");
const todoController=require("../controllers/todoController");

const router=express.Router();

//Todo routes
router.route("/createTodo").post(todoController.createSingleTodo);
router.route("/getAllTodos/:id").get(todoController.getAllTodos);
router.route("/updateTodo/:id").patch(todoController.updateTodo);
router.route("/deleteTodo/:id").delete(todoController.deleteTodo);

//Update or Sort or Filter
router.route("/getInProgressTodos/:id").get(todoController.getInProgressTodos);
router.route("/getCompletedTodos/:id").get(todoController.getCompletedTodos);



//Task routes
router.route("/deleteTask/:id").patch(todoController.deleteTask);
router.route("/updateTask/:id").patch(todoController.updateTask);
router.route("/createTask/:id").patch(todoController.createTask);
router.route("/updateTaskCheckbox/:id").patch(todoController.updateSingleTaskCheckbox);




module.exports=router;