/**
  * Функция-обертка над XMLHttpRequest, осуществляющая запрос
  * url - урл, по которому будет осуществляться запрос
  * callback - функция, которая вызовется при успешном выполнении
  * и первым параметром получит объект-результат запроса
  */
const REQUEST_URL = 'https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440';


function useRequest(url, date, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result, date);
      }
    }
  };

  xhr.onerror = function () {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };

  xhr.send();
};

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
const graphNode = document.querySelector('.href');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');

let salesArr = new Array();

/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(apiData, date) {
  let cards = `
    <tr>
  <td> 1 кв</td>
  <td>2 кв</td>
  <td>3 кв</td>
  <td>4 кв</td>
    </tr>
    <tr>
    `;
  // console.log('start cards', cards);
  // console.log(apiData);
  apiData.forEach(item => {
    if (item.year == date) {
      for (sale in item.sales) {
        const cardBlock = `
        <td>${item.sales[sale]}</td>
    `
        salesArr.push(item.sales[sale]);
        cards = cards + cardBlock;
      }
      cards += '</td>'
    }

  });

  graphNode.innerHTML = `<a href="https://quickchart.io/chart?c={type:'bar',data:{labels:['Кв.1','Кв.2','Кв.3','Кв.4'], datasets:[{label:'Выручка за ${date} год',data:[${salesArr}]}]}}">график</a>`;
  resultNode.innerHTML = cards;
}

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
  const date = Number(Myform.year.options[Myform.year.selectedIndex].text);
  if (date) {
    useRequest(REQUEST_URL, date, displayResult);
  } else
    alert("Выберите, пожалуйста, год");
})