
const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()
// const passport = require('passport')
// require('../middleware/passport')
const User = require("../model/user");
const auth = require("../middleware/auth");
// const tokenList = {}
router.get("/welcome", auth.verifyToken, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// Register
router.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
     
      const { first_name, last_name, email, password } = req.body;
  
      // Validate user input
      if (!(email && password && first_name && last_name)) {
        return res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password,10);
  
      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        'pranay',
        {
          expiresIn: "1h",
        }
      );
     
      user.token = token;
  
      return res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  
  });
    
// Login
router.post("/login", async(req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
          return res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },'pranay',
            {expiresIn: "1h",}
          );
        //   const refreshToken = jwt.sign(
        //     { user_id: user._id, email },
        //     'pranay',
        //     {
        //       expiresIn: "1440h",
        //     }
        //   );
        //   const response = {
        //     "status": "Logged in",
        //     "token": token,
        //     "refreshToken": refreshToken,
        // }
        // tokenList[refreshToken] = response
        //  res.status(200).json(response);
    
          
          user.token = token;
         
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
    });

// Get all users
router.get('/users', auth.enhance,async(req,res)=>{

        try{
            const users = await User.find()
            res.json(users)
        }
        catch(err){
            res.send('error'+err)
        }
    })    


// Get a particular user
router.get('/:id', auth.verifyToken,async(req,res)=>{

  try{
    const user = await User.findById(req.params.id)
    res.json(user)
  }
  catch(err){
      res.send('error'+err)
  }
})    

// Update a particular user
router.put('/:id', auth.enhance,async(req,res)=>{

  try{
    
    const user = await User.findById(req.params.id)
        user.email = req.body.email
        const u1 = await user.save()
        res.json(u1)
  }
  catch(err){
      res.send('error'+err)
  }
})   

// Delete a user
router.delete('/:id', auth.enhance,async(req,res)=>{

  try{
    
    const user = await User.findById(req.params.id)
    const role = user.role
    if (role=='guest') {return res.status(400).send("you cannot delete the user");}
    const u1 = await user.delete()
    res.json(user.role)
  
  }
  catch(err){
      res.send('error'+err)
  }
})

        

module.exports = router;