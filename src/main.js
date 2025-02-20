"use strict";
import "./style.css";

const inputTextEl = document.querySelector(".input-text");
const inputNumberEl = document.querySelector(".input-number");
const form = document.querySelector(".form");

let inputText;
let inputNum;

inputTextEl.addEventListener("input", function (e) {
  inputText = e.target.value;
});

inputNumberEl.addEventListener("input", function (e) {
  inputNum = e.target.value;
});

class Expense {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.id = crypto.randomUUID();
  }
}

class ExpenseManager {
  constructor() {
    this.expenses = [];
  }

  add(exp) {
    this.toDos.push(exp);
  }

  filter(item) {
    this.expenses = this.expenses.filter((exp) => exp.id !== item.id);
  }
}

const manager = new ExpenseManager();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const expense = new Expense();
});
