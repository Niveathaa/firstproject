var formidable = require('formidable');
var http = require('http');

var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {                                   //"files.filetoupload.name" retrieves the name of uploaded file
    var form = new formidable.IncomingForm();                       //"files.filetoupload.path" retrieves the path of uploaded file
    form.parse(req, function (err, fields, files) {                //files will store the form,filetoupload is the name in the html form
      var oldpath = files.filetoupload.path;                       //old path= c:\users\nivea\desktop\fileupload
      var newpath = __dirname + '/' + files.filetoupload.name;     //new path:c:\users\nivea\desktop\fileupload\me.jpg

      fs.rename(oldpath, newpath, function (err) {
        if (err) {
          console.log(err); // Log the error to the console
          res.write('An error occurred while uploading the file.');
        } else {
          res.write('File uploaded and moved!');
        }
        res.end();
      });
      
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8083);