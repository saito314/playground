"use strict";

// extendsキーワード
{
    class Animal {
        constructor(name) {
            this.speed = 0;
            this.name = name;
        }
        run(speed) {
            this.speed += speed;
            alert(`${this.name} runs with speed ${this.speed}.`);
        }
        stop() {
            this.speed = 0;
            alert(`${this.name} stopped.`);
        }
    }

    let animal = new Animal("My animal");
}

// Animalを継承したclass Rabbitを作成する
{
    class Rabbit extends Animal {
        hide() {
            alert(`${this.name} hides!`);
        }
    }

    let rabbit = new Rabbit("White Rabbit");

    rabbit.run(5); // white Rabbit runs with speed 5.
    rabbit.hide(); // White Rabbit hides!
}

