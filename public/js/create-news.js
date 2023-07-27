const cook = document.cookie.replace(/(?:(?:^|.*;\s*)authorize\s*\=\s*([^;]*).*$)|^.*$/, "$1");
// console.log(document.cookie.replace(/(?:(?:^|.*;\s*)idminis\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
// /(?:(?:^|.*;s*)idminis\s*\=s*([^;]*).*$)|^.*$/
let datas = new FormData()

function parserCookie (key_Name) {
    const reg = new RegExp(`(?:(?:^|.*;\\s*)${key_Name}\\s*\\=\\s*([^;]*).*$)|^.*$`) 
    return document.cookie.replace(reg, "$1")
}

function createElement (node_Element, name_Element, value_Element) {
    const element = document.createElement(node_Element);
    element.name = name_Element;
    element.value = value_Element;
    element.placeholder = element.name;
    console.log(element, element.value);
    document.querySelector('.form-create-news').prepend(element);
    return element;

}

function idNews (id_user){
    const idUser = id_user;
    const idCategories = 1;
    const idRamdomGroub = parseInt(Math.random() * 10);
    const idRamdomNumer = parseInt(Math.random() * 100);
    return parseInt(idUser + '' + idCategories + '' + idRamdomGroub + '' + idRamdomNumer);
}

fetch(`http://localhost:3000/users/users/${parserCookie('idminis')}`)
.then( respons => respons.json())
.then(result => {
    datas.append('id', createElement('input', 'id', idNews(result.id)).value);
    datas.append('authorid', createElement('input', 'authorid', result.id).value);
    datas.append('author', createElement('input', 'author', `${result.firstName} ${result.lastName}`).value);
    datas.append('dataMess', createElement('input', 'dataMess', '2023-06-27').value);
    datas.append('categoryid', createElement('input', 'categoryid', 1).value);
}
);

document.querySelector('.form-create-news').addEventListener('submit', (e) => {
    e.preventDefault();
    datas.append('file', document.querySelector('.images-title-news').files[0], document.querySelector('.images-title-news').value);
    datas.append('title', document.querySelector('.title-news').value);
    datas.append('descript', document.querySelector('.descript-news').value);
    console.log(datas.getAll('file'));
    console.log(datas.getAll('id'));
    console.log(datas.getAll('title'));

    fetch('http://localhost:3000/news/create', {
      method: "POST",
      body: datas,
    });
});
