
let now = new Date();

let fulldate = `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}. ${now.getHours()}:${now.getMinutes()}`;

if (localStorage.getItem("Name")) {
    alert(`Добрый день, ${localStorage.getItem("Name")}! Давно не виделись. В последний раз вы были у нас ${localStorage.getItem("Date")}`);

} else {
    let userName = prompt("Добро пожаловать! Назовите, пожалуйста, ваше имя");
    localStorage.setItem("Name", userName);

}
localStorage.setItem("Date", fulldate);
