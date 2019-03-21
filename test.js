// var Buffer = require('buffer').Buffer;
// var zlib = require('zlib');

// var input = new Buffer('lorem ipsum dolor sit amet');
// console.log(input);
// var compressed = zlib.deflate(input);
// console.log(compressed);
// var output = zlib.inflate(compressed);
// console.log(output);    
// var zlib = require('zlib');
// var str = new Buffer('lorem ipsum dolor sit amet', 'utf8')
// console.log(str);
// var zip = zlib.Deflate(str);
// console.log(zip);
// var packed = zip.toString(['utf-8']); // packed = "packedstringdata"
// console.log(packed);
// var unzipped = zlib.Inflate(zip); // unzipped = [object Object]
// console.log(unzipped);
// var newstr = unzipped.toString(['utf-8']); // newstr = "this is a test string to be zipped";
// console.log(newstr);

var zlib = require('zlib');
var input = "Whats Up ";

var deflated = zlib.deflateSync(input).toString('base64');

console.log(deflated);

var inflated = zlib.inflateSync(new Buffer(deflated, 'base64')).toString();

console.log(inflated);