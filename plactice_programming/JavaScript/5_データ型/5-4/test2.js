"use strict";

let styles = ["Jazz", "Blues"];
styles.push("Rock-nRoll");
styles[Math.floor((styles.length - 1) / 2)] = "Classics";
alert(styles.slice(1));
styles.unshift("Rap", "Reggae");