import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

// Forgot password
router.post('/forgot-password', forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

// protected route auth
router.get("/user-auth", requireSignIn, (req, res)=>{
  res.status(200).send({ok:true});
})

// protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res)=>{
  res.status(200).send({ok:true});
})

// Update profile
router.put('/update-profile', requireSignIn, updateProfileController);

// router for orders
router.get('/orders', requireSignIn, getOrdersController);


// router for admin orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);

// Change order status
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);

export default router;
