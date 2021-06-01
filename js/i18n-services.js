'use strict';

var gTrans = {
  title: {
    en: 'Welcome to my Bookshop',
    he: 'ברוך הבא לחנות הספרים שלי',
  },
  'btn-add-book': {
    en: 'Add Book',
    he: 'הוסף ספר',
  },
  'book-name': {
    en: 'Book name',
    he: 'שם הספר',
  },
  'book-price': {
    en: 'Book price',
    he: 'מחיר הספר',
  },
  'th-id': {
    en: 'Id',
    he: 'מספר',
  },
  'th-title': {
    en: 'Title',
    he: 'שם',
  },
  'th-price': {
    en: 'price',
    he: 'מחיר',
  },
  'th-actions': {
    en: 'Actions',
    he: 'פעולות',
  },
  'btn-read': {
    en: 'Read',
    he: 'תקציר',
  },
  'btn-update': {
    en: 'Update',
    he: 'עדכן',
  },
  'btn-remove': {
    en: 'Delete',
    he: 'הסר',
  },
  'btn-close': {
    en: 'Close',
    he: 'סגור',
  },
  'btn-prev': {
    en: 'Prev',
    he: 'הקודם',
  },
  'btn-next': {
    en: 'Next',
    he: 'הבא',
  },
  'btn-create': {
    en: 'Add',
    he: 'הוסף',
  },
};

var gCurrLang = 'en';

function getTrans(transKey) {
  var keyTrans = gTrans[transKey];
  if (!keyTrans) return 'UNKNOWN';
  var txt = keyTrans[gCurrLang];
  if (!txt) return keyTrans.en;
  return txt;
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]');

  els.forEach(function (el) {
    var txt = getTrans(el.dataset.trans);
    if (el.nodeName === 'INPUT') el.placeholder = txt;
    else el.innerText = txt;
  });
}

function setLang(lang) {
  gCurrLang = lang;
}

function formatCurrency(num) {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
  }).format(num);
}

function formatDate(time) {
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}
