"use strict";

// 静的プロパティとメソッド
// クラス全体にメソッドを割り当てることもできる
// このようなメソッドはstatic(静的)と呼ばれる
{
    class User {
        static staticMethod() {
            alert(this == User);
        }
    }

    User.staticMethod(); // true
}

// 実際にはプロパティとして直接割り当てるのと同じことをする
{
    class User {}

    User.staticMethod = function() {
        alert(this === User);
    };

    User.staticMethod(); // true
}

// 通常staticMethodはクラスには属するが、特定のオブジェクトには属さない関数を実装するのに使用される
{
    class Article {
        constructor(title, date) {
            this.title = title;
            this.date = date;
        }

        static compare(articleA, articleB) {
            return articleA.date - articleB.date;
        }
    }

    // usage
    let articles = [
        new Article("Mind", new Date(2019, 1, 1)),
        new Article("Body", new Date(2019, 0, 1)),
        new Article("JavaScript", new Date(2019, 11, 1))
    ];

    articles.sort(Article.compare);

    alert(articles[0].title); // title
}

// ここではArticle.compareは記事を比較する手段として記事の上位にいる
// 記事メソッドというよりはクラス全体のメソッド
{
    class Article {
        constructor(title, date) {
            this.title = title;
            this.date = date;
        }

        static createTodays() {
            // this = Article
            return new this("Today's digest", new Date());
        }
    }

    let article = Article.createTodays();

    alert(artcile.title); // Today's digest
}

// 静的メソッドは次のようにデータベース関連クラスでデータベースの検索/保存/削除のためにも使用される
{
    // Articleは記事を管理するための特別ねクラスと仮定する
    // 記事を削除するためのstaticメソッド
    Article.remove({id: 12345});
}

// 静的プロパティ
// 静的プロパティも可能で、通常のクラスプロパティと同じように見えるが、先頭にstaticがつく
{
    class Article {
        static publisher = "Ilya Kantor";
    }

    alert(Article.publisher); // Ilya Kantor

    // これは直接Articleに代入することと同じ
    Article.publisher = "Ilya Kantor";
}

// 静的プロパティとメソッドの継承
// 静的プロパティとメソッドは継承される
// 例えば以下のコードのAnimal.compareとAnimal.planetは継承され、Rabbit.compareとRabbit.planetとしてアクセス可能
{
    class Animal {
        static planet = "Earth";

        constructor(name, speed) {
            this.speed = speed;
            this.name = name;
        }

        run(speed = 0) {
            this.speed += speed;
            alert(`${this.name} runs with speed ${this.speed}.`);
        }

        static compare(animalA, animalB) {
            return animalA.speed - animalB.speed;
        }
    }

    // Inherit from Animal
    class Rabbit extends Animal {
        hide() {
            alert(`${this.name} hides!`);
        }
    }

    let rabbits = [
        new Rabbit("White Rabbit", 10),
        new Rabbit("Black Rabbit", 5),
    ]

    rabbits.sort(Rabbit.compare);

    rabbits[0].run(); // Black Rabbit runs with speed 5.

    alert(Rabbit.planet); // Earth
}

// 通常、継承は通常のものと静的なメソッド両方で機能する
{
    class Animal {}
    class Rabbit extends Animal {}

    // 静的
    alert(Rabbit.__proto__ === Animal); // true

    // 通常のメソッド
    alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
}
