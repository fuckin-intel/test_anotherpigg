function e_click() {
  var cs = document.getElementById('e_click');
  var ctx2 = cs.getContext('2d');
  var w = cs.width;
  var h = cs.height;
  var x_clientavator = 0;//自分の現在位置
  var y_clientavator = 0;//
  var x_clientavator_previous = 0;//自分の直前の位置
  var y_clientavator_previous = 0;//

  var img = new Image();
  img.src = "js/fuku.png?" + new Date().getTime();
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
    x_clientavator_previous = x_clientavator;
    y_clientavator_previous = y_clientavator;
    x_clientavator = e.clientX - rect.left;
    y_clientavator = e.clientY - rect.top;

    draw();
  }

  function draw() {
    ctx2.clearRect(0, 0, w, h);
    ctx2.fillRect(x_clientavator, y_clientavator, 10, 10);
    ctx2.beginPath();     // 1.Pathで描画を開始する
    ctx2.moveTo(x_clientavator_previous, y_clientavator_previous); // 2.描画する位置を指定する
    ctx2.lineTo(x_clientavator, y_clientavator); // 3.指定座標まで線を引く
    ctx2.stroke();        // 4.Canvas上に描画する
    ctx2.drawImage(img, x_clientavator, y_clientavator);
  }

  cs.addEventListener('click', onClick, false);
}
e_click();