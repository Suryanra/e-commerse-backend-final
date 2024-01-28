const express=require('express')
require('dotenv').config()
const port=process.env.PORT||5001;
const app=express();
var cors = require('cors')
const cookieParser = require('cookie-parser');
const SignUp = require('./routes/Signup');
const Login = require('./routes/Login')
const Auth = require('./routes/Auth')
const Edit = require('./routes/Edit')
// const signup=require('./routes/Signup')
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(express.json());


const {model,connect}=require('./connect')
connect();

app.post("/signup", SignUp.signup);
app.post('/login',Login.login);
app.put('/myaccount',Auth.Auth,Edit.Edit);
app.get('/logout',(req,resp)=>{
      resp.cookie('test', '', {
            expires: new Date(0)
      });
      resp.send({'message':"your are logout"})
});



app.get('/auth/userinformation',Auth.Auth,(req,resp)=>{
      if(!req.user) {
            resp.send({"message":"false"})
      }
      resp.send(req.user);
      console.log("user data ",req.user)
})



app.get('/get', (req, resp) => {
      console.log("cookie fetching ",req.cookies.test);
      resp.send({ data: req.cookies.test });
  });
app.get('/set',(req,resp)=>{
      resp.cookie('test',"this is suryeea");
      resp.send({"message":"cokkie set"})
})

app.listen(port,(err)=>{
      if(!err)
      console.log("backend server started at " ,port);
})