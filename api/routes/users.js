import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// // need to login then check
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user, you are log in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are log in and you can delete your account");
// });


// //delete originally cookies and then login and check && go database to change isAdmin:ture
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello admin, you are log in and you can delete all account");
// });

router.put('/:id', verifyUser,updateUser);

router.delete("/:id", verifyUser,deleteUser);

router.get("/:id", verifyUser,getUser);

router.get("/",verifyAdmin, getAllUser);




export default router;