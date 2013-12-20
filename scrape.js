// dependencies
var csv = require('csv');
var fs = require('fs');
var request=require("request");
var cheerio=require("cheerio");
var writeStream = fs.createWriteStream("file.csv");

url = "http://www.analystratings.net/ratings/USA/12-18-2013/"

// write headers to csv
writeStream.write('Firm,' + 'Action'+'Company,'+'Ranking,'+'Price Ranking' + '\n');

// perfrom request
request(url, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    // console.log(html)
    // pass DOM to cheerio
    var $ = cheerio.load(html);
    $("#ratingstable tbody tr").each(function(i,el){
      var getByIndex = $(this).children();
      var firm = getByIndex.eq(0).text();
      var action = getByIndex.eq(1).text();
      var company = getByIndex.eq(2).text();
      var ranking = getByIndex.eq(3).text();
      var priceRanking = getByIndex.eq(4).text();

      // write data to csv
      writeStream.write(firm+ ',' + action +','+company+','+ranking+','+priceRanking+'\n');
      
    });
    console.log("\nDONE!\n")
  }
});
