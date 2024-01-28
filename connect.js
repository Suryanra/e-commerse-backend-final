const mongoose = require('mongoose');

const password=process.env.PASSWORD;
const DB=`mongodb+srv://suryanra:${password}@cluster0.frb7iyz.mongodb.net/?retryWrites=true&w=majority`
const Schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  termconditions: { type: Boolean, required: true },
  streetAddress: { type: String },
  country:{ type:String },
  pincode:Number,
  password:String
});

const model=mongoose.model('users',Schema);
async function connect()
{      await mongoose.connect(DB,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  console.log('mongo db conneced Connected!');
}


module.exports={model,connect};

