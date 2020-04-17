const express = require("express")
const app = express()

app.use(require('cors')())//跨域请求
app.use(express.json())//在路由器中使用body


require('./plugins/db')(app)
require('./routes/admin')(app)



app.listen(3000,() => {
    console.log("服务启动，点击 http://localhost:3000 访问")
})