let list = {
    content: [],
    count: 0,
    listRecover: function() {
        const toRecoverList = localStorage.getItem('list');
        if (toRecoverList === null) return;
        const recoveredList = JSON.parse(toRecoverList);
        this.content = recoveredList;
    },
    createList: function(obj) {
        let table = document.querySelector('tbody');
        let line = document.createElement('tr');
        let date = document.createElement('td');
        let type = document.createElement('td');
        let description = document.createElement('td');
        let cost = document.createElement('td');
        let del = document.createElement('td');
        let delButton = document.createElement('button');
        date.innerHTML = `${obj.day}/${obj.month}/${obj.year}`;
        switch (obj.type){
            case '1': type.innerHTML = 'Alimentação'; break;
            case '2': type.innerHTML = 'Educação'; break;
            case '3': type.innerHTML = 'Lazer'; break;
            case '4': type.innerHTML = 'Saúde'; break;
            case '5': type.innerHTML = 'Transporte'; break;
            case '6': type.innerHTML = 'Segurança'; break;
        }
        description.innerHTML = obj.description;
        cost.innerHTML = obj.cost;
        delButton.innerHTML = 'Deletar';
        delButton.classList.add('btn', 'btn-primary', 'DelButton');
        delButton.style.backgroundColor = '#63db07';
        delButton.style.borderColor = '#63db07';
        del.appendChild(delButton);
        line.appendChild(date);
        line.appendChild(type);
        line.appendChild(description);
        line.appendChild(cost);
        line.appendChild(del);
        table.appendChild(line);
        line.dataset.id = obj.id;
    },
    showList: function() {
        for (this.count; this.count < this.content.length; this.count++){
            this.createList(this.content[this.count]);
        }

        if (this.count > this.content.length){
            this.count = this.content.length;
        }
    },
    compare: function (obj){
        let filtered = [...this.content];

        if (obj.year != ''){
            filtered = filtered.filter(e => e.year == obj.year);
            
        }
        
        if (obj.month != ''){
            filtered = filtered.filter(e => e.month == obj.month);
        }
        
        if (obj.day != ''){
            filtered = filtered.filter(e => e.day == obj.day);
        }
        
        if (obj.type != '0'){
            filtered = filtered.filter(e => e.type == obj.type);
        }

        if (obj.description != ''){
            filtered = filtered.filter(e => e.description == obj.description);
        }
       
        if (obj.cost != ''){
            filtered = filtered.filter(e => e.cost == obj.cost);
        }
        
        if (filtered !== []) {
            clearInterval(reload);
            let tbody = document.querySelector('tbody');
            let table = tbody.querySelectorAll('tr');
            table.forEach(e => {
                e.remove();
            })

            filtered.forEach(list.createList);
        }

        if (filtered.length === this.count){
            list.listRecover();
            list.showList();
            reload = setInterval(() => {
                list.listRecover();
                list.showList();
            }, 2000);
        }
    },
    search: function(){
        let year = document.querySelector('#ano');
        let month = document.querySelector('#mes');
        let day = document.querySelector('#dia');
        let type = document.querySelector('#tipo');
        let description = document.querySelector('#descricao');
        let cost = document.querySelector('#valor');
        let searchObj = {
            year: year.value,
            month: month.value,
            day: day.value,
            type: type.value,
            description: description.value,
            cost: cost.value,
        }
        
        return searchObj;
    },
    delete: function(element){
        clearInterval(reload);
        let fatherNode = element.parentNode.parentNode;
        let elementId = fatherNode.dataset.id;
        for (index in this.content){
            if (this.content[index].id === elementId){
                this.content.splice(index, 1);
            }
        }
        fatherNode.remove();
        this.listSave(this.content);
        list.listRecover();
        list.showList();

        reload = setInterval(() => {
            list.listRecover();
            list.showList();
        }, 2000);
    },
    listSave: function(array){
        let content = JSON.stringify(array);
        localStorage.setItem('list', content);
    },
    getDatesAndHTMLFromList: function() {
        let datesAndHTML = [];
        this.content.forEach(obj => {
          let date = new Date(obj.year, obj.month - 1, obj.day); // Os meses em JavaScript começam em zero
          let html = obj.html; // Supondo que o objeto tenha a propriedade 'html' contendo o conteúdo HTML
          let tipo = obj.type; // Obtendo o valor do campo 'tipo'
          datesAndHTML.push({ date, html, tipo });
        });
        return datesAndHTML;
      }
    
}



list.listRecover();
list.showList();

let reload = setInterval(() => {
    list.listRecover();
    list.showList();
}, 2000);

let searchButton = document.querySelector('.searchButton');
searchButton.addEventListener('click', event => {
    event.preventDefault;
    let searchObj = list.search();
    list.compare(searchObj);
})

let delButton = document.querySelector('.table');
delButton.addEventListener('click', event => {
    let element = event.target;
    if (element.tagName === 'BUTTON'){
        list.delete(element)
    }
})

