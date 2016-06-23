/**
 * <script src="http://source.vipabc.com/Ext/js/api/vipabc.UI.form.js"></script>
 * 添加event handler，输出flow数据，填充国双接口
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

/**
 * <script src="http://source.vipabc.com/Ext/js/api/vipabc.formCheck.js"></script>
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
          });
        }
      });
      _gsUtility.observe(window, "beforeunload", function() {
        flow = flow + '->END';
        _gsTracker.trackEvent('flow', flow);
        //期待值：用户离开页面时的表单填写情况，如：若用户仅填写完手机号时就离开了页面，则打印'->phone->END'
      });
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

/**
 * <script src="http://source.vipabc.com/Ext/js/api/vipabc.formSubmit.js"></script>
 */
// linkPage_callBack callback function about su































