var express = require('express');
var router = express.Router();
var fs= require('fs');
var path=require('path');

var moeText = fs.readFileSync(path.join(__dirname, "moe.txt"), 'utf8');

/* GET home page. */
router.get('/', function(req, res, next)
{
  var ip = req.headers['forwardedfromip'] || req.connection.remoteAddress;

  res.render('index', { title: 'ip3.li - pure, simple, ip', ip: ip });
});

router.get('/api', function(req, res, next)
{
  var ip = req.headers['forwardedfromip'] || req.connection.remoteAddress;

  res.render('api', { title: 'api - pure, simple, ip', ip: ip, moeText: moeText });
});

module.exports = router;
