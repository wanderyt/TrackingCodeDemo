/**
 * vipabc.formCheck.js
 */

//国双表单填写详情function
function trackForm() {
  $('.linkagePage-form').each(function() {
    if (window._gsTracker) {

      $('input', this).each(function() {
        $(this).on('blur', function() {
          //默认获取input的name属性来进行记录，可根据实际表单情况来进行调整
          flow = flow + '->' + $(this).attr('data-track');
          //期待值：每次表单失去焦点时将打印出更新后的填写顺序，例如首先填写完姓名时，将打印'->name',再填写完手机号时，将打印'->name->phone'
          //console.log(flow)
        });
        if ($(this).attr('data-track') == 'tk-sex') {
          $(this).on('click', function() {
            //获取input的value属性来进行记录，可根据实际表单情况来进行调整
            var Sex = $('.radio_wrap.radio_on_wrap label input').val()
            switch (Sex) {
              case '1':
                _Sex = "男";
                break;
              case '2':
                _Sex = "女";
                break;
              default:
                _productList = "男"
                break;
            }
            flow = flow + '->' + _Sex;
            //console.log(flow)

          });
        }
      });
      _gsUtility.observe(window, "beforeunload", function() {
        flow = flow + '->END';
        _gsTracker.trackEvent('flow', flow);
        //期待值：用户离开页面时的表单填写情况，如：若用户仅填写完手机号时就离开了页面，则打印'->phone->END'
        //console.log(flow)
      });
      //$('.select_list dl dd').on('click', function (){
      //                   var AgeRange=$('.select_current').html();   
      // flow = flow + '->' + AgeRange;


      //});
    }
  });
}

// flow:
// ->tk-tel->tk-name->女->tk-tel->tk-email->7-9岁->tk-email->tk-tel->END

var gs_func = function() {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.onload = function() {
    trackForm();
  }

  s.src = (location.protocol == 'https:' ? 'https://ssl.' : 'http://static.') + 'gridsumdissector.com/js/Clients/GWD-002255-E116CE/gs.js?f=check';
  var firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(s, firstScript);
}

$(function() {
  //需要区分的原因是：成人的LP大多已经加载gs.js，JR LP大多没加载gs.js，但基本都引用了当前js文件       
  if (typeof window.hasLoadedGs_Js == 'undefined' || window.hasLoadedGs_Js != true) { //gs.js未加载
    gs_func();
  }
});

//===============================================================================

/**
 * vipabc.UI.form.js
 */

//for PC
$list_li.each(function(_index) {

  $(this).on("click", function(e) {
    e.stopPropagation();
    var li_index = _index;
    var $parent = $(this).parents(".select_wrap");
    var $current = $parent.find(".select_current");
    var $list = $parent.find(".select_list");
    var $btn = $parent.find(".select_btn");

    $current.text($(this).text()).css("border", "");
    $(this).addClass("selected").siblings().removeClass("selected");

    $list.removeAttr("style");
    $btn.removeClass("select_btn_on");

    $parent.find("select").get(0).selectedIndex = li_index + 1;
    //console.log($parent.find("select").get(0).selectedIndex);

    $parent.find(".msg-box").empty();

    //console.log($(this).text());    
    if ($(this).text() != cd_Value) {
      $current.css("color", "#000");
      $parent.css("border-color", "#6ac451");
    } else {
      $current.removeAttr("style");
      $parent.css("border-color", "#f65662");
    }
    var AgeRange = $(this).text();
    flow = flow + '->' + AgeRange;
  });
});

// for mobile
if (navigator.userAgent.match(/mobile/i)) {

  //$("p").show();
  $list_li.unbind("click").hide();
  $cur_btn.unbind("click");
  $parent.find("select").show().animate({
    "opacity": 0,
    "z-index": 300
  }).change(function() {
    var sel_val = $(this).find("option:selected").text();
    $current.text(sel_val);

    if (sel_val != cd_Value) {
      $current.css("color", "#000");
      $parent.css("border-color", "#6ac451");
    } else {
      $current.removeAttr("style");
      $parent.css("border-color", "#f65662");
    }
    var AgeRange = sel_val;
    flow = flow + '->' + AgeRange;
  });
}

