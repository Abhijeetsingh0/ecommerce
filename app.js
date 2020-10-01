const exppress = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const app = exppress();
require("dotenv").config();

//importing the routes 
const  authRoute = require("./routes/auth");
const  userRoute = require("./routes/user");
const  categoryRoute = require("./routes/category");
const  productRoute = require("./routes/product");
const  braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order")

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(() => console.log("Db connected !") );

//middleware 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


//routes middleware 
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api",categoryRoute);
app.use("/api",productRoute);
app.use("/api",braintreeRoutes);
app.use("/api",orderRoutes);



const port = process.env.PORT || 8000 

app.listen(port, () => {
    console.log(`App listening on port : ${port}`);
});


//semi-final