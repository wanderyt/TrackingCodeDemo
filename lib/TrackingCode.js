var TrackingCode = (function() {
  // Set Symbol value for default options and tracking mapping.
  let DEFAULT_OPTIONS = Symbol("DEFAULT_OPTIONS");
  let TRACKING_MAPPING = Symbol("TRACKING_MAPPING");

  /**
   * Tracking Code Class
   * @param {number} brand    Brand, 0 for adult, 1 for vipabc junior
   * @param {string} entrance Entrance, 'OW' for official website, 'LP' for landing page
   * @param {[type]} options  Setting options
   * Example for options:
   *  {
        "BAIDU_ANALYTIC": true,
        "GOOGLE_ANALYTIC": true,
        "JINGZAN": false,
        "PINYOU_DSP": true,
        "BAIDU_DSP": true,
        "MIAOZHEN": false,
        "GRIDSUM": true,
        "ADMASTER": false,
        "MEDIAV": true,
        "XAD": false
      };
   */
  class TrackingCode {

    constructor(brand, entrance, options) {
      // Default options for tracking code load setting
      this[DEFAULT_OPTIONS] = {
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

      // Tracking code title - function mapping 
      this[TRACKING_MAPPING] = {
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
      };

      this.init(brand, entrance, options);
    }

    /**
     * Assign new tracking code function
     * Will throw error when name contains lower case character or func is not passed in
     * @param {string} name   Tracking source formatting in upper case
     * @param {func} function Tracking source function
     */
    addNewTrackingSource(name, func) {
      if (/[a-z]/.test(name)) {
        throw new Error("MSG_ERROR_INVALID_NAME_FORMAT");
      } else if (!func) {
        throw new Error("MSG_ERROR_NO_FUNCTION_FOUND");
      } else {
        this[name.toLowerCase()] = func;
        this[TRACKING_MAPPING][name] = func;
      }
    }

    /**
     * List current all tracking source name
     * @return {array} Tracking source names
     */
    getCurrentTrackingSourceList() {
      return Object.keys(this[DEFAULT_OPTIONS]);
    }

    /**
     * Initialze tracking code settings and prepare for the tracking snippet
     * @param  {number} brand   Brand, 0 for adult, 1 for vipabc junior
     * @param  {object} options Setting options
     * @return {[type]}         [description]
     */
    init(brand = 0, entrance = 'LP', options) {
      var options = options || this[DEFAULT_OPTIONS];

      for (var item in options) {
        if (options[item]) {
          this[TRACKING_MAPPING][item].call(this, brand, entrance);
        }
      }
    }

    baidu_analytic(brand, entrance) {
      if (brand === 0 && entrance === 'LP') {
        // brand for vipabc adult, landing page
        var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
        document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F2a7cd7f558a2719125a9944d07758281' type='text/javascript'%3E%3C/script%3E"));
      } else if (brand === 1 && entrance === 'LP') {
        // brand for vipabc junior, landing page
        var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
        document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F8943e7e4df101bd850a8c82e95ed4b14' type='text/javascript'%3E%3C/script%3E"));
      }
    }

    google_analytic(brand, entrance) {
      if (brand === 0) {
        /**
         * Google Analysis Code For vipabc adult
         */
        if (entrance === "OW") {
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
            `(function(w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
              });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src =
                '//www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-PTF2M9');`
          var scriptFlag = document.getElementsByTagName("script")[0];
          scriptFlag.parentNode.insertBefore(noscriptTag, scriptFlag);
          scriptFlag.parentNode.insertBefore(scriptTag, scriptFlag);
        } else {
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
      } else {
        /**
         * Google Analysis Code For vipabc junior
         */
        if (entrance === "OW") {
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
            `/* <![CDATA[ */
            var google_conversion_id = 975203139;
            var google_conversion_language = "en";
            var google_conversion_format = "2";
            var google_conversion_color = "ffffff";
            var google_conversion_label = "v2RVCP2flgoQw9aB0QM";
            var google_remarketing_only = false;
            /* ]]> */`;
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
        } else {
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

    jingzan(brand, entrance) {
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

    pinyou_dsp(brand, entrance) {
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

    baidu_dsp(brand, entrance) {
      if (brand === 0 && entrance === "LP") {
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
      } else if (brand === 1 && entrance === "LP") {
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

    gridsum(brand, entrance) {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.onload = function() {
        if (typeof trackForm == 'function') {
          this.trackForm(); // TBD: how to pass in the root node id
        }
      }.bind(this)
      s.src = (location.protocol == "https:" ? "https://ssl." : "http://static.") + "gridsumdissector.com/js/Clients/GWD-002255-E116CE/gs.js"; // f parameter value not sure
      var firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(s, firstScript);
      window.hasLoadedGs_Js = true; //标记gs.js已经开始加载了

      function gsTrackStart(node) {
        var val = node.value;
        //若表单含有默认值
        if (val != '姓名' && val != '' && window._gsTracker) {
          //若表单不含有默认值
          //if (val != '' && window._gsTracker) {  
          _gsTracker.setCustomProperty('2', 'formStart');
          _gsTracker.track('/targetpage/formStart' + location.pathname);

          console.log("gs-formStart");
        }
      }

      $(document).ready(function() {
        $("input[name='name']").blur(function() {
          console.log('gs-name');
          console.log(this.value);
          gsTrackStart(this);
        });

        $("input[name='name1']").blur(function() {
          console.log('gs-name');
          console.log(this.value);
          gsTrackStart(this);
        });

        $("input[name='name2']").blur(function() {
          console.log('gs-name');
          console.log(this.value);
          gsTrackStart(this);
        });

        $.each($('form'), function(n, value) {
          $(this).append("<input type='hidden' name='formName' value='ServerSubmitForm" + n + "'/>");
        });
      });
    }

    admaster(brand, entrance) {
      var _smq = _smq || [];
      _smq.push(['_setAccount', '4d3dfab', new Date()]);
      _smq.push(['pageview']);

      var sm = document.createElement('script');
      sm.type = 'text/javascript';
      sm.async = true;
      sm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdnmaster.com/sitemaster/collect.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(sm, s);

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
    }

    mediav(brand, entrance) {
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

    xad(brand, entrance) {
      var xadScript = document.createElement("script");
      xadScript.src = "http://7xi67m.com2.z0.glb.qiniucdn.com/js/xadTracking.js";
      var scriptNode = document.getElementsByTagName("script")[0];
      scriptNode.parentNode.insertBefore(xadScript, scriptNode);
      
      // How to add following code in each step of submitting
      // _xadTracking.track('landing');
      // _xadTracking.track('startReg');
      // _xadTracking.track('successReg');
    }

    sogou(brand, entrance) {
      /*document.writeln("<script  type=\"text/javascript\">");
      document.writeln("  var _sogou_sa_q = _sogou_sa_q || [];");
      document.writeln("  _sogou_sa_q.push([\'_sid\', \'87011-89433\']);");
      document.writeln(" (function() {");
      document.writeln("    var _sogou_sa_protocol = ((\"https:\" == document.location.protocol) ? \"https://\" : \"http://\");");
      document.writeln("    var _sogou_sa_src=_sogou_sa_protocol+\"hermes.sogou.com/sa.js%3Fsid%3D87011-89433\";");
      document.writeln("    document.write(unescape(\"%3Cscript src=\'\" + _sogou_sa_src + \"\' type=\'text/javascript\'%3E%3C/script%3E\"));");
      document.writeln("    })();");
      document.writeln("</script>");*/

      var _sogou_sa_q = _sogou_sa_q || [];
      _sogou_sa_q.push(['_sid', '87011-89433']);
      var _sogou_sa_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");
      var _sogou_sa_src = _sogou_sa_protocol + "hermes.sogou.com/sa.js%3Fsid%3D87011-89433";
      document.write(unescape("%3Cscript src=\"" + _sogou_sa_src + "\" type=\"text/javascript\"%3E%3C/script%3E"));
    }

    /**
     * Track form function
     * TBD: how to pass in the root node id in the document
     * @param  {string} rootNodeId Form root node id
     */
    trackForm(rootNodeId) {
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
            console.log(flow);
          });
        }
      });
    }
  };

  return TrackingCode;
})();

$(document).ready(function() {
  // Whether it is needed to integrate the code here from: 
  // dev/program/linkage_page/Xman2016/js/vipabc.UI.form.js
  // dev/program/linkage_page/javascript/vipabc.formSubmit.js
  var trackingCode = new TrackingCode();
  window._trackingCode = trackingCode;
  /*sessionStorage.setItem("trackingCode", JSON.stringify(trackingCode));*/

  // Here user could define his own tracking form code. 
  // For example:
  // trackingCode.trackForm = function() {};
  // trackingCode.trackForm();
  document.write("Hello there, tracking code has been loaded.")
});