// ================================================================================

/**
 * vipabc.formSubmit.js
 */
var linkagePage_submit = function(object) {

  if (!validateForm(object)) {
    return false;
  }

  if (!linkPage_preCheck()) {
    return false;
  }

  //Loading Animate
  loadingDiv(object);

  //get name
  var str_name = $.trim(object.find("input[data-type=name]").val());

  //get telephone
  var str_cphone = $.trim(object.find("input[data-type=tel]").val());

  //get email
  var str_mail = $.trim(object.find("input[data-type=email]").val()).toLowerCase();

  //get age
  var str_age_area = object.find("select").val();

  //get sex
  var str_sex = "";
  object.find("input[type=radio]").each(function(index, item) {
    if (item.checked) {
      str_sex = item.value;
    }
  });

  //VIPABC Adult User
  var str_jr = "0";

  //Distinguish VJR with VIPABC for CTI Call Center
  if (str_age_area == 8 || (str_age_area >= 20 && str_age_area <= 31 && str_age_area != 24)) {
    str_jr = "1";
    //VJR User
  }

  //get formwhere
  var str_where = getQueryString("fromwhere");

  //get brand
  var str_brand = "";
  var $Brand = $("#forceAgeBranding");
  if ($Brand != "undefined") {
    //str_brand = $Brand.val();
  }

  // _mvq - MediaV
  if (typeof _mvq == 'undefined' || !_mvq || _mvq == null) {
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
  }

  var postData = {
    "name": str_name,
    "cphone": str_cphone,
    "mail": str_mail,
    "age_area": str_age_area,
    "sex": str_sex,
    "fromwhere": str_where,
    "jr": str_jr,
    "forceAgeBranding": (getWhetherDecideBrandByAge(str_brand) || 0)
  };
  utmObj = getUTMData();
  if (utmObj) {
    for (var utm in utmObj) {
      if (utmObj[utm] != "") {
        try {
          postData[utm] = decodeURIComponent(escape(utmObj[utm]));
        } catch (err) {
          postData[utm] = "";
        }
      }
    }
  }

  //Xad 20160328
  if (typeof(_xadTracking) != 'undefined' && _xadTracking != null) {
    _xadTracking.track('startReg');
  }

  /**
   * [这里添加锁，object是传入的form，在form节点，判断其是否加锁，可以过滤重复提交]
   * [在object节点使用自定义属性v-ajax-lock, 来做锁判断]
   * @param {[Object]} [lockDom] [－>object]
   * @author [harrytang@ipabc.com]
   * @date [2016-06-12]
   */
  var lockDom = object;
  if (lockDom.attr("v-ajax-lock") == "locked") {
    return false;
  }
  lockDom.attr("v-ajax-lock", "locked");

  $.ajax({
    type: "GET",
    cache: false,
    dataType: 'jsonp',
    url: index_exe_api_url,
    data: postData,
    success: function(status) {

      //! 当ajax返回结果，就释放锁
      //! harrytang@vipabc.com
      lockDom.attr("v-ajax-lock", "opened");

      var _mvqq = window._mvq || [];
      window._mvq = _mvqq;
      //_mvqq.push(['$setAccount', 'm-132257-0']);

      //_mvqq.push(['$setGeneral', 'ordercreate', '', /*用户名*/ '', /*用户id*/ '']);
      //_mvqq.push(['$logConversion']);
      //_mvqq.push(['$addOrder',/*订单号*/ '', /*订单金额*/ '']);

      //_mvqq.push(['$logData']);

      _mvqq.push(['$setAccount', 'm-132257-0']);
      _mvqq.push(['$setGeneral', 'ordercreate', '', /*用户名*/ '', /*用户id*/ Math.floor(Math.random() * 10000 + 1)]);
      _mvqq.push(['$logConversion']);
      _mvqq.push(['$addOrder', /*订单号*/ status.JSUUID, /*订单金额*/ '']);
      _mvqq.push(['$logData']);

      //DSP新订单回传代码20151229  

      var productList = $('.select_current').html();

      switch (productList) {
        case '26~35岁':
          _productList = ">=26";
          break;
        case '36~45岁':
          _productList = ">=26";
          break;
        case '46~55岁':
          _productList = ">=26";
          break;
        case '56岁以上':
          _productList = ">=26";
          break;
        default:
          _productList = "<26"
          break;
      }

      var w = window,
        d = document,
        e = encodeURIComponent;
      var b = location.href,
        c = d.referrer,
        f, g = d.cookie,
        h = g.match(/(^|;)\s*ipycookie=([^;]*)/),
        i = g.match(/(^|;)\s*ipysession=([^;]*)/);
      if (w.parent != w) {
        f = b;
        b = c;
        c = f;
      };
      u = '//stats.ipinyou.com/cvt?a=' + e('uc.Ods.zELX2ZwzUiOZG4tMT0LGT0') + '&c=' + e(h ? h[2] : '') + '&s=' + e(i ? i[2].match(/jump\%3D(\d+)/)[1] : '') + '&u=' + e(b) + '&r=' + e(c) + '&rd=' + (new Date()).getTime() + '&OrderNo=' + e(status.JSUUID) + '&ProductList=' + e(_productList) + '&e=';
      (new Image()).src = u;

      //Xad 20160328
      if (typeof(_xadTracking) != 'undefined' && _xadTracking != null) {
        _xadTracking.track('successReg');
      }

      if (typeof window._gsTracker != 'undefined') {
        //--国双公共监测代码 start--
        if (window._gsTracker) {
          _gsTracker.setCustomProperty('1', 'formSubmitted')
          _gsTracker.track('/targetpage/submitOk/user/' + location.pathname)

        }
        //--国双公共监测代码 end--

        //--国双LiuYiRan监测代码 start--

        if (/landingpage\/LiuYiRan/.test(location.href)) {
          if (window._gsTracker) {
            var JSID = status.JSUUID;
            _gsTracker.setCustomProperty('1', 'formSubmitted')
            _gsTracker.track('/targetpage/submitOk/user/' + JSID + location.pathname)
            _gsTracker.addOrder("JSID", 1);
            _gsTracker.addProduct("JSID ", "submitOk", "submitOk", 1, 1, location.pathname);
            _gsTracker.trackECom();

          }
        }
        //--国双LiuYiRan监测代码 end--
      }

      //调用脉脉回调接口进行打点
      maiMaiCallBackAPI();

      // Clear error message
      clearErrorMessage(object);
      linkPage_callBack(str_jr, status.LeadSn, status.JSUUID);
    },
    error: function(e) {
      //! 当ajax返回结果，就释放锁
      //! harrytang@vipabc.com
      lockDom.attr("v-ajax-lock", "opened");
      alert("亲！服务器出错了哦，重新试一下吧！")
    }
  });

  return false;
}

