## 青少年

#### LandingPage / Javascript / TrackingCode.js

> 百度DSP

```javascript
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?5345ab1def2f45ed40789a446f7aa5ca";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
```

> 晶赞流量

```javascript
(function(param) {
    var c = {
        query: [],
        args: param || {}
    };
    c.query.push(["_setAccount", "454"]);
    (window.__zpSMConfig = window.__zpSMConfig || []).push(c);
    var zp = document.createElement("script");
    zp.type = "text/javascript";
    zp.async = true;
    zp.src = ("https:" == document.location.protocol ? "https:" : "http:") + "//cdn.zampda.net/s.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(zp, s);
})(window.__zp_tag_params);
```

> 品友 DSP

```javascript
var _py = _py || [];
_py.push(['a', 'uc.HG.Q5q29A5dFaAYpZIQaK1grP']);
_py.push(['domain', 'stats.ipinyou.com']);
_py.push(['e', '']);
-function(d) {
    var s = d.createElement('script')
      , e = d.body.getElementsByTagName('script')[0];
    e.parentNode.insertBefore(s, e),
    f = 'https:' == location.protocol;
    s.src = (f ? 'https' : 'http') + '://' + (f ? 'fm.ipinyou.com' : 'fm.p0y.cn') + '/j/adv.js';
}(document);
```

> 百度统计

```javascript
require("/LandingPage/JavaScript/baiduStatisticsCode.js");
```

> 新数位DSP

```javascript
if (getUrlParm("fromwhere") == "StiuB6jYPF") {
    require("/LandingPage/JavaScript/DSPTarckForLandingPage.js");
}
```

> 秒针代码

```javascript
var fromwhere = getUrlParm("fromwhere");
if (fromwhere == "TiepFwfEnm" || fromwhere == "TSSpSbm0hG" || fromwhere == "t6QG7scGe0" || fromwhere == "hA7zLn9v9W" || fromwhere == "ZOxdmkpClZ" || fromwhere == "dzMIOOch5s") {
    (function() {
        window._CiQ10266 = window._CiQ10266 || [];
        window._CiQ10266.push(['_cookieUseRootDomain', true]);
        var c = document.createElement('script');
        c.type = 'text/javascript';
        c.async = true;
        c.charset = 'utf-8';
        c.src = '//collect.cn.miaozhen.com/ca/10266';
        var h = document.getElementsByTagName('script')[0];
        h.parentNode.insertBefore(c, h);
    })();
    document.writeln("<noscript>");
    document.writeln("<link href='//collect.cn.miaozhen.com/refer/collect?i=10266&v=13922245942&pu=http%3A//%28NoScriptPageviews%29&pt=NoScriptPageviews&ru=http%3A//%28NoScriptClients%29&csh=1000&csw=1000&css=10' rel='stylesheet' type='text/css' />");
    document.writeln("</noscript>");
}
```

> 国双代码

```javascript
(function() {
    document.writeln("<div id='utm_source' style = 'display:none'>baidu</div>");
    document.writeln("<div id='utm_campaign' style = 'display:none'>05_在线系列-浙江</div>");
    document.writeln("<div id='utm_adgroup' style = 'display:none'>在线小学英语</div>");
    document.writeln("<div id='utm_term' style = 'display:none'>小学英语在线学习</div>");
    document.writeln("<div id='utm_medium' style = 'display:none'>search_cpc</div>");
    document.writeln("<div id='utm_channel' style = 'display:none'>D</div>");
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.onload = function() {
        if (typeof trackForm == 'function') {
            trackForm();
        }
    }
    s.src = (location.protocol == "https:" ? "https://ssl." : "http://static.") + "gridsumdissector.com/js/Clients/GWD-002255-E116CE/gs.js?f=footer_lk";
    var firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(s, firstScript);
    window.hasLoadedGs_Js = true;
    //标记gs.js已经开始加载了
})();
```

> Google分析代码

```javascript
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }
    ,
    i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-46520037-2', 'auto');
ga('send', 'pageview');
```

> ADMaster代码

*___smq__*

```javascript
function TrackingLoadJSFile_Async(content, fileSrc) {
    var s = content.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = fileSrc;
    var firstScript = content.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(s, firstScript);
}
function TrackingLoadJSFile_Sync(content, fileSrc) {
    var _src = fileSrc.replace(/\?/, "%3F")
    content.write(unescape("%3Cscript src='" + _src + "' type='text/javascript'%3E%3C/script%3E"));
}
(function() {
    try {
        var _siteProtocol = (location.protocol == 'https:' ? 'https://' : 'http://');
        //InvokeJSFile( document, _siteProtocol + "www.gridsumdissector.com/js/Clients/GWD-002255-E116CE/gs.js" );
        //TrackingLoadJSFile_Async( document, "/lib/javascript/sougou_analytics.js" );
        TrackingLoadJSFile_Async(document, "/lib/javascript/landingpage_google_analytics.js");
        TrackingLoadJSFile_Async(document, "/lib/javascript/ADMaster.js");
        TrackingLoadJSFile_Sync(document, "/lib/javascript/sougou_analytics.js");
        TrackingLoadJSFile_Async(document, "/lib/javascript/baidu_analytics.js");
    } catch (e) {
        console.log(e);
    }
})();
```

> Media V

```javascript
var _mvq = window._mvq || [];
window._mvq = _mvq;
_mvq.push(['$setAccount', 'm-132257-0']);
_mvq.push(['$logConversion']);
(function() {
    var mvl = document.createElement('script');
    mvl.type = 'text/javascript';
    mvl.async = true;
    mvl.src = ('https:' == document.location.protocol ? 'https://cdn.dsp.com/static/js/loader.js' : 'http://cdn.dsp.com/static/js/loader.js');
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(mvl, s);
})();
```

> xAd检测代码

```javascript
require("http://7xi67m.com2.z0.glb.qiniucdn.com/js/xadTracking.js");
```

#### lib / javascript

> ADMaster.js

> baidu_analytics.js

> landingpage_google_analytics.js

> sougou_analytics.js

## 成人:

#### FreeStudyFirstMonth / jquery.vipabc.UI.js

> ADMaster 监测代码

#### FreeStudyFirstMonth / vipabc.formSubmit.js

> Xad 监测代码

> 国双监测代码

> 国双LiuYiRan监测代码

#### javascript / common.config.js
  
> DSP Tracking behe

#### count.asp

> 百度

> 搜狗

#### index.html

Chrome控制台source代码，来源不明，可能来自多个include下的asp页面代码，比如include_footer.asp等等。

> 爱点击代码

> xAd检测代码

> 百度DSP

> 晶赞

> DSP新

> 国双

> Media V

> 脉脉LP

#### include_footer.asp

> 百度DSP

> 搜狗追踪代码

> Google追踪代码

> 爱点击代码

> xAd检测代码

> ADO检测代码

> 有道CPA媒体

> 晶赞

> DSP新

> 国双检测代码

> Media V检测代码

> 脉脉LP回调

#### index_exe_api.asp

> 好耶DSP投放