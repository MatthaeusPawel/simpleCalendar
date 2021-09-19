const http = require('http');
const url = require('url');
const fs = require('fs');
const { hasUncaughtExceptionCaptureCallback } = require('process');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;



//const dateAna = require('dataAna');

const host = 'localhost';
const port = 8181;


const prepareData = (filename, data) => {
    let dom = new JSDOM(data, {url: "http://localhost:8181/",resources: 'usable'});

    //const $ = jQuery = require('jquery')(dom.window);

    //let cal = $('#myCalendar');
    //let currentClass;
    //for (let week = 0; week < 6 ; ++week)
        //for (let day = 0; day < 7 ; ++day){
            //if (day < 5) currentClass = "weekday"
            //else         currentClass = "weekend"

            //cal.append(`\t<div class= "daybox ${currentClass}" id='cal-${week},${day}'> ${week}${day} </div>\n`);
        //}
    
    return dom.serialize();
}

const requestListener = (req, res) => {

   let myURL;

   try { 
     const baseURL = `http://${req.headers.host}/`;
     myURL = new URL(req.url, baseURL);
   }
   catch (error){
    res.writeHead(500, {'Content-Type': 'text/html'});
    return res.end("50000 Invalid URL translation");
   }

    let filename = `.${myURL.pathname}`;
    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        data = prepareData(filename, data);
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.write(data);
        return res.end();
    })
};

const server = http.createServer(requestListener);
server.listen( port, host, () => {console.log('Server is running')});

