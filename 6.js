const myPromise = new Promise((resolve, reject) => {
    let num = setTimeout(() => { return Math.floor(Math.random() * 99) + 1; }, 3000);

    if (num % 2) {
        reject(num);
    } else {
        resolve(num);
    }
});
myPromise
    .then((result) => {
        console.log(`Завершено успешно. Сгенерированное число — ${result}`);
    })
    .catch((result) => {
        console.log(`Завершено с ошибкой. Сгенерированное число — ${result}`);
    });