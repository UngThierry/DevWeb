const http = require('http');
const port = 8080;

const serv = http.createServer((req,res) => {
    // option 1
    res.end('Hello, world');

    //autre alternative
    res.write('Hello world');
    res.end();
});

serv.listen(port ,() =>{
    console.log('Server listen on http://localhost:%s',port);
});