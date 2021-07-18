const printJSON = (json) => {
    let gallery = "";
    json.forEach(item => {
        const cardBlock = `
                    <div class="card">
                      <img
                        src="${item.download_url}"
                        class="card-image"
                      />
                      <p>${item.author}</p>
                    </div>
                  `;
        gallery += cardBlock;
    });
    block.innerHTML = gallery;

}



let submitBtn = document.getElementById('btn');
let block = document.getElementById('gallery');




const myJSON = localStorage.getItem('myJSON');
if (myJSON) {
    printJSON(JSON.parse(myJSON));
}
submitBtn.addEventListener('click', () => {
    let pageNum = parseInt(document.getElementById('pageNum').value) || 0;
    let limit = parseInt(document.getElementById('limit').value) || 0;

    if ((pageNum > 10) && (limit > 10)) {
        alert("Номер страницы и лимит вне диапазона от 1 до 10")
    }
    else if ((pageNum > 10) || (pageNum < 1)) {
        alert("Номер страницы вне диапазона от 1 до 10");
    }
    else if ((limit > 10) || (limit < 1)) {
        alert("Лимит вне диапазона от 1 до 10");
    } else {
        fetch(` https://picsum.photos/v2/list?page=${pageNum}&limit=${limit}`)
            .then(response => response.json())
            .then((json) => {
                printJSON(json);
                localStorage.setItem('myJSON', JSON.stringify(json));
            });
    }
})