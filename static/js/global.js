(function(doc, win) {
  'use strict';
  $('.backToTop').click(function() {
    $('body').animate({
        scrollTop: 0
      },
      500);
  });
  /*https to http*/
  // $('.single article').find('img').each(function(index, el) {
  //   var pa = $(this).parent('a');
  //   $(this).attr( 'src', $(this).attr('src').replace(/https/,'http') );
  //   if( pa == 'undefined' ){
  //       pa.attr( 'href', pa.attr('href').replace(/https/,'http') );
  //     }
  // });
  // $(".clientlist-container .nav-sec ul li a").click(function(event) {
  //   //event.preventDefault();
  //   var a = $(this).attr("href");
  //   $("html, body").animate({
  //     scrollTop: $(a).offset().top - 100
  //   }, 1000);
  //   return false;
  // });
  // comments:
  $("#comments .comment-form").prepend($("#comments .comment-form .comment-form-comment").remove().clone());
  $("#comments .comment-form .comment-form-email").after($("#comments .comment-form .comment-notes").remove().clone());
  $("#comments .comment-form .form-submit #submit").addClass('submit blue');

  $(".nav-single a").each(function(index, el) {
    var href = $(this).attr('href');
    $(this).attr('href', href + '?belong=' + localStorage.belong );
  });

  //如果是多分类单页，一级导航选中实现：
  if (localStorage.isSingle == 1) {
    if (localStorage.belong) {
      $(".nav-inner-r .dropdown").each(function() {
        if ($(this).find(".selected").data('slug') == localStorage.belong || $(this).find(".selected").data('slug') == 'blog') {
          $(this).parent(".dropdown-wp").parent("li").siblings('li').find(".selected").addBack().removeClass('selected');
        }
      });
    }
  }
  //如果是归档，一级导航选中实现：
  if (localStorage.isArchive == 1) {
    $(".nav-inner-r .dropdown").find("a").each(function() {
      if ($(this).data('slug') == 'blog') {
        $(this).parents(".dropdown-wp").parent("li").siblings('li').removeClass('selected').find(".selected").removeClass('selected');
      }
    });
  }
  if ($('.page-template-templatequality-support-php').length > 0) {
    $(window).on('resize', function() {
      var groups = $('.level-three-groups');
      if (groups.hasClass('groups-fixed')) {
        var w = $(this).width();
        var pageWidth = $('#page').width();
        var gap = -640 + Math.max((pageWidth - w), 0) / 2;
        groups.css({
          marginLeft: gap
        });
      } else {
        groups.css({
          marginLeft: 0
        });
      }
    });
  }
  // 三级导航：
  if ($(".level-three-groups").offset()) {
    var level_three_groups_offset_start_top = $(".level-three-groups").offset().top;
    var level_three_groups_top_start = $(".level-three-groups").css('top');
    var level_three_groups_right_start = $(".level-three-groups").css('right');
    var level_three_groups_position_start = $(".level-three-groups").css('position');
    $(win).on('scroll', function() {
      $('.level-three-groups').each(function() {
        if ($(document).scrollTop() > level_three_groups_offset_start_top) {
          $(this).css({
            position: 'fixed',
            top: 0,
            right: 'auto'
          });
          $(this).addClass('groups-fixed');
          $(window).trigger('resize');
        } else {
          $(this).css({
            position: level_three_groups_position_start,
            right: level_three_groups_right_start,
            top: level_three_groups_top_start
          });
          if( $(this).hasClass('quality-support')){
            $(this).css({
              position: 'absolute',
              left: '-180px',
            }).parents('.contact-container').css({
              position:'relative',
              overflow:'visible'
            });
          }
          $(this).removeClass('groups-fixed');
          $(window).trigger('resize');
        }
        var walk = $(document).outerHeight() - $(this).outerHeight() - $(document).scrollTop();
        if (walk < 476) {
          $(this).css({
            "margin-top": walk - 476 - 40
          });
        } else {
          $(this).css({
            "margin-top": 0
          });
        }
      })
    })
  }
  // END：三级导航
  function query() {
    var url = decodeURIComponent(window.location.search);

    var query_string = {};
    var query = url.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [query_string[pair[0]], pair[1]];
        query_string[pair[0]] = decodeURIComponent(arr);
        // If third or later entry with this name
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }
    return query_string;
  }

  $(".entry-content.short,.section-private-openstack-plus-1 .widget-detail,#secondary .widget .detail").each(function() {
    var txt = $(this).text();
    txt = txt.replace(/(\[caption)([\s\S]*)(\[\/caption\])/g, '');
    txt = txt.replace(/(\[)([^\]]*)(toc)([^\]]*)(\])/g, '');
    txt = txt.replace(/(\<\!)([^\>]*)(\>)/g, '');
    $(this).text($.trim(txt));
  })

  $('.external-header').each(function() {

    var obj = query();
    $(this).find('.nav-menu >li >a').each(function() {
      $(this).toggleClass('selected', obj.top == $(this).text());
    });
    $(this).find('.nav-menu >li .dropdown li >a').each(function() {
      $(this).toggleClass('selected', obj.sec == $(this).text());
    });
  });

  $(win).on('scroll', function() {
    var scrolltop = $(doc).scrollTop();
    if (scrolltop >= 800) {
      $('.backToTop').removeClass('hide');
    } else {
      $('.backToTop').addClass('hide');
    }
  });
  $('#menu-main-menu >li,#menu-private-main-menu >li').hover(
    function() {
      $(this).addClass('hoverIn').removeClass('moveOut');
    },
    function() {
      $(this).addClass('hoverOut');
    }
  );
  $('#menu-main-menu >li,#menu-private-main-menu >li').on('transitionend webkitTransitionend', function() {
    if ($(this).hasClass('hoverOut')) {
      $(this).removeClass('hoverOut').addClass('moveOut');
    } else if ($(this).hasClass('moveOut')) {
      $(this).removeClass('moveOut');
    }
  });
  $('#home-video-menu').each(function() {
    var videos = $(this).parent().find('.video-title');
    var ul = $(this).find('>ul');
    var menu = $(this);
    videos.each(function() {
      ul.append('<li><a href="javascript:;" data-id="' + $(this).data('id') + '">' + $(this).text() + '</a></li>');
    });

    ul.on('click', 'li a', function() {
      if ($(this).hasClass('selected')) {
        return;
      }
      var id = $(this).data('id');
      ul.find('li a').each(function() {
        $(this).toggleClass('selected', $(this).data('id') == id);
      });
      $('.type-video').each(function() {
        $(this).toggleClass('hide', $(this).data('id') != id);
      });
      $('.type-video video').each(function() {
        this.pause();
      });
    });
    ul.find('li a').eq(0).trigger('click');
  });
  // Generate the sec menu.
  $('.nav-sec').each(function() {
    if ($(this).data('norender') == 1) {
      // return;
    }

    var selected = $('#menu-main-menu >li >a.selected,#menu-private-main-menu >li >a.selected');
    var li = selected.siblings('.dropdown-wp').find('>ul >li');
    if (li.length > 0) {
      $(this).removeClass('hide');
      var html = ['<ul>'];
      var index = 1;
      li.each(function() {
        html[index++] = '<li>' + $(this).html() + '</li>';
      });
      html[index++] = '</ul>';
      $(this).html(html.join(''));
    } else {
      $(this).addClass('hide');
    }

    //如果是多分类单页，二级导航选中实现：
    if (localStorage.isSingle == 1) {
      if (localStorage.belong) {
        $(this).find("a").each(function() {
          if ($(this).data("slug") == localStorage.belong) {
            $(this).addClass("selected").parent("li").siblings('li').find('a').removeClass("selected");
          }
        });
      }
    }

  });

  $('.carousel').each(function() {
    var that = $(this);

    function nav(index) {
      that.data('index', index);
      var items = that.find('.carousel-item'); //:eq(' + index + ')');
      if (items.length <= index) {
        index = index % items.length;
      }
      var content = items.find('.carousel-content');
      index = (index + items.length) % items.length;
      var left = items.eq(index).position().left + content.position().left;
      that.find('.carousel-items').css({
        left: -left
      });
      that.find('.carousel-prev').toggleClass('hide', items.length < 2);
      that.find('.carousel-next').toggleClass('hide', items.length < 2);
    }

    that.find('.carousel-prev, .carousel-next').click(function() {
      var current = parseInt(that.data('index'), 10);
      if (isNaN(current)) {
        current = 0;
      }
      if ($(this).is('.carousel-prev')) {
        current = current - 1;
      } else {
        current = current + 1;
      }
      nav(current);
    });

    var totalWidth = 0;
    $(this).find('.carousel-item').each(function() {
      totalWidth += $(this).outerWidth();
    });
    $(this).find(".carousel-items").width(totalWidth);
    nav(0);
  });
  $('.content.need-menu').each(function() {
    var content = $(this).find('.content-detail');
    var menu = $(this).find('.sub-menu-terms');
    content.find('h1').each(function() {
      var id = 'artice' + Math.round(Math.random() * 100000000);
      $(this).attr('id', id);
      menu.append('<a href="javascript:;" data-id="' + id + '" class="sub-menu-term">' + $(this).text() + '</a>');
    });
  });


  $('.level-three-groups a.menu-terms').on('click', function() {
    var p = $(this).parent();
    p.toggleClass('active');
    p.siblings().removeClass('active');
  });
  $('.level-three-groups .level-three-menu').addClass('active');
  $('.level-three-groups .sub-menu-term').on('click', function() {
    $(document).scrollTop(300);
  });
  $('.level-three-groups:not(.no-scroll) .sub-menu-term').on('click', function() {
    var levelMenu = $(this).parents('.level-three-groups');
    var content = levelMenu.siblings('.with-menu');
    var id = $(this).data('id');
    var block = content.find('#' + id);
    if (block.length > 0) {
      var offset = block.offset();
      if( $('body').scrollTop() ){
        $('body').animate({
            scrollTop: offset.top
          },
          100);
      }
      else{
        /* firefox: */
        $('html').animate({
            scrollTop: offset.top
          },
          100);
        }
    }
  });
  $('.level-three-groups.no-scroll .sub-menu-term').on('click', function() {
    if ($(this).hasClass('selected')) {
      return;
    }
    var levelMenu = $(this).parents('.level-three-groups');
    var content = levelMenu.siblings('.with-menu');
    var id = $(this).data('id');
    $('.term-wrapper').each(function() {
      $(this).toggleClass('hide', $(this).prop('id') != 'term-widget-' + id);
    });
    $(this).siblings('.selected').removeClass('selected');
    $(this).parents('.level-three-menu').siblings('.level-three-menu').find('.sub-menu-term').removeClass('selected');
    $(this).addClass('selected');
  });
  $('.level-three-groups.no-scroll .sub-menu-term:eq(0)').trigger('click');
  + function(){
    var hasVideo = false;
    var mediaModule = function(ele,start){ /* for player. */
      var media       = ele.querySelector('.media'),
          player      = media.querySelector('.player'),
          slide       = media.querySelector('.slide'),
          videoCloth  = player.querySelector('.cloth'),
          video       = player.querySelector('video'),
          control     = player.querySelector('.control'),
          play        = control.querySelector('.play'),
          bar         = control.querySelector('.backline'),
          volume      = control.querySelector('.volume'),
          goon        = bar.querySelector('.blueline'),
          dot         = goon.querySelector('.dot'),
          sidebar     = media.querySelector('.sidebar'),
          barLen      = bar.offsetWidth,
          duration    = 0,
          mouseStopOnVideo  = true,
          isFullscreen  = false,
          playerLocation  = 0;
      var formatTime = function(sec){
        var h       = Math.floor(sec / 3600),
          m       = Math.floor((sec - h * 3600) / 60),
          s       = (sec - h * 3600 - m * 60),
          t       = new Array(h,m,s),
          i       = 3;
        for(;i--;){
          t[i] = ( (t[i] < 10) ? ('0' + t[i]) : t[i] );
        };
        t.shift(); /* delete hour. */
        return t.join(':');
      };
      var share = function( target, title, url ){ /* for share. */
        var generateQr = function( dom, t ){
          var fill = document.createDocumentFragment(),
            div  = document.createElement('div');
          fill.appendChild( div );
          div.style = "id=qr;position=absolute;z-index=1;left=0;bottom=50px";
          dom.appendChild(fill);
          jQuery("#qr").qrcode({
            width: 100,
            height: 100,
            text: t
          });
        };
        $(target).find('li').on({
          click: function(){
            var urls   = [],to,
              pic    = window.location.protocol + '//' + window.location.host + "/wordpress/wp-content/themes/officalsite/css/images/logo.png";
                var key = this.className.replace("-ico", "");
                switch( key ){
                  case 'weibo':case 'sina':
                    to = "http://v.t.sina.com.cn/share/share.php?title=" + title + "&url=" + url + "&pic=" + pic;
                    break;
                  case 'google':
                    to = "https://plus.google.com/share?url=" + url;
                    break;
                  case 'twitter':
                    to = "https://twitter.com/intent/tweet?status=" + title + " " + url;
                    break;
                  case 'facebook':
                    to = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
                    break;
                  case 'wechat':case 'weixin':
                    // to = "https://chart.googleapis.com/chart?cht=qr&chs=150x150&choe=UTF-8&chld=L|4&chl=" + url;
                // to = "http://share.v.t.qq.com/index.php?c=share&a=index&title=" + title + "&url=" + url + "&pic=" + pic;
                generateQr( this, url );
                return false;
                break;
            }
                window.open( to , "_blank", "top=100,left=200,width=648,height=618");
          }
        })
      };
      var launchFullscreen = function(element) {
        if(element.requestFullscreen) {
          element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
          element.msRequestFullscreen();
        };
      };
      var exitFullscreen = function(element) {
        if(document.exitFullscreen) {
          document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        };
      };
      var fullscreenChange = function(){
          if(isFullscreen){
            player.classList.remove('fullScreen');
            isFullscreen = false;
          }else{
            player.classList.add('fullScreen');
            isFullscreen = true;
          };
          barLen = bar.offsetWidth;
          return function(){
            setTimeout( function(){
              document.body.scrollTop = document.documentElement.scrollTop = playerLocation;
            },100 );
          }();
      }
      document.addEventListener("fullscreenchange", function () {
          fullscreenChange();
      }, false);
      document.addEventListener("mozfullscreenchange", function () {
          fullscreenChange();
      }, false);
      document.addEventListener("webkitfullscreenchange", function () {
          fullscreenChange();
      }, false);
      var callback = function(){ /* when video loaded, call this. */
        share(
          sidebar.querySelector('.share'),
          ele.querySelector('.text .title').innerHTML,
          window.location.protocol + '//' + window.location.host + window.location.pathname + '?point=1'
        );
        video.addEventListener( 'durationchange',  function(){
          video.currentTime = 0;
          duration = video.duration;
          player.querySelectorAll('.clock')[1].innerHTML
          = formatTime(parseInt(duration));
          player.querySelectorAll('.clock')[0].innerHTML
          = formatTime(0);
        });
      };
      player.querySelector('.call-to-cloth').addEventListener('click',function(e){ /* call cloth to play. */
          if(isFullscreen){
            exitFullscreen(player);
          }else{
            launchFullscreen(player);
            playerLocation = document.body.scrollTop || document.documentElement.scrollTop;
          }
        // cloth.classList.add('selected');
        // document.onmousewheel = document.onwheel = function(e){
        //   return false;
        // };
        // document.documentElement.style.overflow = 'hidden';
        // var cTime = video.currentTime;
        // if( !hasVideo ){
        //   cloth.querySelector('.clothContent').innerHTML = $(this).parents('.media-module')[0].innerHTML;
        //   mediaModule($('.private-home')[0].querySelector('#cloth .clothContent'),cTime); /* when clone, attach events. */
        // };
        // hasVideo = true;
        // return function(){
        //   cloth.querySelector('video').currentTime = cTime;
        // }();
      });
      play.addEventListener('click',function(e){ /* play button actions. */
        e.stopPropagation();
        if( video.paused ){
          videoCloth.classList.add('hide');
          sidebar.classList.remove('selected');
          this.classList.add('pause');
          this.classList.remove('stop');
          video.play();
        }else{
          videoCloth.classList.remove('hide');
          this.classList.remove('pause');
          this.classList.remove('stop');
          video.pause();
        };
      });
      [].forEach.call( volume.querySelectorAll('ul li'), function ( ele, index ){
        ele.addEventListener('click',function(){
          video.volume = index / 5 ;
          $(this).siblings('li').each(function(i, el) {
            i < index ? this.classList.add('selected') : this.classList.remove('selected');
          });
        })
      });
      videoCloth.querySelector('.play-button').addEventListener('click',function(){
        play.click();
      });
      player.querySelector('.call-share').addEventListener('click',function(){
        if(isFullscreen && !video.paused ){
          play.click();
        }else{
          sidebar.classList.toggle('selected');
        }
      });
      video.addEventListener('timeupdate', function(){
        var cTime = video.currentTime;
        player.querySelectorAll('.clock')[0].innerHTML = formatTime(parseInt(cTime));
        goon.style.left = ( cTime  / duration - 1 ) * 100 + '%';
        if( video.ended ){
          play.classList.remove('pause');
          goon.style.left = 0;
          video.src      = video.currentSrc;
          videoCloth.classList.remove('hide');
        };
      });
      // video.addEventListener('waiting', function(){
      //   play.click(); console.log("缓冲中");
      // });
      // video.addEventListener('playing', function(){
      //   play.click();
      // });
      player.addEventListener('mouseenter',function(){ /* when mouse stops on video, hide control. */
        if( 0 == video.currentTime ){
          return false;
        }
        var mouseStopOnVideoTimeout;
        control.classList.add('onshow');
        this.addEventListener('mousemove',function(){
          control.classList.add('onshow');
          clearTimeout(mouseStopOnVideoTimeout);
          mouseStopOnVideoTimeout = setTimeout(function(){
            control.classList.remove('onshow');
          },2000);
        })
        this.addEventListener('mouseleave',function(){
          control.classList.remove('onshow');
        });
      });
      video.addEventListener('click',function(){ /* click screen to pause. */
        play.click();
      });
      sidebar.querySelector('.close').addEventListener('click',function(){
        document.onmousewheel = document.onwheel = function(e){};
        document.documentElement.style.overflow = '';
        video.pause();
        cloth.classList.remove('selected');
        return function(){
          $('.private-home')[0].querySelector('.media-module video').currentTime = video.currentTime;
        }();
      });
      + function(){ /* for moving progress. */
        var xStart,xMoving,xEnd,hasMousedown = false,scrollBase,to;
        dot.onclick = function(e){
          e.preventDefault();
          e.stopPropagation();
        }
        dot.addEventListener('mousedown', function(e){
            xStart       = e.pageX;
            hasMousedown = true;
            scrollBase   = parseInt(goon.style.left) / 100;
            document.addEventListener('mousemove', function(e){
                if( hasMousedown == true ){
                  e.preventDefault();
                  xMoving = e.pageX;
                  var leftOn = (scrollBase + (xMoving - xStart) / barLen);
                  if( leftOn > 0){
                    goon.style.left = '0';
                    to = duration;
                  }else if( leftOn < -1 ){
                    goon.style.left = '-100%';
                    to = 0;
                  }else{
                    goon.style.left = leftOn * 100 + '%';
                    to = duration * (1 - Math.abs(leftOn));
                  }
                }
              });
            document.addEventListener('mouseup', function(e){
                if( hasMousedown ){
                  hasMousedown = false;
                  video.currentTime = Math.ceil(to);
                }
              });
          });
        bar.addEventListener('click',function(e){
          if( hasMousedown == true ){
            return false;
          }
          var e = e || window.event;
          video.currentTime = duration * ((e.clientX - bar.getBoundingClientRect().left) / barLen);
        },false);
      }();
      callback();
      return function(){
        video.addEventListener('durationchange',function(){
          this.currentTime = start;
        });
      }();
    };
    mediaModule($('.private-home')[0].querySelector('.media-module'),0);
  }();
  $(win).on('scroll', function() {
    var scrolltop = $(doc).scrollTop();
    // $(".clientlist-container .client-list .container").each(function() {
    //   var b = $(this).offset().top - 100;
    //   var c = $(this).nextUntil('.container').offset().top;
    //   var d = $(this).find('.client-title').attr('id');
    //   var e = "a[href='#" + d + "']";
    //   if (scrolltop < c && scrolltop > b) {
    //     $(".nav-sec ul li " + e).addClass('selected').parent().siblings().children('a').removeClass('selected');
    //   }
    // });
    $('.private-page .fixed-follow').each(function(){
      if( scrolltop < 80 ){
        var walk1 = 80 - scrolltop;
        $(this).css({
          marginTop: walk1
        });
      }
      else if( $('.footer-external').offset().top - scrolltop < 670 ){
        var walk2 = ($('.footer-external').offset().top - scrolltop) - 670;
        $(this).css({
          marginTop: walk2
        });
      }
      else{
        $(this).css({
          marginTop: 0
        });
      }
    })
    // $('.nav-sec').each(function() {
    //   var offset = $(this).offset().top;
    //   var top = parseInt($(this).css('top'), 10);
    //   if (!top) {
    //     top = 0;
    //   }
    //   var o = offset - top;
    //   var mis = Math.round(Math.max(0, scrolltop - o + 0));
    //   $(this).css({
    //     top: mis,
    //     position: 'relative'
    //   });
    // })
    var start_nav_pos = $(".common-banner").outerHeight();
    $('.nav-sec').each(function() {
      if (scrolltop > start_nav_pos) {
        $(this).addClass('fixed');
        if (!$(this).hasClass('hide')) {
          $(this).next().css("margin-top", "50px");
        }
      } else {
        $(this).removeClass('fixed').next().css("margin-top", 0);
      }
    })
    $('.level-three-groups').each(function() {
      var offset = $(this).offset().top;
      var top = parseInt($(this).css('top'), 10);
      if (!top) {
        top = 0;
      }
      var o = offset - top;
      var mis = Math.round(Math.max(0, scrolltop - o + 0));
      // if ($(document).height() - $(document).scrollTop() > 1000) {
      //   $(this).css({
      //     top: mis,
      //     position: 'relative'
      //   });
      // }

      function highlight(b) {
          var id = b.prop('id');
          var menu = $('.level-three-menu .sub-menu-term[data-id="' + id + '"]');
          if (menu.length < 0) {
            return;
          }
          if (menu.hasClass('selected')) {
            return;
          } else {
            var p = menu.parent().parent();
            p.addClass('active');
            p.siblings().removeClass('active');
          }
          $('.level-three-menu .sub-menu-term').each(function() {
            $(this).toggleClass('selected', $(this).data('id') == id);
          });
        }
        // Update the menu selection.
      var content = $(this).siblings('.with-menu');
      if (content.is(':visible')) {
        var last = undefined;
        var blocks = content.find('>div, >h1');
        for (var i = 0; i < blocks.length; i++) {
          var block = blocks.eq(i);
          var pos = block.offset();
          var top = Math.ceil(pos.top);
          var bottom = Math.ceil(pos.top + block.outerHeight());
          if (scrolltop + 1 < bottom && top - 10 < scrolltop + $(win).height()) {
            highlight(block);
            break;
          }
        }
      }
    });

    $('.pricingItems').each(function() {
      var top = parseInt($(this).data('top'), 10);
      if (!top || isNaN(top)) {
        top = $(this).offset().top;
        $(this).data('top', top);
      };
      var footer = $('.footer-external');
      if (170 + $(this).height() + scrolltop >= footer.offset().top) {
        $(this).removeClass('fixed').addClass('moveBottom');
      } else {
        $(this).removeClass('moveBottom');
        $(this).toggleClass('fixed', top - scrolltop < 20);
      }
    });

    // $('.common-banner.min').each(function() {
    //   if (scrolltop < 360) {
    //     var mis = Math.round(scrolltop * .6);
    //     $(this).find('.banner-content').css({
    //       transform: 'translateY(' + mis + 'px)',
    //       webkitTransform: 'translateY(' + mis + 'px)',
    //       mozTransform: 'translateY(' + mis + 'px)',
    //       msTransform: 'translateY(' + mis + 'px)'
    //     });
    //   } else {
    //     $(this).find('.banner-content').css({
    //       transform: 'none',
    //       webkitTransform: 'none',
    //       mozTransform: 'none',
    //       msTransform: 'none'
    //     });
    //   }
    // });
    return;
  });
  $(win).trigger('scroll');
  $(document).scrollTop(0)
})(document, window);