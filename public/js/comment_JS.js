 class CreateNewElementHTML {
    constructor(node_Element, name_Element, value_Element){
        this.node_Element = node_Element;
        this.name_Element = name_Element;
        this.value_Element = value_Element;
    }

    createElement () {
        const element = document.createElement(this.node_Element);
        element.name = this.name_Element;
        element.value = this.value_Element;
        return element;
    
    }
}

let datas = new FormData();
const elem = new CreateNewElementHTML();
const dat = new Date();

    function cookisPare(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

document.querySelector('.btn-primary').addEventListener('click', (e) => {
    e.preventDefault();
    
    datas.append('idNews', document.querySelector('.commen').id);
    datas.append('idUser', new CreateNewElementHTML('input', 'idUser', cookisPare('idminis')).createElement().value);
    datas.append('comments', document.querySelector('.cover-comment').files[0], document.querySelector('.cover-comment').value);
    datas.append('message', document.querySelector('.form-control-mess').value);
    datas.append('nameUser', new CreateNewElementHTML('input', 'idUser', cookisPare('nameUser')).createElement().value);
    datas.append('emailUser', new CreateNewElementHTML('input', 'emailUser', cookisPare('email')).createElement().value);
    datas.append('createAt', new CreateNewElementHTML('input', 'createAt', '2023-07-11').createElement().value);
    console.log(datas.getAll('createAt'))
    fetch('http://localhost:3000/news-comments/create', {
        method: "post",
        body: datas,
      }).then(req => req.text()).then(item => console.log(item))


})



