var jwt = require('jsonwebtoken');

const Auth = (req,resp,next) => {
const token=req.cookies['test']
console.log(token);
if(token){
jwt.verify(token,
      'shhhhh', 
      async function (err, Authdata) {
          if (err) {
            console.error('Error signing JWT:', err);
            req.user=null;
          //   resp.status(500).send({ error: 'Internal Server Error' });
        } else {
            console.log(Authdata);
            req.user=Authdata;
        }
})}
else {
  req.user=null;
}
      next();
}

exports.Auth=Auth;
