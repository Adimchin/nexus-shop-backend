import express from "express"
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoutes.js";
import dashBoardRouter from "./routes/dashboardRoute.js";

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/dashboard', dashBoardRouter);

const server = app.listen(5001, () => {
  console.log('listening on port 5001')
});