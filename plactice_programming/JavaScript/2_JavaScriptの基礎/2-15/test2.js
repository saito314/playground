"use strict";

function checkAge(age) {
    return (age > 18) ? true : confirm('Do you have your parents permission to access this page?');
}

function checkAge1(age) {
    return (age > 18) || confirm('Do you have your parents permission to access this page?');
}