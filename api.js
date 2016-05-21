module.exports = function(req, res, next)
{
    //get the user agent and path components
    var useragent = req.headers['user-agent'].toLowerCase();
    var pathComponents = req.path.split('/');
    var ip = req.connection.remoteAddress;

    //trim and lowercase pathComponents[1]
    if(pathComponents[1])
    {
        var apiPathRoute = pathComponents[1].trim().toLowerCase();
    }

    /**
     * The RAW route
     */
    if(!req.path || apiPathRoute=='' || apiPathRoute=='raw')
    {
        //attempt to match the user-agent with a browser (unless it's raw, in which case go straight for the raw option)
        if(
            apiPathRoute!='raw' && (
            useragent.indexOf("Mozilla")!=-1 ||
            useragent.indexOf("Gecko")!=-1 ||
            useragent.indexOf("AppleWebKit")!=-1 ||
			useragent.indexOf("Google-HTTP-Java-Client")!=-1 ||
			useragent.indexOf("Dorado WAP-Browser")!=-1 ||
			useragent.indexOf("Opera")!=-1 ||
			useragent.indexOf("Crowsnest")!=-1 ||
			useragent.indexOf("Traackr.com")!=-1 ||
			useragent.indexOf("Googlebot")!=-1 ||
			useragent.indexOf("ShowyouBot")!=-1 ||
            useragent.indexOf("Twitterbot")!=-1
        ))
        {
            return next();
        }
        else
        {
            res.statusCode=200;
            return res.end(ip);
        }
    }

    /**
     * The JSON route
     */
    else if(apiPathRoute=='json')
    {
        res.statusCode=200;
        return res.end(JSON.stringify({ip:ip}));
    }

    /**
     * The JSONP route
     */
    else if(apiPathRoute=='jsonp')
    {
        var callbackName = pathComponents[2] || 'callback';
        res.statusCode=200;
        return res.end(callbackName + "(" + JSON.stringify({ip:ip}) + ");");
    }

    /**
     * The XML route
     */
    else if(apiPathRoute=='xml')
    {
        res.statusCode=200;
        return res.end("<ip>" + ip + "</ip>");
    }

    /**
     * The QR route
     */
    else if(apiPathRoute=='qr')
    {
        var qr = require('qr-image');
        var qr_svg = qr.image(ip, { type: 'png' });
        res.writeHead(200,  { 'Content-Type': 'image/png', 'Connection': 'close'});
        qr_svg.pipe(res);

        return;
    }

    /**
     * The everything else route
     */
    else
    {
        next();
    }

};