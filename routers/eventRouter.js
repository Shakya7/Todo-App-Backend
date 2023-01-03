const express=require("express");
const eventController=require("../controllers/eventController");

const router=express.Router();

router.route("/getAllEvents/:id").get(eventController.getEventsById);
router.route("/updateEvent/:id").patch(eventController.updateEventById);
router.route("/createEvent/:id").post(eventController.createEvent);
router.route("/deleteEvent/:id").delete(eventController.deleteEventById);



module.exports=router;