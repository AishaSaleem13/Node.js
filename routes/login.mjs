import express from 'express'
import Users from '../models/user.mjs'
import verifyToken from '../middleware/varifytoken.mjs'

const router=express.Router()

router.get('/',async(req,res)=>{
    const users=await Users.find()
    res.send({message:'Data Fetched Successfully',Data:users})
})

router.post('/register',async(req,res)=>{
    try{
    const user=new Users(req.body)
    await user.save()
    res.send({ message: "User registered successfully!" })
    }
    catch(e){
        res.send({message:`registering error`,
         error: e.message})
    }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User Not Found' });
    }

    // password check
    const isCorrect = await user.comparePassword(password); 
    if (!isCorrect) {
      return res.status(400).send({ message: 'Invalid Password' });
    }

    // token generate
    const token = user.generateToken();
    user.tokens.push(token);
    await user.save();

    res.send({ message: 'User logged in successfully!', token });
  } catch (e) {
    console.error("Login error:", e); // 👈 console me exact error dikhega
    res.status(500).send({ message:`error in generating token `,
       error:e.message });
  }
});


router.put('/logout',verifyToken,async(req,res)=>{
    await Users.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } })
    res.send({message:'Logged Out Successfully'})
})

export default router


