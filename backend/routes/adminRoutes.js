const express = require("express");
const { verifyAdmin } = require("../middleware/adminVerify");
const {
  getAllUsers,
  getAllProperties,
  getAllPayments,
  deleteUser,
  banUser,
  getAllOwners,
  getPendingOwners,
  approveOwner,
  rejectOwner,
} = require("../controllers/adminController");

const router = express.Router();


router.get("/owners",  getAllOwners);
router.get("/users",  getAllUsers);
router.get("/properties", getAllProperties);
router.get("/payments", getAllPayments);
router.delete("/user/:id",  deleteUser);
router.put("/user/:id/ban",  banUser);

router.get('/pending-owners', getPendingOwners);
router.put('/approve-owner/:id',  approveOwner);
router.delete('/reject-owner/:id',  rejectOwner);


module.exports = router;