var LpNameOfDecideBrandByAge = [
  "/TheGreatWallofChina/", "/TheGreatWallofChina2/", "/TheGreatWallofChina3/", "/High_End/", "/AcceleratedCourse/", "/MobileYaoMingTop/", "/freeStudyFirstMonth/"
];

function getWhetherDecideBrandByAge(defaultVal) {
  var res = defaultVal;
  var len = LpNameOfDecideBrandByAge.length;
  for (var i = 0; i < len; i++) {
    var reg = new RegExp(LpNameOfDecideBrandByAge[i])
    if (reg.test(location.href)) {
      res = 1;
      break;
    }
  };
  return res;
}

//Form submit button click event
$linkagePageForm.each(function(index, element) {
  var $this = $(this);
  $linkagePageForm.eq(index).attr("data-form", index);

  //Sign In submit
  $this.find(".form-submit").click(function(e) {
    linkagePage_submit($this);
  });
});


//make sure which form you have focused
$linkagePageForm.find("input").focus(function(index) {
  whichForm = $(this).closest("form").attr("data-form");
  //console.log(whichForm);
});



//keyword Enter submit
$(document).keydown(function(e) {
  if (e.keyCode == 13) {
    linkagePage_submit($linkagePageForm.eq(whichForm));
  }
});

// ==============================================================

