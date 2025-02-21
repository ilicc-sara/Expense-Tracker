"use strict";
import "./style.css";

const inputTextEl = document.querySelector(".input-text");
const inputNumberEl = document.querySelector(".input-number");
const form = document.querySelector(".form");
const itemContainer = document.querySelector(".items-container");
const balanceNumberEl = document.querySelector(".balance-num");

const incomeNumber = document.querySelector(".income-num");
const expenseNumber = document.querySelector(".expense-num");

let inputText;
let inputNum;

inputTextEl.addEventListener("input", function (e) {
  inputText = e.target.value;
});

inputNumberEl.addEventListener("input", function (e) {
  inputNum = e.target.value;
});

class Transaction {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.id = crypto.randomUUID();
  }
}

class TransactionManager {
  constructor() {
    this.transactions = [];
    this.totalBalance = 0;

    this.totalIncome = 0;
    this.totalExpense = 0;
  }

  add(exp) {
    this.transactions.push(exp);
  }

  filter(id) {
    this.transactions = this.transactions.filter((exp) => exp.id !== id);
  }

  balance() {
    return (this.totalBalance = this.transactions.reduce((acc, cur) => {
      return acc + Number(cur.price);
    }, 0));
  }

  positiveBalance() {
    return (this.totalIncome = this.transactions
      .filter((item) => Number(item.price) > 0)
      .reduce((acc, cur) => {
        return acc + Number(cur.price);
      }, 0));
  }

  negativeBalance() {
    return (this.totalIncome = this.transactions
      .filter((item) => Number(item.price) < 0)
      .reduce((acc, cur) => {
        return acc - Number(cur.price);
      }, 0));
  }
}

const manager = new TransactionManager();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (inputNum === "0" || inputNum === undefined) {
    alert("Expense numbers should be real numbers only!");
  } else {
    const expense = new Transaction(inputText, inputNum);
    manager.add(expense);

    const item = document.createElement("li");
    item.innerHTML = `<button class="delete">X</button><span>${inputText}</span> <span>$ ${inputNum}</span>`;
    item.setAttribute("data-id", expense.id);
    itemContainer.appendChild(item).className = "item";

    Math.sign(inputNum) === 1
      ? (item.style.borderRightColor = "green")
      : (item.style.borderRightColor = "red");
  }

  balanceNumberEl.textContent = manager.balance();
  incomeNumber.textContent = `$ ${manager.positiveBalance()}`;
  expenseNumber.textContent = `$ ${manager.negativeBalance()}`;

  inputNumberEl.value = "";
  inputTextEl.value = "";
});

itemContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("delete")) return;

  const targetId = e.target.closest(".item").getAttribute("data-id");
  const targetEl = e.target.closest(".item");

  manager.filter(targetId);

  targetEl.remove();
});
