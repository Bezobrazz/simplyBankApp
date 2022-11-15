'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const informationText = document.querySelector('.operation__title');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseNickname = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const operationCloseTitle = document.querySelector('.operation--close_title');

const deletelConfirmationModal = document.querySelector('.modal__container');
const deletelConfirmationYes = document.querySelector('.modal__btn-yes');
const deletelConfirmationNo = document.querySelector('.modal__btn-no');

const displayTransactions = function (transactions) {
  containerTransactions.innerHTML = '';

  transactions.forEach(function (trans, index) {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';
    const transactionsRow = `
		<div class="transactions__row">
		<div class="transactions__type transactions__type--${transType}">
			${index + 1} ${transType}
		</div>
		<div class="transactions__value">${trans}$</div>
	</div>`;

    containerTransactions.insertAdjacentHTML('afterbegin', transactionsRow);
  });
};
displayTransactions(account1.transactions);

const createNickName = function (accs) {
  accs.forEach(function (acc) {
    acc.nickName = acc.userName
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createNickName(accounts);
console.log(accounts);

const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc, elem) => acc + elem, 0);
  account.balance = balance;
  labelBalance.textContent = `${balance}$`;
};

const displayTotal = function (account) {
  const dipositTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = `${dipositTotal}$`;

  const withdrawalTotal = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = `${withdrawalTotal}$`;

  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100)
    .filter(depos => depos >= 5)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = `${interestTotal}$`;
};

const updateUi = function (account) {
  // Display transactions
  displayTransactions(account.transactions);
  // Display balance
  displayBalance(account);
  // Display total
  displayTotal(account);
};

let currentAccount;

// Event heandlers

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  currentAccount = accounts.find(
    account => account.nickName === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `З поверненням, ${
      currentAccount.userName.split(' ')[0]
    }!`;

    // Clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUi(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const transferAmount = Number(inputTransferAmount.value);
  const recipientNickName = inputTransferTo.value;
  const recipientAccount = accounts.find(
    account => account.nickName === recipientNickName
  );
  // if (
  //   transferAmount > 0 &&
  //   currentAccount.balance >= transferAmount &&
  //   recipientAccount &&
  //   currentAccount !== recipientAccount.nickName
  // ) {
  //   console.log('transfer');
  // }
  if (
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    recipientAccount &&
    currentAccount.nickName !== recipientAccount.nickName
  ) {
    console.log('transfer');
    informationText.textContent = 'Кошти надіслано';
    informationText.style.color = 'green';
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    updateUi(currentAccount);
    inputTransferTo.value = '';
    inputTransferAmount.value = '';
  } else if (currentAccount.balance < transferAmount) {
    informationText.textContent = 'Недостатньо коштів';
    informationText.style.color = 'red';
  } else if (currentAccount.nickName !== recipientNickName) {
    informationText.textContent = 'Немає такого отримувача';
    informationText.style.color = 'red';
  }
});

btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  if (
    inputCloseNickname.value === currentAccount.nickName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    deletelConfirmationModal.style.display = 'block';
    operationCloseTitle.textContent = 'Закрити рахунок';
    operationCloseTitle.style.color = '#333';
  } else {
    operationCloseTitle.textContent = 'Ім`я чи PIN не вірні';
    operationCloseTitle.style.color = 'yellow';
  }
  deletelConfirmationNo.addEventListener('click', function () {
    deletelConfirmationModal.style.display = 'none';
  });
  deletelConfirmationYes.addEventListener('click', function () {
    const curentAccountIndex = accounts.findIndex(
      account => account.nickName === currentAccount.nickName
    );
    accounts.splice(curentAccountIndex, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Увійдіть у свій акаунт';
    deletelConfirmationModal.style.display = 'none';
    inputCloseNickname.value = '';
    inputClosePin.value = '';
  });
});
