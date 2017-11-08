var phantom=require('node-phantom');
var express = require('express');
var port = process.env.PORT || 3000;  
var app = express();

app.get('/', function (req, res) {

phantom.create(function(err,ph) {
  return ph.createPage(function(err,page) {
    return page.open("http://tilomitra.com/repository/screenscrape/ajax.html", function(err,status) {
      res.write("opened site? ", status);
      page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
        //jQuery Loaded. 
        //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds. 
        setTimeout(function() {
          return page.evaluate(function() {
            //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object. 
            var h2Arr = [],
            pArr = [];
            $('h2').each(function() {
              h2Arr.push($(this).html());
            });
            $('p').each(function() {
              pArr.push($(this).html());
            });
 
            return {
              h2: h2Arr,
              p: pArr
            };
          }, function(err,result) {
            res.write(result);
            ph.exit();
          });
        }, 5000);
      });
    });
  });
});

});


app.listen(port, function () {
 console.log("ligado");
});