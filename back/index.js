// 1. express
// 2. cors

const express = require ('express');
const cors = require ('cors')


require('dotenv').config();


const app = express();

app.use(cors());  //
app.use(express .json());
// 3. root 설정
app.get ('/', (request, response) => {
response.send('This is the main app for Deployment');
}) ;
// 4. listen 설정 
app.use(require('./Routes/getRoutes'))
app.use(require('./Routes/postRoutes'))
app.use(require('./Routes/updateRoutes'))
app.use(require('./Routes/deleteRoutes'))



app.listen(process.env.PORT, ()=> {
    console.log(`Server is Running on port ${process.env.PORT}`);
})



