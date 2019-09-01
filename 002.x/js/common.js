(function() {
  //"use strict";

  //初期設定
  var wrap = document.getElementById("wrap");//Div id=wrapの要素を取得
  var cs = document.getElementById("e_click");//Canvas id=e_clickの要素を取得
  var ctx = cs.getContext("2d");  //Canvasのcontextを取得
  ctx.fillStyle = "#28a6c2";//線を引くときの色

  function sizing(){
    cs.width = wrap.offsetWidth;
    cs.height = wrap.offsetHeight;
  }
  sizing();

  var x_current = 0, y_current = 0;//初期値

  var img = new Image();//SVG画像を入れるインスタンス
  var img_wear = new Image();
  img.src = "../pic/Avator/avator_body.svg?" + new Date().getTime();
  img_wear.src = "../pic/Wear/Cloth/Tops/topps_sample.svg?" + new Date().getTime();
  /* 画像が読み込まれるのを待ってから処理を続行 */
  img.onload = function() {}
  img_wear.onload = function() {}

  var w = cs.width, h = cs.height;
  var x_destination = 0, y_destination = 0;//クリック座標＝自キャラの目的地
  var x_orgin = 0, y_orgin = 0;//自キャラの直前の位置
  var lastTime = performance.now();

  move();

  function move() {
    var nowTime = performance.now();
    var moveLength = (nowTime - lastTime) / 2;
    lastTime = nowTime;

    var x_sign = Math.sign(x_destination - x_orgin);//向きを計算
    var y_sign = Math.sign(y_destination - y_orgin);//
    if(x_sign == 1){//右へ移動の場合
      if(x_current < x_destination)
        x_current += moveLength;
      else
        x_orign = x_current;
    }else if (x_sign == -1){//左へ移動の場合
      if(x_destination < x_current)
        x_current -= moveLength;
      else
        x_orign = x_current;
    }
    if(y_sign == 1){//下へ移動の場合
      if(y_current < y_destination)
        y_current += moveLength;
      else
        y_orign = y_current;
    }else if (y_sign == -1){//上へ移動の場合}
      if(y_destination < y_current)
        y_current -= moveLength;
      else
        y_orign = y_current;
    }
    ctx.clearRect(0, 0, w, h);
    ctx.fillRect(x_orgin, y_orgin, 10, 10);
    ctx.drawImage(img, x_current, y_current);
    ctx.drawImage(img_wear, x_current+62, y_current+265,150,130);
    window.requestAnimationFrame(move);
  }

  function onClick(e) {
    /*
     * rectでcanvasの絶対座標位置を取得し、
     * クリック座標であるe.clientX,e.clientYからその分を引く
     * ※クリック座標はdocumentからの位置を返すため
     * ※rectはスクロール量によって値が変わるので、onClick()内でつど定義
     */
    //for(var i=0; i<10; i++;){
//
  //  }
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
    timeoutId = setTimeout( function () {// キャンバスサイズを変更
    sizing();
    }, 200 );
  });
  
  cs.addEventListener('click', onClick, false);

})()
