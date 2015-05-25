/**
 * Created by Ievgen on 22.05.2015.
 */
var Spidy = function () {

    var fs = require('fs'),
        dest = 'templates/',
        cheerio = require('cheerio'),
        subModules = [],
        layouts = [];

    this.readDirectory = function () {
        fs.readdir(dest, this.readFiles);
    };

    this.readFiles = function (err, files) {
        (err)? this.showError(err) : this.readFile(files);
    }.bind(this);

    this.readFile = function(files){
        files.forEach(function (file) {
            fs.readFile(dest+file, this.getBuferData);
        }.bind(this));
    };

    this.showError = function(err){
        console.log(err);
    };

    this.getBuferData = function(err, data){
        (err)? this.showError(err) : this.parseData(data.toString('utf-8'));
    }.bind(this);

    this.parseData = function(data){
            var $ = cheerio.load(data);
            for( var i =0; i <= $('.fn-nav-btn').length-1; i++ ){
                var dataObj = $($('.fn-nav-btn')[i]).data('nav');
                if(subModules.indexOf(dataObj) === -1){
                    subModules.push(dataObj);
                }
            }
        console.log(subModules);
    };
};


var spidy = new Spidy();

spidy.readDirectory();