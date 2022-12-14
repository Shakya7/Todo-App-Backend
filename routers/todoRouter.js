const express=require("express");
const todoController=require("../controllers/todoController");

const router=express.Router();

router.route("/createTodo").post(todoController.createSingleTodo);
router.route("/getAllTodos/:id").get(todoController.getAllTodos);
router.route("/getTodo/:id").get(todoController.getTodo);
router.route("/updateSingleTodo/:id").patch(todoController.updateSingleTodo);
router.route("/deleteSingleTodo/:id").delete(todoController.deleteSingleTodo);
router.route("/deleteAllTodos").delete(todoController.deleteAllTodos);


module.exports=router;