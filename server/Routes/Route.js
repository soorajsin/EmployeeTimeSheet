const expres = require("express");
const router = expres.Router();
const userdb = require("../Model/userSchema");
const bcrypt = require("bcryptjs");
const authentication = require("../Middleware/authentication");

router.post("/register", async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, cpassword, role } = req.body;
    if (!name || !email || !password || !cpassword || !role) {
      res.status(400).json({
        error: "All fields are required"
      });
    } else {
      const checkUser = await userdb.findOne({ email });
      if (checkUser) {
        res.status(400).json({
          status: 201,
          message: "Email is already registered!"
        });
      } else {
        // console.log("done");
        const newForm = new userdb({
          name,
          email,
          password,
          cpassword,
          role
        });

        const updatedUser = await newForm.save();
        res.status(201).json({
          status: 202,
          data: updatedUser,
          msg: "Registered successfully done"
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to register"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        msg: "Please fill the all Fields"
      });
    } else {
      const checkUser = await userdb.findOne({ email });
      if (!checkUser) {
        res.status(400).json({
          msg: "user not found",
          status: 201
        });
      } else {
        const checkPassword = await bcrypt.compare(
          password,
          checkUser.password
        );
        // console.log(checkPassword);
        if (!checkPassword) {
          res.status(400).json({
            msg: "password not found",
            status: 202
          });
        } else {
          // console.log(checkPassword);
          const token = await checkUser.generateToken();
          // console.log(token);

          //generate cookie
          res.cookie("auth_token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
          });

          const result = { token, checkUser };
          res.status(201).json({
            status: 203,
            msg: "User Login succesfully done",
            data: result
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to login",
      error: error
    });
  }
});

router.get("/validator", authentication, async (req, res) => {
  try {
    // console.log("auth");
    if (req.getData) {
      res.status(201).json({
        msg: "User authorised",
        status: 201,
        data: req.getData
      });
    } else {
      res.status(201).json({
        msg: "user not authorised",
        status: 202
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      msg: "authentication failed"
    });
  }
});

router.post("/signOut", authentication, async (req, res) => {
  try {
    // console.log(req.body);
    const user = req.getData;
    if (!user) {
      res.status(400).json({
        msg: "user not found"
      });
    } else {
      user.tokens = [];
      const updatedUser = await user.save();
      res.status(201).json({
        status: 203,
        msg: "Successfully log Out user",
        data: updatedUser
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "User failed to log Out"
    });
  }
});

router.post("/addTimeArrange", async (req, res) => {
  try {
    // console.log(req.body);
    const { sendData } = req.body;
    if (!sendData) {
      res.status(400).json({
        msg: "send data not found"
      });
    } else {
      const user = await userdb.findOne({});
      if (!user) {
        res.status(400).json({
          msg: "user not found"
        });
      } else {
        user.addTimeArrange.push(...sendData);
        const updatedUser = await user.save();
        res.status(201).json({
          msg: "add to succuss",
          status: 203,
          data: updatedUser.addTimeArrange
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to add"
    });
  }
});

router.get("/fetchedToemployee", async (req, res) => {
  try {
    const fetched = await userdb.find({});

    const timeArrange = fetched.map((user) => user.addTimeArrange);
    // console.log(timeArrange);
    res.status(201).json({
      msg: "fetched data",
      status: 205,
      data: timeArrange
    });
  } catch (error) {
    res.status(400).json({
      msg: "failed to fetch employee"
    });
  }
});

router.delete("/deletearrangeTime", async (req, res) => {
  try {
    // console.log(req.body);
    const { addTimeArrangeId } = req.body;
    if (!addTimeArrangeId) {
      res.status(400).json({
        msg: "addTimeArrangeId not found"
      });
    } else {
      const user = await userdb.findOne({});
      if (!user) {
        res.status(400).json({
          msg: "user not foun"
        });
      } else {
        // console.log(user);
        const index = user.addTimeArrange.find(
          (addTimeArrange) => addTimeArrange._id.toString() === addTimeArrangeId
        );
        if (index === -1) {
          res.status(400).json({
            msg: "entry not found or token invalid"
          });
        } else {
          // console.log(entry);
          user.addTimeArrange.splice(index, 1);

          await user.save();
          res.status(201).json({
            msg: "successfully deleted",
            status: 201,
            data: user
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to delete"
    });
  }
});

router.put("/update", async (req, res) => {
  try {
    // console.log(req.body);
    const { sendData, addTimeArrangeId } = req.body;
    if (!sendData || !addTimeArrangeId) {
      res.status(400).json({
        msg: "senddata not found"
      });
    } else {
      const user = await userdb.findOne({});
      // console.log(user);
      const index = user.addTimeArrange.findIndex(
        (addTimeArrange) => addTimeArrange._id.toString() === addTimeArrangeId
      );
      if (index === -1) {
        res.status(400).json({
          msg: "index not found"
        });
      } else {
        // console.log(index);
        user.addTimeArrange[index].aprojectname = sendData.aprojectname;
        user.addTimeArrange[index].adate = sendData.adate;
        user.addTimeArrange[index].atimefirst = sendData.atimefirst;
        user.addTimeArrange[index].atimeend = sendData.atimeend;
        user.addTimeArrange[index].aprojectdec = sendData.aprojectdec;
        // console.log(user);

        const updatedUser = await user.save();
        // console.log(updatedUser);
        res.status(201).json({
          msg: "update successfully done",
          status: 202,
          data: updatedUser
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "not update"
    });
  }
});

router.post("/rating", async (req, res) => {
  try {
    // console.log(req.body);
    const { sendData, addTimeArrangeId } = req.body;
    if (!sendData || !addTimeArrangeId) {
      res.status(400).json({
        msg: "plz fill all fields"
      });
    } else {
      const user = await userdb.findOne({});
      if (!user) {
        res.status(400).json({
          msg: "user not found"
        });
      } else {
        // console.log(user);
        const entryIndex = user.addTimeArrange.findIndex(
          (addTimeArrange) => addTimeArrange._id.toString() === addTimeArrangeId
        );
        if (entryIndex === -1) {
          res.status(400).json({
            msg: "entry not found"
          });
        } else {
          // console.log(entry);

          user.addTimeArrange[entryIndex].rating = sendData.rating;

          await user.save();
          res.status(201).json({
            status:205,
            msg: "successfully add rating",
            data: user
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "rating error"
    });
  }
});

module.exports = router;
