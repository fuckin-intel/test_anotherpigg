(function() {
  //"use strict";

  //初期設定
  var cs = document.getElementById("e_click");//Canvasの要素を取得
  var ctx = cs.getContext("2d");  //Canvasのcontextを取得
  ctx.fillStyle = "#28a6c2";

  var x_current = 0, y_current = 0;

  var img = new Image();
  img.src = "./js/mychar.png?" + new Date().getTime();
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
    var x_sign = Math.sign(x_destination - x_orgin)
    var y_sign = Math.sign(y_destination - y_orgin)
    if(x_sign == 1){
      if(x_current < x_destination)
        x_current += 2;
      else
        x_orign = x_current;
    }else if (x_sign == -1){
      if(x_destination < x_current)
        x_current -= 2;
      else
        x_orign = x_current;
    }
    if(y_sign == 1){
      if(y_current < y_destination)
        y_current += 2;
      else
        y_orign = y_current;
    }else if (y_sign == -1){
      if(y_destination < y_current)
        y_current -= 2;
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

  cs.addEventListener('click', onClick, false);

})()
