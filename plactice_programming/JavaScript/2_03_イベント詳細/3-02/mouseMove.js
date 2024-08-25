"use strict";


// 移動: mouseover/out, mouseenter/leave


// Mouseover/mouseout, relatedTarget
// mouseoverイベントはマウスポインタが要素の上に来るときに発生し、mouseoutはそこを離れるときにイベントが発生する
// 2つのイベントはrelatedTargetを持っているという点で特別
// mouseover
// event.target: マウスが来た要素
// event.relatedTarget: マウスが来た元の要素
// mouseout
// event.target: マウスが離れた要素
// event.relatedTarget: 新たなポインタの下の要素
