/**
 * Tracking Code Class
 * @param {number} brand    Brand
 * @param {string} entrance Entrance, 'OW' for official website, 'LP' for landing page
 * @param {object} options  Setting options
 * Example for options:
 *  {
      "BAIDU_ANALYTIC": true,
      "GOOGLE_ANALYTIC": true,
      "JINGZAN": false,
      "PINYOU_DSP": true,
      "BAIDU_DSP": true,
      "GRIDSUM": true,
      "ADMASTER": false,
      "MEDIAV": true,
      "XAD": false,
      "SOGOU": true
    }
 */
var TrackingCode = function() {

  /**
   * Global Terms for Entrance
   */
  this.official_website = "OW";
  this.landing_page = "LP";
  this.invalid_entrance = "INVALID";

  /**
   * Global Terms for Brand
   */
  this.TutorGroup = 0;
  this.TutorABC = 1;
  this.vipabc = 2;
  this.TutorABCJr = 3;
  this.vipabcJr = 4;
  this.TutorMing = 5;
  this.NNTutorMing = 6;
  this.Columbia = 7;
  this.Japan = 8;
  this.invalid_brand = 99;

  // Default options for tracking code load setting
  this.default_options = {
    "BAIDU_ANALYTIC": true,
    "GOOGLE_ANALYTIC": true,
    "JINGZAN": false,
    "PINYOU_DSP": true,
    "BAIDU_DSP": true,
    "GRIDSUM": true,
    "ADMASTER": false,
    "MEDIAV": true,
    "XAD": false,
    "SOGOU": true
  };

  /**
   * Assign new tracking code function
   * Will throw error when name contains lower case character or func is not passed in
   * @param {string} name   Tracking source formatting in upper case
   * @param {func} function Tracking source function
   */
  this.addNewTrackingSource = function(name, func) {
    if (/[a-z]/.test(name)) {
      throw new Error("MSG_ERROR_INVALID_NAME_FORMAT");
    } else if (!func) {
      throw new Error("MSG_ERROR_NO_FUNCTION_FOUND");
    } else {
      this[name.toLowerCase()] = func;
      this.tracking_mapping[name] = func;
    }
  }

  /**
   * Initialze tracking code settings and prepare for the tracking snippet
   * @param  {object} options Setting options
   */
  this.load = function(options) {
    // Offline version for parameter
    // var brand = this.vipabc;
    // var entrance = this.landing_page;
    
    // Define brand / entrance by current location url
    var url = window.location.href,
        brand, entrance;
    var adultOfRegex = /(www.vipabc.com){1}/;
    var adultLpRegex = /(lp.vipabc.com){1}/;
    var juniorOfRegex = /(junior.vipabc.com){1}|(www.vipabcjr.com){1}/;
    var juniorLpRegex = /(page.vipabc.com){1}/;

    if (adultOfRegex.test(url) || adultLpRegex.test(url)) {
      brand = this.vipabc;
    } else if (juniorOfRegex.test(url) || juniorLpRegex.test(url)) {
      brand = this.vipabcJr;
    } else {
      brand = this.invalid_brand;
    }

    if (adultOfRegex.test(url) || juniorOfRegex.test(url)) {
      entrance = this.official_website;
    } else if (adultLpRegex.test(url) || adultLpRegex.test(url)) {
      entrance = this.landing_page;
    } else {
      entrance = this.invalid_entrance;
    }

    // Set options as default when no options is passed in
    options = options || this.default_options;

    for (var i in this.default_options) {
      if (!(i in options)) {
        options[i] = this.default_options[i];
      }
    }

    for (var item in options) {
      if (options[item]) {
        /**
         * Ensure that the sub functions could be executed in window context
         * So that the functions such as gsTrackStart could be found in window variable
         * Also the trackingCode object should be availabe so that the default value is access
         */
        this.tracking_mapping[item].call(window, brand, entrance, this);
      }
    }
  }

  /**
   * Load only by options specified
   * @param  {object} options Specified options
   */
  this.loadByOption = function(options) {
    // Define brand / entrance by current location url
    var url = window.location.href,
        brand, entrance;
    var adultOfRegex = /(www.vipabc.com){1}/;
    var adultLpRegex = /(lp.vipabc.com){1}/;
    var juniorOfRegex = /(junior.vipabc.com){1}|(www.vipabcjr.com){1}/;
    var juniorLpRegex = /(page.vipabc.com){1}/;

    if (adultOfRegex.test(url) || adultLpRegex.test(url)) {
      brand = this.vipabc;
    } else if (juniorOfRegex.test(url) || juniorLpRegex.test(url)) {
      brand = this.vipabcJr;
    } else {
      brand = this.invalid_brand;
    }

    if (adultOfRegex.test(url) || juniorOfRegex.test(url)) {
      entrance = this.official_website;
    } else if (adultLpRegex.test(url) || adultLpRegex.test(url)) {
      entrance = this.landing_page;
    } else {
      entrance = this.invalid_entrance;
    }

    for (var item in options) {
      this.tracking_mapping[item].call(window, brand, entrance, this);
    }
  }

  this.baidu_analytic = function(brand, entrance, trackingCodeObj) {
    if (brand === trackingCodeObj.vipabc && entrance === trackingCodeObj.landing_page) {
      // brand for vipabc adult, landing page
      var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
      document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F2a7cd7f558a2719125a9944d07758281' type='text/javascript'%3E%3C/script%3E"));
    } else if (brand === trackingCodeObj.vipabcJr && entrance === trackingCodeObj.landing_page) {
      // brand for vipabc junior, landing page
      var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
      document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F8943e7e4df101bd850a8c82e95ed4b14' type='text/javascript'%3E%3C/script%3E"));
    }
  }

  this.google_analytic = function(brand, entrance, trackingCodeObj) {
    if (brand === trackingCodeObj.vipabc) {
      /**
       * Google Analysis Code For vipabc adult
       */
      if (entrance === trackingCodeObj.official_website) {
        // Official Website : UA-42456984-1
        (function(i, s, o, g, r, a, m) {
          i['GoogleAnalyticsObject'] = r;
          i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
          }, i[r].l = 1 * new Date();
          a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
          a.async = 1;
          a.src = g;
          m.parentNode.insertBefore(a, m);
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-42456984-1', 'vipabc.com');
        ga('send', 'pageview');

        // Google Tag on Page
        var noscriptTag = document.createElement("noscript");
        var iframeTag = document.createElement("iframe");
        iframe.src = "//www.googletagmanager.com/ns.html?id=GTM-PTF2M9";
        iframe.height = "0";
        iframe.width = "0";
        iframe.style.visibility = "hidden";
        iframe.style.display = "none";
        noscriptTag.appendChild(iframeTag);
        var scriptTag = document.getElementsByTagName("script");
        scriptTag.innerHTML = 
          "(function(w, d, s, l, i) {" +
          "  w[l] = w[l] || [];" +
          "  w[l].push({" +
          "    'gtm.start': new Date().getTime()," +
          "    event: 'gtm.js'" +
          "  });" +
          "  var f = d.getElementsByTagName(s)[0]," +
          "    j = d.createElement(s)," +
          "    dl = l != 'dataLayer' ? '&l=' + l : '';" +
          "  j.async = true;" +
          "  j.src =" +
          "    '//www.googletagmanager.com/gtm.js?id=' + i + dl;" +
          "  f.parentNode.insertBefore(j, f);" +
          "})(window, document, 'script', 'dataLayer', 'GTM-PTF2M9');"
        var scriptFlag = document.getElementsByTagName("script")[0];
        scriptFlag.parentNode.insertBefore(noscriptTag, scriptFlag);
        scriptFlag.parentNode.insertBefore(scriptTag, scriptFlag);
      } else if (entrance === trackingCodeObj.landing_page) {
        // Landing Page : UA-42684849-1
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

        // Google Tag on Page
        var noscriptTag = document.createElement("noscript");
        var divTag = document.createElement("div");
        divTag.style.display = "inline";
        var imgTag = document.createElement("img");
        imgTag.height = "1";
        imgTag.width = "1";
        imgTag.style["border-style"] = "none";
        imgTag.src = "http://www.googleadservices.com/pagead/conversion/985544566/?label=-zBaCOLxmAMQ9u741QM&amp;guid=ON&amp;script=0";
        divTag.appendChild(imgTag);
        noscriptTag.appendChild(divTag);
        var scriptTag = document.createElement("script");
        scriptTag.src = "http://www.googleadservices.com/pagead/conversion.js";
        scriptTag.type = "text/javascript";
        var scriptFlag = document.getElementsByTagName("script")[0];
        scriptFlag.parentNode.insertBefore(scriptTag, scriptFlag);
        scriptFlag.parentNode.insertBefore(noscriptTag, scriptFlag);
      }
    } else if (brand === trackingCodeObj.vipabcJr) {
      /**
       * Google Analysis Code For vipabc junior
       */
      if (entrance === trackingCodeObj.official_website) {
        // Official Website : UA-46520037-1
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

        ga('create', 'UA-46520037-1', 'vipabcJr.com');
        ga('send', 'pageview');

        // Google Tag on Page
        var scriptTagOne = document.createElement("script");
        scriptTagOne.innerHTML = 
          "/* <![CDATA[ */" +
          "var google_conversion_id = 975203139;"
          "var google_conversion_language = \"en\";" +
          "var google_conversion_format = \"2\";" +
          "var google_conversion_color = \"ffffff\";" +
          "var google_conversion_label = \"v2RVCP2flgoQw9aB0QM\";" +
          "var google_remarketing_only = false;" +
          "/* ]]> */";
        var scriptTagTwo = document.createElement("script");
        scriptTagTwo.src = "//www.googleadservices.com/pagead/conversion.js";
        scriptTagTwo.type = "text/javascript";
        var noscriptTag = document.createElement("noscript");
        var divTag = document.createElement("div");
        divTag.style.display = "inline";
        var imgTag = document.createElement("img");
        imgTag.height = "1";
        imgTag.width = "1";
        imgTag.style["border-style"] = "none";
        imgTag.src = "//www.googleadservices.com/pagead/conversion/975203139/?label=v2RVCP2flgoQw9aB0QM&amp;guid=ON&amp;script=0"
        divTag.appendChild(imgTag);
        noscriptTag.appendChild(divTag);
        var scriptFlag = document.getElementsByTagName("script")[0];
        scriptFlag.parentNode.insertBefore(scriptTagOne, scriptFlag);
        scriptFlag.parentNode.insertBefore(scriptTagTwo, scriptFlag);
        scriptFlag.parentNode.insertBefore(noscriptTag, scriptFlag);
      } else if (entrance === trackingCodeObj.landing_page) {
        // Landing Page : UA-46520037-2
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

        ga('create', 'UA-46520037-2', 'auto');
        ga('send', 'pageview');
      }
    }
  }

  this.jingzan = function(brand, entrance, trackingCodeObj) {
    if (brand !== trackingCodeObj.invalid_brand && entrance !== trackingCodeObj.invalid_entrance) {
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
    }
  }

  this.pinyou_dsp = function(brand, entrance, trackingCodeObj) {
    if (brand !== trackingCodeObj.invalid_brand && entrance !== trackingCodeObj.invalid_entrance) {
      var _py = window._py || [];
      window._py = _py;
      _py.push(['a', 'uc.HG.Q5q29A5dFaAYpZIQaK1grP']);
      _py.push(['domain', 'stats.ipinyou.com']);
      _py.push(['e', '']); 
      var s = document.createElement('script'),
        e = document.getElementsByTagName('script')[0];
      e.parentNode.insertBefore(s, e);
      var f = 'https:' == location.protocol;
      s.src = (f ? 'https' : 'http') + '://' + (f ? 'fm.ipinyou.com' : 'fm.p0y.cn') + '/j/adv.js';
    }
  }

  this.baidu_dsp = function(brand, entrance, trackingCodeObj) {
    if (brand === trackingCodeObj.vipabc && entrance === trackingCodeObj.landing_page) {
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?574ffced4eb7a8fd0b6b6fe1876d7f21";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();

      (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?5345ab1def2f45ed40789a446f7aa5ca";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    } else if (brand === trackingCodeObj.vipabcJr && entrance === trackingCodeObj.landing_page) {
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?5345ab1def2f45ed40789a446f7aa5ca";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();

      (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?410a27deac5acc71d7f1a4e9d68845a0";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    }
  }

  this.gridsum = function(brand, entrance, trackingCodeObj) {
    if (brand !== trackingCodeObj.invalid_brand && entrance !== trackingCodeObj.invalid_entrance) {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.onload = function() {
        if (typeof trackForm == 'function') {
          this.trackForm(); // TBD: how to pass in the root node id
        }
      }.bind(trackingCodeObj)
      s.src = (location.protocol == "https:" ? "https://ssl." : "http://static.") + "gridsumdissector.com/js/Clients/GWD-002255-E116CE/gs.js"; // f parameter value not sure
      var firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(s, firstScript);
      window.hasLoadedGs_Js = true; //标记gs.js已经开始加载了

      $(document).ready(function() {
        $("input[name='name']").blur(function() {
          // console.log('gs-name');
          // console.log(this.value);
          gsTrackStart(this);
        });

        $("input[name='name1']").blur(function() {
          // console.log('gs-name');
          // console.log(this.value);
          gsTrackStart(this);
        });

        $("input[name='name2']").blur(function() {
          // console.log('gs-name');
          // console.log(this.value);
          gsTrackStart(this);
        });

        $.each($('form'), function(n, value) {
          $(this).append("<input type='hidden' name='formName' value='ServerSubmitForm" + n + "'/>");
        });
      });
    }

    this.gsTrackStart = function(node) {
      var val = node.value;
      //若表单含有默认值
      if (val != '姓名' && val != '' && window._gsTracker) {
        //若表单不含有默认值
        //if (val != '' && window._gsTracker) {  
        _gsTracker.setCustomProperty('2', 'formStart');
        _gsTracker.track('/targetpage/formStart' + location.pathname);

        if (window.console) {
          console.log("gs-formStart");
        }
      }
    }
  }

  this.admaster = function(brand, entrance, trackingCodeObj) {
    if (brand !== trackingCodeObj.invalid_brand && entrance !== trackingCodeObj.invalid_entrance) {
      var _smq = _smq || [];
      _smq.push(['_setAccount', '4d3dfab', new Date()]);
      _smq.push(['pageview']);

      var sm = document.createElement('script');
      sm.type = 'text/javascript';
      sm.async = true;
      sm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdnmaster.com/sitemaster/collect.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(sm, s);
    }
  }

  this.mediav = function(brand, entrance, trackingCodeObj) {
    if (brand !== trackingCodeObj.invalid_brand && entrance !== trackingCodeObj.invalid_entrance) {
      var _mvq = window._mvq || [];
      window._mvq = _mvq;
      _mvq.push(['$setAccount', 'm-132257-0']);
      _mvq.push(['$logConversion']);

      var mvl = document.createElement('script');
      mvl.type = 'text/javascript';
      mvl.async = true;
      mvl.src = ('https:' == document.location.protocol ? 'https://cdn.dsp.com/static/js/loader.js' : 'http://cdn.dsp.com/static/js/loader.js');
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(mvl, s);
    }
  }

  this.xad = function(brand, entrance, trackingCodeObj) {
    if (brand !== trackingCodeObj.invalid_brand && entrance !== trackingCodeObj.invalid_entrance) {
      var xadScript = document.createElement("script");
      xadScript.src = "http://7xi67m.com2.z0.glb.qiniucdn.com/js/xadTracking.js";
      var scriptNode = document.getElementsByTagName("script")[0];
      scriptNode.parentNode.insertBefore(xadScript, scriptNode);
    }
    
    // How to add following code in each step of submitting
    // _xadTracking.track('landing');
    // _xadTracking.track('startReg');
    // _xadTracking.track('successReg');
  }

  this.sogou = function(brand, entrance, trackingCodeObj) {
    if (brand !== trackingCodeObj.invalid_brand && entrance !== trackingCodeObj.invalid_entrance) {
      var _sogou_sa_q = _sogou_sa_q || [];
      _sogou_sa_q.push(['_sid', '87011-89433']);
      var _sogou_sa_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");
      var _sogou_sa_src = _sogou_sa_protocol + "hermes.sogou.com/sa.js%3Fsid%3D87011-89433";
      document.write(unescape("%3Cscript src=\"" + _sogou_sa_src + "\" type=\"text/javascript\"%3E%3C/script%3E"));
    }
  }

  /**
   * Track form function
   * TBD: how to pass in the root node id in the document
   * @param  {string} rootNodeId Form root node id
   */
  this.trackForm = function(rootNodeId) {
    var nodeId = rootNodeId || "";
    var flow = '';
    var $rootNode = $('#' + rootNodeId);
    var $inputList = $('input', $rootNode);
    $inputList.each(function() {
      if (window._gsTracker) {
        $(this).on('blur', function() {
          //默认获取input的name属性来进行记录，可根据实际表单情况来进行调整
          flow = flow + '->' + $(this).attr('data-track');
          //期待值：每次表单失去焦点时将打印出更新后的填写顺序，例如首先填写完姓名时，将打印'->name',再填写完手机号时，将打印'->name->phone'
        });
        _gsUtility.observe(window, "beforeunload", function() {
          flow = flow + '->END';
          _gsTracker.trackEvent('flow', flow);
          //期待值：用户离开页面时的表单填写情况，如：若用户仅填写完手机号时就离开了页面，则打印'->phone->END'
          // console.log(flow);
        });
      }
    });
  }

  this.trackFormDemo = function() {
    var rootNodeList = arguments;
    var nodeId = rootNodeId || "";
    var flow = ''; // flow与表单的对应关系
    var $rootNode = $('#' + rootNodeId);
    var $inputList = $('input', $rootNode);
    $inputList.each(function() {
      if (window._gsTracker) {
        $(this).on('blur', function() {
          //默认获取input的name属性来进行记录，可根据实际表单情况来进行调整
          flow = flow + '->' + $(this).attr('data-track');
          //期待值：每次表单失去焦点时将打印出更新后的填写顺序，例如首先填写完姓名时，将打印'->name',再填写完手机号时，将打印'->name->phone'
        });
        _gsUtility.observe(window, "beforeunload", function() {
          flow = flow + '->END';
          _gsTracker.trackEvent('flow', flow);
          //期待值：用户离开页面时的表单填写情况，如：若用户仅填写完手机号时就离开了页面，则打印'->phone->END'
          // console.log(flow);
        });
      }
    });
  }

  // Tracking code title - function mapping 
  this.tracking_mapping = {
    "BAIDU_ANALYTIC": this.baidu_analytic || function() {},
    "GOOGLE_ANALYTIC": this.google_analytic || function() {},
    "JINGZAN": this.jingzan || function() {},
    "PINYOU_DSP": this.pinyou_dsp || function() {},
    "BAIDU_DSP": this.baidu_dsp || function() {},
    "GRIDSUM": this.gridsum || function() {},
    "ADMASTER": this.admaster || function() {},
    "MEDIAV": this.mediav || function() {},
    "XAD": this.xad || function() {},
    "SOGOU": this.sogou || function() {}
  }
};

$(document).ready(function() {
  var trackingCode = new TrackingCode();
  trackingCode.init();
  window._trackingCode = trackingCode;

  // Here user could define his own tracking form code. 
  // For example:
  // trackingCode.trackForm = function() {};
  // trackingCode.trackForm();
  // Will be decided by Harry
  document.write("Hello there, tracking code has been loaded.")
});



