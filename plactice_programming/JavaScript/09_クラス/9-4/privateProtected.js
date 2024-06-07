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

    // コーヒーメーカーを生成
    let coffeeMachine = new CoffeeMachine(100);

    // 水を追加
    coffeeMachine.waterAmount = -10; // _waterAmountは-10ではなく、0になる
}

// 読み取り専用(Read-Only)の"power"
// powerプロパティは作成時のみに設定し、それ以降変更しないプロパティに変える
// getterのみを作成し、setterは作成しない
{
    class CoffeeMachine {
        constructor(power) {
            this._power = power;
        }

        get power() {
            return this._power;
        }
    }

    // コーヒーメーカーを作成
    let coffeeMachine = new CoffeeMachine(100);

    alert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W

    coffeeMachine.power = 25; // Error: setterがないため
}

// getter/setter関数
// 接頭語にgetやsetがつく名前が好まれる
{
    class CoffeeMachine {
        _waterAmount = 0;

        setWaterAmount(value) {
            if (value < 0) throw new Error("Negative water");
            this._waterAmount = value;
        }

        getWaterAmount() {
            return this._waterAmount;
        }
    }

    new CoffeeMachine().setWaterAmount(100);
}

// Private "#waterLimit"
// プライベートは#から始める必要がある
// 例えばプライベートな#waterLimitプロパティを追加し、水量をチェックするロジックを別のメソッドに抜き出している
{
    class CoffeeMachine {
        #waterLimit = 200;

        #fixWaterAmount(value) {
            if (value < 0) return 0;
            if (value > this.#waterLimit) return this.#waterLimit;
        }

        setWaterAmount(value) {
            this.#waterLimit = this.#fixWaterAmount(value);
        }
    }

    let coffeeMachine = new CoffeeMachine();

    // cant't access privates from outside of class
    // Error: coffeeMachine.#fixWaterAmount(123);
    // Error: coffeeMachine.#waterLimit = 1000; 
}

// 言語レベルで#はフィールドがプライベートであることを示す記号
// 外側や継承したクラスからアクセスすることができない
{
    class CoffeeMachine {
        #waterAmount = 0;

        get waterAmount() {
            return this.#waterAmount;
        }

        set waterAmount(value) {
            if (value < 0) value = 0;
            this.#waterAmount = value;
        }
    }

    let machine = new CoffeeMachine();

    machine.waterAmount = 100;
    // Error: alert(machine.#waterAmount);
}

// CoffeeMachineを継承した場合、#waterAmountへアクセスするにはgetter/setterを経由する必要がある
{
    class CoffeeMachine extends CoffeeMachine() {
        method() {
            alert(this.#waterAmount); // Error: CoffeeMachineからのみアクセス可能
        }
    }
}

