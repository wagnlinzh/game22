var gameTimes=3;//游戏次数
var isWin=false;
var cardNums=12;//初始值,会被col和row值修改.
var timer1;
var col=4;//列数,理解为x轴方向上card的数目
var row=3; //行数,理解为y轴方向上card的数量


var isIE8 = function () {
  var UA = navigator.userAgent,
  isIE = UA.indexOf('MSIE') > -1,
  v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
  return v == 8;
}();

$.fn.extend({
  animateCss: function (animationName,randomNum) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(this).addClass('animated ' + animationName).one(animationEnd, function() {


      $(this).removeClass('animated ' + animationName).addClass('afterClick');
      if (randomNum==0) {
        $(this).css("background-image","url('./images/game/ku.png')");
      }else{
        $(this).css("background-image","url('./images/game/haha.png')");
      }
    });
  }
});

//构造场景
$(function(){
  // 立即执行函数
  var gameBoxWidth=col*130+20,
  gameBoxHeight=row*150+54;
  $(".gameBox").css("width",gameBoxWidth);
  $(".gameBox").css("height",gameBoxHeight);

  cardNums= col*row;
  console.log(cardNums);

  (function AddCards(n) {
    var str='';
    for (var i = 1; i <= n; i++) {
      str+="<div class='card card"+i+"'></div>";
    }
    $(".gameBody").html(str);
    // $(".gameBody .card").css("background","#00BCD4");
  })(cardNums);
});


// 这段代码是wanglinzhizhi写的, 内容估计比较不容易看懂. 功能上 简而言之,就是为了实现生成随机数的同时实现翻牌效果. 并降级iE8 对iE8 没有翻转的效果.
/*
每一次翻牌有中奖和不中奖两种状态.
有三次翻牌机会.

需要三次中中奖的概率控制在70%
只要三次中有一次中奖就算中奖.故转化为至少有一次中奖的概率为70%.



那么三次都不中奖的概率为30%.

设中奖概率为p
(1-p)*(1-p)*(1-p)=.3

p=0.58
做法是, 每次使其可能中奖的概率控制在0.89, 三次都不中奖的该概率.
*/

//gameTimes 为 3 ,所以 0.89x0.89x0.89 = 0.7049 中奖概率0.7049
$(document).ready(function (e) {
  $(".card").on('click',function(event) {
    event.stopPropagation();

    $(".transparentCoverTemp").addClass("transparentCover");

    if (gameTimes == 0) {
      alert("您的机会用完啦~~~(T_T)")
    }

    clearTimeout(timer1);

    var probability7Win = 100;
    var randomNum=-1;
    while(probability7Win>=100 || probability7Win <= 0){
      probability7Win = parseInt(Math.random()*100);
    }

    // if (probability7Win > 19) { // 不是666 的概率
    //
    //   //碰撞检测,randomNum 是一个三位数,直到取得的数据大于100为止.额一定是小于1000的
    //   while (randomNum <=100) {
    //     randomNum= parseInt(Math.random()*1000);
    //   }
    //   var currentCard=$(this);
    //   if (isIE8) {
    //     $(currentCard).addClass("afterClick").text(randomNum);
    //
    //     timer1=setTimeout(function(){
    //       $(".transparentCoverTemp").removeClass("transparentCover");
    //       gameTimes--;
    //     },1500);
    //   }else{
    //     $(currentCard).animateCss('flipOutX',randomNum);
    //     timer1=setTimeout(function(){
    //       $(".transparentCoverTemp").removeClass("transparentCover");
    //       gameTimes--;
    //     },1500);
    //   }
    // }else{                  //666 的情况
    //   isWin=true;
    //   if (isIE8) {
    //     $(currentCard).addClass("afterClick").text(666);
    //     timer1=setTimeout(function(){
    //       $(".transparentCoverTemp").removeClass("transparentCover");
    //       gameTimes--;
    //     },1500);
    //   }else{
    //     $(currentCard).animateCss('flipOutX',666);
    //     timer1=setTimeout(function(){
    //       $(".transparentCoverTemp").removeClass("transparentCover");
    //       gameTimes--;
    //     },1500);
    //   }
    // }

    //碰撞检测,randomNum 是一个三位数,直到取得的数据大于100为止.额一定是小于1000的
    // while (randomNum <=100) {
    //   randomNum= parseInt(Math.random()*1000);
    // }
    var currentCard=$(this);
    if (isIE8 && gameTimes>0) {                  //ie8 - if
      if (probability7Win>19) {  //NOT win
        $(currentCard).addClass("afterClick").css("background-image","url('./images/game/ku.png')");
        timer1=setTimeout(function(){
          $(".transparentCoverTemp").removeClass("transparentCover");
          // gameTimes--;
        },1500);
        gameTimes--;
      } else {                  //win
        $(currentCard).addClass("afterClick").css("background-image","url('./images/game/haha.png')");
        timer1=setTimeout(function(){
          $(".transparentCoverTemp").removeClass("transparentCover");
          // gameTimes--;
        },1500);
        gameTimes--;
      }
    }else if (gameTimes>0){                        //NOT iE8 -else
      if (probability7Win>19) {  //NOt win randomNum=0
        randomNum=0;
        $(currentCard).animateCss('flipOutX',randomNum);
        timer1=setTimeout(function(){
          $(".transparentCoverTemp").removeClass("transparentCover");
          // gameTimes--;
        },1500);
        gameTimes--;
      } else {                     //Winer randomNum=1
        $(currentCard).animateCss('flipOutX',1);
        timer1=setTimeout(function(){
          $(".transparentCoverTemp").removeClass("transparentCover");
          // gameTimes--;
        },1500);
        gameTimes--;
      }
    }

    console.log("gameTimes = ",gameTimes);
    $("#gameTimes").text("gameTimes = "+gameTimes);

  });

  $(".tipsHeader p span").click(function(){
    $(".gameMessageBox").hide();
  });
});
