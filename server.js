/*
Example requests
 curl -H localhost:3000/api
 curl -H localhost:3000/api
 curl -H "Authorization: rithik" localhost:3000
 curl -H "Authorization: rithik" localhost:3000/api
*/

const express = require('express')
const morgan = require('morgan')
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios')

const app = express()
const PORT = 3000
const url = "https://jsonplaceholder.typicode.com/todos"

app.use(morgan('dev'))	

const options = {
	target:"http://localhost:3000",
	changeOrigin:true,
	pathRewrite: {
       [`^/api`]: '',
   },
}

const proxy = createProxyMiddleware(options)

// Authorization
app.use('', (req, res, next) => {
   if (req.headers.authorization) {
       next();
   } else {
       res.sendStatus(403);
   }
});

app.get('/',async(req,res)=>{
	const response = await axios.get(url)
	res.send(response.data)
})

app.get('/api',proxy)


app.listen(PORT,()=>{
	console.log(`Server has started on port ${PORT}`)
})
