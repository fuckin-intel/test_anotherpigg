onload = function() {
  draw();
};
function draw() {
  var canvas = document.getElementById('c1');
  if ( ! canvas || ! canvas.getContext ) { return false; }
  var ctx = canvas.getContext('2d');
  /* Imageオブジェクトを生成 */
  var img = new Image();
  img.src = "js/fuku.png?" + new Date().getTime();
  /* 画像が読み込まれるのを待ってから処理を続行 */
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  }
}

function e_click() {
  var cs = document.getElementById('e_click');
  var ctx2 = cs.getContext('2d');
  var w = cs.width;
  var h = cs.height;
  var x = 0;
  var y = 0;



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


    x = e.clientX - rect.left;
    y = e.clientY - rect.top;

    draw();
  }

  function draw() {
    ctx2.clearRect(0, 0, w, h);
    ctx2.fillRect(x, y, 10, 10);




    ctx2.drawImage(img, x, y);
  }

  cs.addEventListener('click', onClick, false);
}
e_click();