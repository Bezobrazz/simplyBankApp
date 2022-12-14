'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2022-11-23T07:43:59.331Z',
    '2022-11-24T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'CAD',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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
const loanTitle = document.querySelector('.operation__loan-title');
const inputCloseNickname = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const operationCloseTitle = document.querySelector('.operation--close_title');

const deletelConfirmationModal = document.querySelector('.modal__container');
const deletelConfirmationYes = document.querySelector('.modal__btn-yes');
const deletelConfirmationNo = document.querySelector('.modal__btn-no');

const formatTransactionDate = function (date, locale) {
  const getDaysBetweenTwoDates = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  const daysPassed = getDaysBetweenTwoDates(new Date(), date);
  console.log(daysPassed);
  if (daysPassed === 0) return '????????????????';
  if (daysPassed === 1) return '??????????';
  if (daysPassed <= 5) return `${daysPassed} ?????? ??????????`;
  else {
    // const day = `${date.getDate()}`.padStart(2, '0');
    // const month = `${date.getMonth() + 1}`.padStart(2, '0');
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayTransactions = function (account, sort = false) {
  containerTransactions.innerHTML = '';

  const transac = sort
    ? account.transactions.slice().sort((x, y) => x - y)
    : account.transactions;

  transac.forEach(function (trans, index) {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.transactionsDates[index]);
    const transDate = formatTransactionDate(date, account.locale);
    const formattedTrans = formatCurrency(
      trans,
      account.locale,
      account.currency
    );
    const transactionsRow = `
		<div class="transactions__row">
		<div class="transactions__type transactions__type--${transType}">
			${index + 1} ${transType}
		</div>
		<div class="transactions__date">${transDate}</div>
		<div class="transactions__value">${formattedTrans}</div>
	</div>`;

    containerTransactions.insertAdjacentHTML('afterbegin', transactionsRow);
  });
};

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
  labelBalance.textContent = formatCurrency(
    balance,
    account.locale,
    account.currency
  );
};

const displayTotal = function (account) {
  const dipositTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = formatCurrency(
    dipositTotal,
    account.locale,
    account.currency
  );

  const withdrawalTotal = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = formatCurrency(
    withdrawalTotal,
    account.locale,
    account.currency
  );

  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100)
    .filter(depos => depos >= 5)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = formatCurrency(
    interestTotal,
    account.locale,
    account.currency
  );
};

const updateUi = function (account) {
  // Display transactions
  displayTransactions(account);
  // Display balance
  displayBalance(account);
  // Display total
  displayTotal(account);
};

let currentAccount, currentLogoutTimer;

// Alwayes logged in
// currentAccount = account1;
// containerApp.style.opacity = '100';

// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, '0');
// const month = `${now.getMonth() + 1}`.padStart(2, '0');
// const year = now.getFullYear();

// labelDate.textContent = `${day}/${month}/${year}`;

// Event heandlers........................................

// Logout timer
const startLogoutTimer = function () {
  const logoutTimerCallback = () => {
    const minutes = String(Math.trunc(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    // In each call show the remaining time in UI
    labelTimer.textContent = `${minutes}:${seconds}`;

    // After end of time stop the timer and logout
    if (time === 0) {
      clearInterval(logOutTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `???????????????? ?? ???????? ????????????`;
    }
    time--;
  };
  // Set logout time at 5 min
  let time = 300;
  // Call the timer every second
  logoutTimerCallback();
  const logOutTimer = setInterval(logoutTimerCallback, 1000);
  return logOutTimer;
};

// Login
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  currentAccount = accounts.find(
    account => account.nickName === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `?? ??????????????????????, ${
      currentAccount.userName.split(' ')[0]
    }!`;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };

    const locale = navigator.language;
    console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    // Chtck if the timer exists
    if (currentLogoutTimer) clearInterval(currentLogoutTimer);
    currentLogoutTimer = startLogoutTimer();

    updateUi(currentAccount);
  }
});

// Transfer transactions
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
    informationText.textContent = '?????????? ??????????????????';
    informationText.style.color = 'green';
    setTimeout(() => {
      informationText.textContent = '???????????????????????? ??????????';
      informationText.style.color = '#333';
    }, 3000);
    // Add transactions
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    // Add transaction date
    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());
    updateUi(currentAccount);
    // Reset the timer
    clearInterval(currentLogoutTimer);
    currentLogoutTimer = startLogoutTimer();

    inputTransferTo.value = '';
    inputTransferAmount.value = '';
  } else if (currentAccount.balance < transferAmount) {
    informationText.textContent = '?????????????????????? ????????????';
    informationText.style.color = 'red';
  } else if (currentAccount.nickName !== recipientNickName) {
    informationText.textContent = '?????????? ???????????? ????????????????????';
    informationText.style.color = 'red';
  }
});

// Close the account
btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  if (
    inputCloseNickname.value === currentAccount.nickName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    deletelConfirmationModal.style.display = 'block';
    operationCloseTitle.textContent = '?????????????? ??????????????';
    operationCloseTitle.style.color = '#333';
  } else {
    operationCloseTitle.textContent = '????`?? ???? PIN ???? ??????????';
    operationCloseTitle.style.color = 'yellow';
    setTimeout(() => {
      operationCloseTitle.textContent = '?????????????? ??????????????';
      operationCloseTitle.style.color = '#333';
      inputCloseNickname.value = '';
      inputClosePin.value = '';
    }, 3000);
  }
  deletelConfirmationNo.addEventListener('click', function () {
    deletelConfirmationModal.style.display = 'none';
    inputCloseNickname.value = '';
    inputClosePin.value = '';
  });
  deletelConfirmationYes.addEventListener('click', function () {
    const curentAccountIndex = accounts.findIndex(
      account => account.nickName === currentAccount.nickName
    );
    accounts.splice(curentAccountIndex, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = '???????????????? ?? ???????? ????????????';
    deletelConfirmationModal.style.display = 'none';
    inputCloseNickname.value = '';
    inputClosePin.value = '';
  });
});

// Ask loan
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);
  const maxTransaction = Math.max(...currentAccount.transactions);
  console.log(maxTransaction);
  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(trans => trans >= (loanAmount * 10) / 100)
  ) {
    loanTitle.textContent = '?????????? ?? ??????????????...';
    setTimeout(function () {
      currentAccount.transactions.push(loanAmount);
      currentAccount.transactionsDates.push(new Date().toISOString());
      updateUi(currentAccount);
      inputLoanAmount.value = '';
      loanTitle.textContent = '???????????? ????????????????, ??????????????!';
      loanTitle.style.color = 'green';
      setTimeout(() => {
        loanTitle.textContent = '?????????????????? ????????????';
        loanTitle.style.color = '#333'; //set timer change color to #333
      }, 3000);
    }, 5000);
  } else if (loanAmount > maxTransaction) {
    loanTitle.textContent = `?????????????????????? ???????????? ${maxTransaction * 10}$`;
    loanTitle.style.color = 'red';
    setTimeout(() => {
      loanTitle.textContent = '?????????????????? ????????????';
      loanTitle.style.color = '#333';
    }, 3000);
  }
  // Reset the timer
  clearInterval(currentLogoutTimer);
  currentLogoutTimer = startLogoutTimer();
});

let transactionsSorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault;
  displayTransactions(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
});

// Added grey color to each second string
// [...document.querySelectorAll('.transactions__row')].forEach(function (
//   row,
//   index
// ) {
//   if (i % 2 === 0) {
//     row.style.backgroundColor = 'grey';
//   }
// });
