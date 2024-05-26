"use strict";

// "protect"する
{
    class CoffeeMachine {
        waterAmount = 0; // 内部の水の量

        constructor(power) {
            this.power = power;
            alert(`Created a coffee-machine, power: ${power}`);
        }
    }

    // コーヒーメーカーを生成
    let coffeeMachine = new CoffeeMachine(100);

    // 水を追加
    coffeeMachine.waterAmount = 200;
}

// waterAmountとpowerはpublic
// より細かく制御できるようにwaterAmountをprotectedに変更する
// protectedプロパティは通常アンダースコアで始まる
{
    class CoffeeMachine {
        _waterAmount = 0;

        set waterAmount(value) {
            if (value < 0) {
                value = 0;
            }
            this._waterAmount = value;
        }

        get waterAmount() {
            return this._waterAmount;
        }

        constructor(power) {
            this._power = power;
        }
    }
    
}