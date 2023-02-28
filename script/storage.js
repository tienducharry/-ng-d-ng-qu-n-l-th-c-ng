'use strict';

// save
function saveToStorage (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    };
//get
function getFromStorage (key) {
    return JSON.parse(localStorage.getItem(key));
    };


