
let submitBtn = document.getElementById('btn');
let list = document.getElementById('list');

submitBtn.addEventListener('click', () => {
    let num = parseInt(document.getElementById('num').value);
    // Делаем запрос за данными
    fetch(` https://jsonplaceholder.typicode.com/users/${num}/todos`)
        .then(response => response.json())
        .then((json) => {
            let tasks = "";
            if (json.length == 0) {
                alert("Пользователь с указанным id не найден");
            } else {
                json.forEach(element => {
                    if (element['completed']) {
                        tasks += `<li><strike>${element['title']}</strike></li>`;
                    } else {
                        tasks += `<li>${element['title']}</li>`;
                    }
                });
            }
            list.innerHTML = tasks;
        })
})