/**
 * baidu_analytics.js
 */
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?574ffced4eb7a8fd0b6b6fe1876d7f21";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

// ==============================================================

/**
 * landingpage_google_analytics.js
 * @param  {[type]} i [description]
 * @param  {[type]} s [description]
 * @param  {[type]} o [description]
 * @param  {[type]} g [description]
 * @param  {[type]} r [description]
 * @param  {[type]} a [description]
 * @param  {[type]} m [description]
 */
(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-42684849-1', 'vipabc.com');
ga('send', 'pageview');

// ==============================================================

/**
 * sougou_analytics.js
 */
document.writeln("<script  type=\"text/javascript\">");
document.writeln("  var _sogou_sa_q = _sogou_sa_q || [];");
document.writeln("  _sogou_sa_q.push([\'_sid\', \'87011-89433\']);");
document.writeln(" (function() {");
document.writeln("    var _sogou_sa_protocol = ((\"https:\" == document.location.protocol) ? \"https://\" : \"http://\");");
document.writeln("    var _sogou_sa_src=_sogou_sa_protocol+\"hermes.sogou.com/sa.js%3Fsid%3D87011-89433\";");
document.writeln("    document.write(unescape(\"%3Cscript src=\'\" + _sogou_sa_src + \"\' type=\'text/javascript\'%3E%3C/script%3E\"));");
document.writeln("    })();");
document.writeln("</script>");

// ==============================================================

/**
 * ADMaster.js
 */
var _smq = _smq || [];
_smq.push(['_setAccount', '4d3dfab', new Date()]);
_smq.push(['pageview']);

(function() {
  var sm = document.createElement('script');
  sm.type = 'text/javascript';
  sm.async = true;
  sm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdnmaster.com/sitemaster/collect.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(sm, s);
})();

function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

function FormSubmitAdmasterData(uuid, num) {
  var info = 'submitform';
  if (num == 1) {
    info = 'submitform1';
  }

  if (num == 2) {
    info = 'submitform2';
  }

  try {
    _smq.push(['custom', window.location.href.substring(window.location.href.lastIndexOf('linkage_page/') + 13, window.location.href.indexOf('/index.asp')).toLowerCase(), info, uuid]);
  } catch (err) {}

}

// ==============================================================

/**
 * xadTracking.js
 */
!(function() {
  function getQuery(query) {
    query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var expr = "[\\?&]" + query + "=([^&#]*)";
    var regex = new RegExp(expr);
    var results = regex.exec(window.location.href);
    if (results !== null) {
      return decodeURIComponent(results[1].replace(/\+/g, " "));
    } else {
      return '';
    }
  }

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  window._xadTracking = {
    paraFromUrl: '',
    paraFromCookie: '',
    track: function(action, callback) {
      var cb = arguments[1] ? arguments[1] : '';

      var xt = document.createElement("script");
      xt.src = 'http://ec2-54-223-148-200.cn-north-1.compute.amazonaws.com.cn:8889/track?paraFromUrl=' + this.paraFromUrl + '&paraFromCookie=' + this.paraFromCookie + '&action=' + action + '&callback=' + cb;
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(xt, s);
    }
  };

  _xadTracking.paraFromUrl = getQuery('xadPara');
  _xadTracking.paraFromCookie = getCookie('xadPara');
  if (!_xadTracking.paraFromCookie) {
    setCookie('xadPara', _xadTracking.paraFromUrl, 3);
  }

})();

// ==============================================================

/**
 * track.js
 */
/**
 * Date: 2015-06-03 19:16 
 */
var _gaq = _gaq || [];
! function(a) {
  function b(a) {
    var b = a;
    b = b.replace(/^[?#]{1}/g, "").split("&");
    for (var c = {}, d = 0, e = b.length; e > d; d++) {
      var f = b[d].split("=");
      c[f[0]] = f[1]
    }
    return c
  }
  var c = a.yd || (a.yd = {}),
    d = window,
    e = document,
    f = location,
    g = e.body,
    h = d._ydt,
    i = "UA-61370810-1",
    j = !0,
    k = f.host,
    l = f.pathname;
  if (!c.track) {
    var m = b(f.search);
    m.vendor ? _gaq.push(["_setCampSourceKey", "vendor"]) : m.keyfrom && _gaq.push(["_setCampSourceKey", "keyfrom"]), _gaq.push(["_setAccount", i], ["_setLocalGifPath", "http://wr.da.netease.com/" + i + "/__utm.gif"], ["_setLocalRemoteServerMode"]), _gaq.push(["_addOrganic", "baidu", "word"]), _gaq.push(["_addOrganic", "soso", "w"]), _gaq.push(["_addOrganic", "youdao", "q"]), _gaq.push(["_addOrganic", "sogou", "query"]), _gaq.push(["_addOrganic", "so.360.cn", "q"]), _gaq.push(["_setDomainName", "youdao.com"]), _gaq.push(["_setCustomVar", 1, document.URL, 3]);
    var n = document.createElement("script");
    n.type = "text/javascript", n.async = !0, n.src = "http://wr.da.netease.com/ga.js";
    var o = document.getElementsByTagName("script")[0];
    o.parentNode.insertBefore(n, o);
    var p = function(a, b) {
        c.debug && "undefined" != typeof console && console.log && console.log("[TRACK](" + a + ") " + b.join("/")), b = [a, k, l, b.join("/")].join("/").replace(/\/\/+/g, "/").replace(/\/$/, ""), _gaq.push(["_trackPageview", b])
      },
      q = function(a) {
        "function" == typeof $ && "object" == typeof $.fn && "function" == typeof $.fn.ready ? $(document).ready(a) : a()
      };
    c.track = function(a) {
      p(a, Array.prototype.slice.call(arguments, 1))
    }, c.track.pv = function() {
      p("pv", Array.prototype.slice.call(arguments, 0))
    }, c.track.event = function() {
      p("event", Array.prototype.slice.call(arguments, 0))
    };
    var r = {};
    r._setAccount = function(a) {
      a && (i = a)
    }, r._setDomainName = function(a) {
      a && (k = a)
    }, r._setRoot = function(a) {
      l = a || ""
    }, r._setAutoPageview = function(a) {
      j = a
    }, r._trackPageview = c.track.pv, r._trackEvent = c.track.event;
    var s = d._ydt = {};
    s.push = function(a) {
      r[a[0]].apply(this, a.slice(1))
    };
    var t = g.onclick;
    g.onclick = function(a) {
      t && t(a), a = a || d.event;
      for (var b = a.target ? a.target : a.srcElement; b != g; b = b.parentNode || g)
        if (1 === b.nodeType && b.disabled !== !0) {
          var e = b.getAttribute("data-ga");
          e && c.track.event(e)
        }
    }, q(function() {
      try {
        if (h) {
          for (var a = 0, b = h.length; b > a; a++) s.push(h[a]);
          h = null
        }
      } catch (d) {}
      j && _gaq.push(["_trackPageview", "pv/" + k + f.pathname + f.search.replace(/[?&]__da_\w+/, "")]), m.keyfrom && c.track.event("keyfrom", m.keyfrom), m.platform && c.track.event("platform", m.platform), m.vendor && c.track.event("vendor", m.vendor)
    })
  }
}(this);

// ==============================================================

/**
 * opxLoader.js
 */
function getParameter(name, _url) {
  var url, queryAry;
  try {
    return url = _url || location.href, name && url ? (queryAry = url.match(eval("/" + name + "=[^&]*/i")), queryAry ? queryAry[0].split("=")[1] : "") : ""
  } catch (e) {
    return ""
  }
}
var _opx = _opx || {};
_opx.loadJs = function(a, b) {
  var c = _opx.getParams(b),
    d = document.createElement("script");
  d.src = a + "?" + c.join("&").replace(/&&/gi, "&"), d.type = "text/javascript", d.async = "async", d.charset = "utf-8", document.getElementsByTagName("head")[0].appendChild(d)
}, _opx.getParams = function(a) {
  var d, e, f, g, h, i, j, k, b = 1e16 * Math.random(),
    c = [];
  a = a ? a : "", c = "string" == typeof a ? a.split(";") : [], c.push("rnum=" + b), c.push("re=" + encodeURIComponent(document.referrer));
  return c
}, _opx.opxLoad = function(a, b) {
  _opx.loadJs(a + "/trackingdata", b)
}, opxLoad = _opx.opxLoad;

// ==============================================================

/**
 * adv.js
 */
(function(l, L, j) {
  function o(a) {
    return Object.prototype.toString.call(a) === "[object Array]"
  }
  _py.getLast = function(f) {
    for (var d = this.length - 1; 0 <= d; d--) {
      if (o(this[d])) {
        if (this[d][0] == f) {
          return this[d][1]
        }
      }
    }
    return null
  };
  var K = _py.getLast("a"),
    E = ["Jzs", "eV", "8U", "7a", "Rds", "0j"],
    B = K && K.split(".")[0],
    n = false;
  for (var F = 0; F < E.length; F++) {
    if (E[F] == B) {
      n = true;
      break
    }
  }
  if (n) {
    var A = _py.getLast("p"),
      J = _py.getLast("pi"),
      x = _py.getLast("pv"),
      H = _py.getLast("e"),
      I = _py.getLast("domain"),
      D = _py.getLast("mapping");
    (function(m, M, q, i, e) {
      m[i] = m[i] || function() {
        m._CommandName_ = i;
        m[i].q = m[i].q || [];
        var a = arguments;
        a.length && m[i].q.push(a) && m[i]._r && m[i].$.e(a);
        m[i].track = function(f) {
          if (f) {
            var d = m[i].q[m[i].q.length - 1];
            (d.t = f) && m[i]._r && m[i].$.t(d)
          }
        };
        return m[i]
      }, m[i](), m[i].a = e, m[i].l = 1 * new Date();
      var u = "https:" == M.location.protocol;
      var N = M.createElement(q);
      N.type = "text/javascript";
      N.async = 1;
      N.src = (u ? "https" : "http") + "://" + (u ? "fm.ipinyou.com" : "fm.p0y.cn") + "/j/a.js";
      var p = M.getElementsByTagName("script")[0];
      p.parentNode.insertBefore(N, p)
    })(l, L, "script", "py", K);
    if (x != null) {
      py("set", "user", {
        category: x
      })
    }
    if (H != null) {
      py("set", "extend", H)
    }
    if (I != null) {
      py("set", "domain", I)
    }
    if (D != null && !(D !== 1)) {
      py("set", "mapping", 0)
    }
    if (J != null) {
      var y = {};
      y.product_no = J.id;
      y.name = J.name;
      y.brand = J.brand;
      y.orig_price = J.origPrice;
      y.price = J.price;
      y.pc_pic_url = J.imgUrl;
      y.product_url = J.productUrl;
      y.category = J.category;
      y.sold_out = J.soldOut;
      py("event", "viewItem", y)
    } else {
      if (A != null) {
        py("event", "viewItem", A)
      } else {
        py("event", "viewPage")
      }
    }
  } else {
    var k = 1000;
    var b = "cma";

    function o(a) {
      return Object.prototype.toString.call(a) === "[object Array]"
    }
    var C = function() {
      var i = location.hostname;
      var d = /^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/;
      var a = i.split(".");
      var f = a.length - 2;
      if (d.test(i) || 2 === a.length) {
        return i
      }
      for (; 0 <= f; --f) {
        if ("www" === a[f]) {
          return a.slice(f + 1).join(".")
        }
        if (-1 === ",com,net,org,gov,edu,info,name,int,mil,arpa,asia,biz,pro,coop,aero,museum,ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,az,ba,bb,bd,be,bf,bg,bh,bi,bj,bm,bn,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cf,cg,ch,ci,ck,cl,cm,cn,co,cq,cr,cu,cv,cx,cy,cz,de,dj,dk,dm,do,dz,ec,ee,eg,eh,es,et,ev,fi,fj,fk,fm,fo,fr,ga,gb,gd,ge,gf,gh,gi,gl,gm,gn,gp,gr,gt,gu,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,il,in,io,iq,ir,is,it,jm,jo,jp,ke,kg,kh,ki,km,kn,kp,kr,kw,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,ml,mm,mn,mo,mp,mq,mr,ms,mt,mv,mw,mx,my,mz,na,nc,ne,nf,ng,ni,nl,no,np,nr,nt,nu,nz,om,pa,pe,pf,pg,ph,pk,pl,pm,pn,pr,pt,pw,py,qa,re,ro,ru,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,st,su,sy,sz,tc,td,tf,tg,th,tj,tk,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,us,uy,va,vc,ve,vg,vn,vu,wf,ws,ye,yu,za,zm,zr,zw,".indexOf("," + a[f] + ",")) {
          return a.slice(f).join(".")
        }
      }
      return i
    };
    _py.getLast = function(f) {
      for (var d = this.length - 1; 0 <= d; d--) {
        if (o(this[d])) {
          if (this[d][0] == f) {
            return this[d][1]
          }
        }
      }
    };
    _py.serialize = function() {
      function q(i, M) {
        for (var m = 0; m < i.length; m++) {
          if (i[m] === M) {
            return m
          }
        }
        return -1
      }
      for (var p = ["domain", "urlParam", "pi", "e", "p", "mapping"], a = [], f = [], s = [], e, d = 0; d < this.length; d++) {
        e = this[d][0], -1 === q(p, e) && (f[e] = f[e] || [], 0 < f[e].length ? -1 === q(f[e], this[d][1]) && f[e].push(this[d][1]) : (f[e].push(this[d][1]), a.push([e, f[e]])))
      }
      for (d = 0; d < a.length; d++) {
        s.push(a[d][0] + "=" + j(a[d][1].join(",")))
      }
      return s.join("&")
    };
    l.ipy = {
      r: /(^|&)jump=(\d*)/i,
      cookie: {
        set: function(i, f, e, a, d) {
          z = new Date();
          z.setTime(z.getTime() + (e || 0));
          L.cookie = i + "=" + j(f || "") + (e ? "; expires=" + z.toGMTString() : "") + ";path=/; domain=" + (a || location.host) + (d ? "; secure" : "")
        },
        get: function(d) {
          return (d = L.cookie.match(RegExp("(^|;)\\s*" + d + "=([^;]*)", "i"))) ? decodeURIComponent(d[2]) : ""
        }
      },
      setCookie: function(d, a) {
        ipy.cookie.set(d, a, 31536000000, C())
      },
      setSession: function(d, a) {
        ipy.cookie.set(d, a, 0, C())
      },
      getJump: function() {
        var a = ipy.cookie.get("ipysession");
        return a && (a = a.match(ipy.r)) ? parseInt(a[2]) : 0
      },
      setJump: function(a) {
        var d = ipy.cookie.get("ipysession");
        d ? d.match(ipy.r) ? ipy.setSession("ipysession", d.replace(/jump=(\d*)/, "jump=" + a)) : ipy.setSession("ipysession", d + "&jump=" + a) : ipy.setSession("ipysession", "jump=" + a)
      },
      getInfo: function(f) {
        var a = ipy.cookie.get(f);
        if (a) {
          return a
        }
        try {
          if (l.localStorage) {
            if (localStorage.getItem(f)) {
              return localStorage.getItem(f)
            }
          }
        } catch (d) {}
        return ""
      },
      setInfo: function(f, a) {
        if (a == null || a == "") {
          return
        }
        ipy.setCookie(f, a);
        try {
          if (l.localStorage) {
            localStorage.setItem(f, a)
          }
        } catch (d) {}
      },
      getQueryString: function(e) {
        if (e == "" || e == null) {
          return
        }
        var m = l.location.href,
          a = m.split(e),
          d = "";
        if (a.length > 1) {
          m = a[1];
          d = m.split("&")[0].replace("=", "");
          return d
        }
        var f = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
          i = l.location.search.substr(1).match(f);
        if (i != null && i) {
          return i[2]
        }
        var p = l.location.hash.substr(1).match(f);
        if (p != null && p) {
          return p[2]
        }
        return ""
      },
      setExendParam: function(m, q, i) {
        var d = m || "",
          a = q || "",
          f = i || "";
        ipy.getExtendParam(d, a, f)
      },
      getExtendParam: function(a, f, p) {
        var m = "",
          d = "";
        if (a != null && a) {
          m = "p=" + a
        }
        if (f != null && f) {
          _py.push(["pv", f])
        }
        if (p != null && p) {
          m += "&ext=" + p
        }
        ipy.extendSend(m)
      },
      itemInfo: function(e) {
        var a = [],
          p;
        switch (typeof e) {
          case "string":
            p = e;
            break;
          case "object":
            var f = ["id", "name", "origPrice", "price", "brand", "imgUrl", "productUrl", "categoryId", "category", "promotion", "discount", "soldOut", "domain", "currency"];
            for (var d = 0; d < f.length; d++) {
              var m = (e[f[d]] == undefined) ? "" : e[f[d]];
              m = m.toString();
              a.push(j(m))
            }
            ipy.id = e.id || "";
            p = a.join(",");
            break;
          default:
            return p = ""
        }
        return p
      },
      extendSend: function(a) {
        var d = "";
        if (_py.getLast("e")) {
          d = "e=" + _py.getLast("e") + "&"
        }
        d += a, t = _py.getLast("domain"), A = ("https:" == location.protocol ? "https" : "http") + "://" + t + "/adv?" + _py.serialize() + ipy.getSession() + "&e=" + h(d) + "&rd=" + new Date().getTime();
        (new Image()).src = A
      },
      getSession: function() {
        var d = _py.getLast("c");
        if (d && d != null) {
          var a = ipy.getJump();
          if (!isNaN(a) && a == 0) {
            ipy.setJump(a + 1);
            return ""
          }
          a++;
          ipy.setJump(a);
          return "&s=" + a
        }
        return ""
      },
      getP: function() {
        var a = _py.getLast("p");
        var d = ipy.id ? ipy.id : "";
        a = a ? a : d;
        return a
      }
    };
    if (_py.getLast("mapping") !== 1) {
      var G = "setTimeout(function() {var f=document;e = f.createElement('iframe');e.src='" + ("http:" != location.protocol ? "https://cm.ipinyou.com/cmas.html?a=" + _py.getLast("a") : "http://fm.p0y.cn/cm/cma.html?a=" + _py.getLast("a")) + "';f.body.insertBefore(e,f.body.firstChild);e.style.display='none';}, " + k + ")"
    }
    var A = location.href,
      v = L.referrer,
      H, J, w;
    l.parent != l && (A = v, v = "");
    A && _py.push(["u", A]);
    v && _py.push(["r", v]);
    var r = _py.getLast("urlParam") || "pyck",
      I = ipy.getQueryString(r);
    I = I ? I : ipy.getInfo("ipycookie");
    ipy.setInfo("ipycookie", I);
    I && _py.push(["c", I]);
    var t = _py.getLast("domain");
    var H = _py.getLast("e");
    if (H != "" && H) {
      H = "e=" + _py.getLast("e")
    } else {
      H = ""
    }
    J = ipy.itemInfo(_py.getLast("pi"));
    A = ("https:" == location.protocol ? "https" : "http") + "://" + t + "/adv?" + _py.serialize() + ipy.getSession() + "&pi=" + j(J) + "&p=" + j(ipy.getP()) + "&e=" + j(H) + "&rd=" + new Date().getTime() + "&v=1";
    v = L.createElement("iframe");
    v.src = "javascript:false;";
    v.style.display = "none";

    function g() {
      if (L.body) {
        L.body.insertBefore(v, L.body.firstChild);
        try {
          c = v.contentWindow.document, c.write('<!doctype html><html><body onload="' + G + '"><script src="' + A + '"><\/script></body></html>'), c.close()
        } catch (a) {
          v.contentWindow.location.replace('javascript:void((function(){document.write("<!doctype html><html><body onload=\\"' + G + "\\\"><script>document.domain='" + document.domain + "';var s=document.createElement('script');document.body.insertBefore(s,document.body.firstChild);s.src='" + A + "';<\/script></body></html>\");document.close()})());")
        }
      } else {
        setTimeout(g, 50)
      }
    }
    setTimeout(g, 10)
  }
})(window, document, encodeURIComponent);




















