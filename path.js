const path = require('path');

// const filePath=path.join(__dirname,'trial.js');

// console.log(filePath);

// console.log('File name:',path.basename(filePath));
// console.log('Directory:',path.dirname(filePath));
// console.log('Extension:',path.extname(filePath));
// console.log('Full Details:',path.parse(filePath));

// console.log(path.resolve('Node-js', 'file.txt'));

const url = require('url');

const myURL = 'https://example.com/product?name=book&price=200';

const parsedURL = url.parse(myURL, true); // true → parse query as object

console.log(parsedURL);


