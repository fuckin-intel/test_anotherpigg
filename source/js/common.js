(function() {
  //"use strict";

  //初期設定
  var wrap = document.getElementById("wrap");//Div id=wrapの要素を取得
  var cs = document.getElementById("e_click");//Canvas id=e_clickの要素を取得
  var ctx = cs.getContext("2d");  //Canvasのcontextを取得

  function sizing(){
    cs.width = wrap.offsetWidth;
    cs.height = wrap.offsetHeight;
  }
  sizing();

  ctx.fillStyle = "#28a6c2";//線を引くときの色

  var x_current = 0, y_current = 0;

  var img = new Image();
  //img.src = "js/mychar.png?" + new Date().getTime();
  img.src = "js/mychar.png";
  /* 画像が読み込まれるのを待ってから処理を続行 */
  img.onload = function() {
  }

  var w = cs.width;
  var h = cs.height;
  var x_destination = 0;//クリック座標＝自キャラの目的地
  var y_destination = 0;//
  var x_orgin = 0;//自キャラの直前の位置
  var y_orgin = 0;//

  move();

  function move() {
    var x_sign = Math.sign(x_destination - x_orgin);//向きを計算
    var y_sign = Math.sign(y_destination - y_orgin);//
    if(x_sign == 1){//右へ移動の場合
      if(x_current < x_destination)
        x_current += 5;
      else
        x_orign = x_current;
    }else if (x_sign == -1){//左へ移動の場合
      if(x_destination < x_current)
        x_current -= 5;
      else
        x_orign = x_current;
    }
    if(y_sign == 1){//下へ移動の場合
      if(y_current < y_destination)
        y_current += 5;
      else
        y_orign = y_current;
    }else if (y_sign == -1){//上へ移動の場合}
      if(y_destination < y_current)
        y_current -= 5;
      else
        y_orign = y_current;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.fillRect(x_orgin, y_orgin, 10, 10);
    ctx.drawImage(img, x_current, y_current);
    window.requestAnimationFrame(move);
  }

  function onClick(e) {
    /*
     * rectでcanvasの絶対座標位置を取得し、
     * クリック座標であるe.clientX,e.clientYからその分を引く
     * ※クリック座標はdocumentからの位置を返すため
     * ※rectはスクロール量によって値が変わるので、onClick()内でつど定義
     */
    var rect = e.target.getBoundingClientRect();
    x_orgin = x_destination;
    y_orgin = y_destination;
    x_destination = e.clientX - rect.left;
    y_destination = e.clientY - rect.top;
  }

  var timeoutId ;

  window.addEventListener( "resize", function () {
    // リサイズを停止して200ms後に終了とする
    clearTimeout( timeoutId ) ;
  
    timeoutId = setTimeout( function () {
      // キャンバスサイズを変更
      sizing();
    }, 200 ) ;
  } ) ;
  
  cs.addEventListener('click', onClick, false);

})()
