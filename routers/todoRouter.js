const express=require("express");
const todoController=require("../controllers/todoController");

const router=express.Router();

//Todo routes
router.route("/createTodo").post(todoController.createSingleTodo);
router.route("/getAllTodos/:id").get(todoController.getAllTodos);
router.route("/updateTodo/:id").patch(todoController.updateTodo);



//Task routes
router.route("/deleteTask/:id").patch(todoController.deleteTask);
router.route("/updateTask/:id").patch(todoController.updateTask);




module.exports=router;