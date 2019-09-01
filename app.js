const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

var mimeTypes = {
    '.html' : 'text/html',
    '.css' : 'text/css',
    '.js' : 'text/javascript',
    '.jpg' : 'image/jpg',
    '.png' : 'image/png',
    '.mp3' : 'audio/mpeg'
}

http.createServer(function(req,res){
    //var lookup = decodeURI(req.url);//←これだとクエリ「?」に対応できないからurl.parseに変更した
    var targetFile = __dirname + url.parse(req.url, true).pathname;
    fs.exists(targetFile, function(exists){
      if(exists){
        fs.readFile(targetFile,function(err,data){
          if(err){
            res.writeHead(500);
            res.end('Server Error !');
            return;
          }
          var headers = {'Content-Type': mimeTypes[path.extname(targetFile)]};
          res.writeHead(200,headers);
          res.end(data);
          //console.log(targetFile+'が開かれた.'+'mimeType:'+mimeTypes[path.extname(targetFile)]);
        });
        return;
      }
      res.writeHead(404);
      res.end('ページが見つかりません.');
    });
  }).listen(4000);
console.log('Server is moving');

