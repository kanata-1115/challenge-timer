'use strict';

// 表示領域
let hours_area = document.querySelector('#hours');
let sec_area = document.querySelector('#sec');
let min_area = document.querySelector('#min');

// 入力欄
let hours_inp = document.querySelector('#hours_inp');
let sec_inp = document.querySelector('#sec_inp');
let min_inp = document.querySelector('#min_inp');

// 各ボタン
const start = document.querySelector('#start_btn');
const stop = document.querySelector('#stop_btn');
const reset = document.querySelector('#reset_btn');

// 残り時間
let rest = 0;
// タイマー
let timer;
let ending_animation = null;


// 関数宣言 arrange_num
// 文字揃える用
function arrange_num(num) {
  return num.toString().padStart(2, '0');
}

// 関数宣言 display_update
// 画面更新用
function display_update() {
  // 残り時間の計算をする
  // 60を超えないようにする
  let hours = Math.floor(rest / 1000 / 60 / 60);
  let min = Math.floor(rest / 1000 / 60) % 60;
  let sec = Math.floor(rest / 1000) % 60;

  // 画面に表示する
  hours_area.textContent = arrange_num(hours);
  min_area.textContent = arrange_num(min);
  sec_area.textContent = arrange_num(sec);
}

// 関数宣言 countdown
// 時間を一秒ずつ減らす
function count_down() {
  // 残り時間が0になったら
  if (rest <= 0) {
    // タイマーを停止
    clearInterval(timer);

    timer = null;
    display_update();
    ending_animation_start();

    return;
  }
  // 1000ミリ秒ずつ減らす
  rest -= 1000;

  // 画面更新用の関数宣言を呼び出す
  display_update();
}

// 関数宣言 ending_animation_start
// 0になったら起こす演出
function ending_animation_start() {
  let section = document.querySelector('section');
  ending_animation = setInterval(() => {
    section.classList.add('timer_end');
  }, 500);
}

// 関数宣言 ending_animation_end
// 起こした演出を止める
function ending_animation_end() {
  clearInterval(ending_animation);
  document.querySelector('section').classList.remove('timer_end');
}




// スタートボタンをクリックしたら入力された数字の反映とタイマーを起動させる

start.addEventListener('click', () => {

  timer = null;

  ending_animation_end();

  // 数字が入力されているまたは0になっている
  let hours_inp_value = parseInt(hours_inp.value) || 0;
  let min_inp_value = parseInt(min_inp.value) || 0;
  let sec_inp_value = parseInt(sec_inp.value) || 0;


  if (rest === 0) {

    // 残り時間restに入力された文字をミリ秒直して代入する
    // (n時間×60分×60秒+n分×60秒+n秒)×1000ミリ秒
    rest = (hours_inp_value * 60 * 60 + min_inp_value * 60 + sec_inp_value) * 1000;
  }

  // タイマーtimerに1000ミリ秒ごとに時間を一秒ずつ減らす関数宣言を代入する
  // setInterval(呼び出したい関数名,呼び出すまでのミリ秒)
  timer = window.setInterval(count_down, 1000);
  // 画面更新用の関数宣言を呼び出す
  display_update();

});

// ストップボタンでタイマーの時間経過を止める
stop.addEventListener('click', () => {
  // clearInterval()メソッドはsetInterval()メソッドで始まった処理を止める
  clearInterval(timer);
  timer = null;

  ending_animation_end()
});

// リセットボタンで0に戻す
reset.addEventListener('click', () => {
  clearInterval(timer);

  timer = null;
  rest = 0;

  // 表示リセット
  hours_area.textContent = '00';
  min_area.textContent = '00';
  sec_area.textContent = '00';

  ending_animation_end();
});