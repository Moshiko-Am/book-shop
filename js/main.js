'use strict';

function init() {
  gBooks = createBooks();
  renderBooks();
  renderPageNum();
  doTrans();
}

function renderBooks() {
  var books = getBooksForDisplay();
  var strHTMLs = books.map(function (book) {
    return `
        <tr>
        <td> ${book.id}</td>
        <td>${book.name}</td>
        <td> ${book.price}</td>
        <td><button data-trans="btn-read" onclick="onReadBook('${book.id}')" class="btn btn-read">Read</button></td>
        <td><button data-trans="btn-update" onclick="onUpdateClick(this.parentElement, ${book.id})" class="btn btn-update">Update</button></td>
        <td class="td-update" hidden></td>
        <td><button data-trans="btn-remove" onclick="onRemoveBook('${book.id}')" class="btn btn-delete">Delete</button></td>
        </tr>
        `;
  });
  var elTable = document.querySelector('.books-table tbody');
  elTable.innerHTML = strHTMLs.join('');
}

function onSetLang(lang) {
  setLang(lang);
  if (lang === 'he') document.body.classList.add('rtl');
  else document.body.classList.remove('rtl');
  doTrans();
}

function onSetSort(sortBy) {
  setSort(sortBy);
  renderBooks();
  doTrans();
}

function onTurnPage(diff) {
  turnPage(diff);
  renderBooks();
  renderPageNum();
  doTrans();
}

function renderPageNum() {
  document.querySelector('.pagination span').innerText = getPage();
}

function onReadBook(bookId) {
  renderModal(bookId);
  var elModal = document.querySelector('.modal');
  elModal.classList.add('modal-show');
}

function renderModal(bookId) {
  var book = getBookById(bookId);
  document.querySelector('.btn-lower-rate').onclick = function () {
    return onChangeRate(bookId, -1);
  };
  document.querySelector('.btn-higher-rate').onclick = function () {
    return onChangeRate(bookId, 1);
  };
  document.querySelector('.book-rate').innerText = book.rate;
  document.querySelector('.book-title').innerText = book.name;
  document.querySelector('.book-price').innerText = book.price;
  document.querySelector('.book-desc').innerText = book.desc;
  document.querySelector('.book-img').src = book.imageUrl;
}

function onChangeRate(bookId, diff) {
  changeRate(bookId, diff);
  onReadBook(bookId);
}

function onCloseModal() {
  var elModal = document.querySelector('.modal');
  elModal.classList.toggle('modal-show');
}

function onUpdateClick(elTd, bookId) {
  elTd.innerHTML = `<input type="number" name="update-price" placeholder="New price?"><button class="btn btn-update-price" onclick="onUpdateBook(${bookId}, this.parentElement)">change</button>`;
}

function onUpdateBook(bookId, elTd) {
  var elPrice = document.querySelector('input[name=update-price]');
  var price = elPrice.value;
  if (!price) return;
  elTd.innerHTML = `<button onclick="onUpdateClick(this.parentElement, ${bookId})" class="btn btn-update">Update</button>`;
  updateBook(bookId, price);
  renderBooks();
  doTrans();
}

function onCreateBook() {
  var elBookName = document.querySelector('input[name=add-book-name]');
  var elBookPrice = document.querySelector('input[name=add-book-price]');
  var btnAdd = document.querySelector('.btn-create');
  var name = elBookName.value;
  var price = elBookPrice.value;
  if (!name || !price) return;
  elBookPrice.hidden = true;
  elBookName.hidden = true;
  btnAdd.hidden = true;
  addBook(name, price);
  renderBooks();
  doTrans();
}

function onAddBook() {
  var elBookName = document.querySelector('input[name=add-book-name]');
  var elBookPrice = document.querySelector('input[name=add-book-price]');
  var btnAdd = document.querySelector('.btn-create');
  elBookName.hidden = false;
  elBookPrice.hidden = false;
  btnAdd.hidden = false;
}

function onRemoveBook(bookId) {
  removeBook(bookId);
  renderBooks();
  doTrans();
}
