const express=require("express");
const noteController=require("../controllers/noteController");

const router=express.Router();

router.route("/createNote").post(noteController.createNote);
router.route("/updateNote/:id").patch(noteController.updateNote);
router.route("/getAllNotes/:id").get(noteController.getAllNotes);
router.route("/deleteNote/:id").delete(noteController.deleteNote);


module.exports=router;

