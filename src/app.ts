import "reflect-metadata"
import "express-async-errors"
import express from "express"
import userRouter from "./routes/user.routes"
import loginRouter from "./routes/login.routes"
import globalErrorMiddleware from "./middlewares/globalError.middleware"
import categoryRouter from "./routes/category.routes"
import propertyRouter from "./routes/property.routes"
import scheduleRouter from "./routes/schedule.routes"

const app = express()
app.use(express.json())

app.use('/users', userRouter)
app.use('/login', loginRouter)
app.use('/categories', categoryRouter)
app.use('/properties', propertyRouter)
app.use('/schedules', scheduleRouter)

app.use(globalErrorMiddleware)


export default app