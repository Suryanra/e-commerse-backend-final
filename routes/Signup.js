const {model,connect}=require('../connect');
const bcrypt = require('bcrypt');
const signup = async(req,resp) =>{
      console.log("hi");
      console.log(req.body);
      const {emailAddress}=req.body;
     const arr=await  model.findOne({emailAddress:emailAddress});
     console.log(arr);
     if(arr && arr.length !==0)
     {
      resp.send({'message':"user already present"});
}
      else
{
      const {password:userpassword}=req.body;
      bcrypt.hash( userpassword  ,8, async function(err, hashedPassword) {
      if(!err){
            const newUser = new model({
                  ...req.body,
                  password: hashedPassword,
            });
      
      await newUser.save();
      resp.send({'message':"account created successfully !!"})}
      else {
            resp.send({"message":"server error try again"});
            
      }
      });
}


};

exports.signup = signup;
