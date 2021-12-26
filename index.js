var http = require('http');
var unirest = require('unirest');
var random_useragent = require('random-useragent');
const isUrl = require("is-valid-http-url");

http.createServer(function (req, res) {
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "cache-control": "public, max-age=300",
        "content-type": "text/plain"
    });
    //console.log(req.headers.referer)
    if(req.url.length<=500){
        if (req.url.split("/?url=")[1] == undefined == false && isUrl(req.url.split("/?url=")[1]) == true && req.method === "GET") {
            unirest('GET', req.url.split("/?url=")[1])
            .headers({
                'user-agent': random_useragent.getRandom()
            })
            .end(function (resku) {
                res.end(resku.raw_body);
            });
        } else {
            res.end("error!, Example: https://corsdimanaaja.herokuapp.com/?url=https://www.github.com \n contact : https://www.github.com/fdciabdul")
        };
    }else{
      res.end("error!, Example: https://corsdimanaaja.herokuapp.com/?url=https://www.github.com \n contact : https://www.github.com/fdciabdul")
    };
}).listen(process.env.PORT);