const express=require("express");
const taskController=require("../controllers/taskController");

const router=express.Router();

router.route("/createTask").post(taskController.createTask);
router.route("/getAllTasks").get(taskController.getAllTasks);
router.route("/getTask/:id").get(taskController.getTask);
router.route("/updateTask/:id").patch(taskController.updateTask);

module.exports=router;