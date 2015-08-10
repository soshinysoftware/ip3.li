var express = require('express');
var router = express.Router();
var fs= require('fs');
var path=require('path');

var moeText = fs.readFileSync(path.join(__dirname, "moe.txt"), 'utf8');

/* GET home page. */
router.get('/', function(req, res, next)
{
  res.render('index', { title: 'ip3.li - pure, simple, ip', ip: req.connection.remoteAddress });
});

router.get('/api', function(req, res, next)
{
  res.render('api', { title: 'api - pure, simple, ip', ip: req.connection.remoteAddress, moeText: moeText });
});

module.exports = router;
