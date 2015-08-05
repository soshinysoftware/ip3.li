var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ip3.li - pure, simple, my ip', ip: req.connection.remoteAddress });
  console.log(req.socket);
});

module.exports = router;
