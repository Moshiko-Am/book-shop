'use strict';
const STORAGE_KEY = 'booksDB';
const PAGE_SIZE = 5;

var gSortBy = 'Title';
var gBooks;
var gSortDiff = 1; //1 or -1
var gCurrPage = 0;

function getBooksForDisplay() {
  var fromIdx = gCurrPage * PAGE_SIZE;
  var toIdx = fromIdx + PAGE_SIZE;
  sortDisplay();
  return gBooks.slice(fromIdx, toIdx);
}

function getPage() {
  return gCurrPage + 1;
}

function turnPage(diff) {
  if ((gCurrPage + diff) * PAGE_SIZE >= gBooks.length || gCurrPage + diff < 0)
    return;
  gCurrPage += diff;
}

function sortDisplay() {
  if (gSortBy === 'Title') {
    gBooks.sort(function (book1, book2) {
      if (book1.name.toLowerCase() > book2.name.toLowerCase())
        return 1 * gSortDiff;
      else if (book1.name.toLowerCase() < book2.name.toLowerCase())
        return -1 * gSortDiff;
      else return 0;
    });
  } else if (gSortBy === 'Price') {
    gBooks.sort(function (book1, book2) {
      return (book1.price - book2.price) * gSortDiff;
    });
  }
}

function setSort(sortBy) {
  // if (sortBy === gSortBy) {
  //   gSortDiff *= -1;
  // } else {
  //   gSortDiff = 1;
  // }
  gSortDiff = sortBy === gSortBy ? -gSortDiff : 1;
  gSortBy = sortBy;
}

function changeRate(bookId, diff) {
  var book = getBookById(bookId);
  if (book.rate + diff < 0 || book.rate + diff > 10) return;
  book.rate += diff;
  _saveBooksToStorage();
}

function updateBook(bookId, price) {
  var book = gBooks.find(function (book) {
    return book.id === bookId + '';
  });
  book.price = price;
  _saveBooksToStorage();
}

function addBook(name, price) {
  var book = _createBook(name, price);
  gBooks.unshift(book);
  _saveBooksToStorage();
}

function removeBook(bookId) {
  var bookIdx = gBooks.findIndex(function (book) {
    return book.id === bookId;
  });
  if (bookIdx === -1) return; //To make sure we delete the right book
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
}

function getBookById(bookId) {
  var book = gBooks.find(function (book) {
    return book.id === bookId;
  });
  return book;
}

function createBooks() {
  var books = loadFromStorage(STORAGE_KEY);
  if (!books || !books.length) {
    books = [
      _createBook('book1', 100),
      _createBook('book2', 200),
      _createBook('book3', 300),
    ];
    saveToStorage(STORAGE_KEY, books);
  }
  return books;
}

function _createBook(name, price) {
  var book = {
    id: _makeId(),
    name, // <=> name: name,
    price, // <=> price: price,
    imageUrl: '../img/book.png',
    rate: getRandomInt(0, 10),
    desc: makeLorem(),
  };
  return book;
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks);
}

function _makeId(length = 4) {
  var txt = '';
  var possible = '0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ];
  var txt = '';
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)] + ' ';
  }
  return txt;
}
