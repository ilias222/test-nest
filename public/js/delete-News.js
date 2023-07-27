document.querySelector('.deletes').addEventListener('click', (e) => {
    const indesNew = e.target.id;
    fetch(`http://localhost:3000/news/${indesNew}/delete`,{
        method: 'delete',
    }).then(item =>{ if(item.status == 'ok'){
        alert('Новость удалена, обнови страницу!')
    }})
    .catch(err => console.log(err))
});