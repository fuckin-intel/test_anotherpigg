function e_click() {
  var cs = document.getElementById('e_click');
  var ctx2 = cs.getContext('2d');
  var w = cs.width;
  var h = cs.height;
  var x_destination = 0;//クリック座標＝自キャラの目的地
  var y_destination = 0;//
  var x_orgin = 0;//自キャラの直前の位置
  var y_orgin = 0;//

  var img = new Image();
  img.src = "js/mychar.png?" + new Date().getTime();
  /* 画像が読み込まれるのを待ってから処理を続行 */
  img.onload = function() {
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

    draw();
  }

  function draw() {
    ctx2.clearRect(0, 0, w, h);
    ctx2.fillRect(x_orgin, y_orgin, 10, 10);
    ctx2.beginPath();     // 1.Pathで描画を開始する
    ctx2.moveTo(x_orgin, y_orgin); // 2.描画する位置を指定する
    ctx2.lineTo(x_destination, y_destination); // 3.指定座標まで線を引く
    ctx2.stroke();        // 4.Canvas上に描画する
    ctx2.drawImage(img, x_destination, y_destination);
  }

  cs.addEventListener('click', onClick, false);
}
e_click();

(function() {
  //"use strict";

  //初期設定
  var canvas = document.getElementById("e_click"), //Canvasの要素を取得
      ctx = canvas.getContext("2d"), //Canvasのcontextを取得
      cx = -30,
      cy = canvas.height / 2;

  ctx.fillStyle = "#28a6c2";

  move();

  function move() {
    cx += 2;
    if(cx > canvas.width + 30)
     cx = -30;
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(cx, cy, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    window.requestAnimationFrame(move);
  }

})()
