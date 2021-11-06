class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {

    if (!this.isAllowed()) {
      return console.log(`NSF. Balance: ${this.account.balance}`);
    }

    this.time = new Date();
    this.account.addTransaction(this);
    return true;

  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {

    return (this.account.balance - this.amount >= 0)

  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount
  }

  isAllowed() {
    return true;
  }

}

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {

    let balance = 0

    this.transactions.forEach((element => {
      balance += element.value;
    }))

    return balance;

  };

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


const myAccount = new Account("Bruh-Mode");

console.log('before transactions:\n', myAccount, myAccount.balance, '\n');
const t1 = new Deposit(120.00, myAccount);
t1.commit();
// console.log(myAccount);
// console.log('Transaction 1:', t1)
// console.log('Balance:', myAccount.balance)

const t2 = new Withdrawal(500.25, myAccount);
t2.commit();
// console.log(myAccount)
// console.log('Transaction 2:', t2);
// console.log('Balance:', myAccount.balance)

const t3 = new Withdrawal(9.99, myAccount);
t3.commit();
// console.log('Transaction 3:', t3);
// console.log('Balance:', myAccount.balance)

console.log('after:\n', myAccount, myAccount.balance)
