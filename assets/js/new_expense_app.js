let list = {
    content: [],
    listRecover: function () {
        const toRecoverList = localStorage.getItem('list');
        if (toRecoverList === null) {
            this.content = [];
            return;
        };
        const recoveredList = JSON.parse(toRecoverList);
        this.content = recoveredList;
    },
    objToList: function (obj) {
        this.content.push(obj);
        this.listSave(this.content);
    },
    listSave: function (array) {
        let content = JSON.stringify(array);
        localStorage.setItem('list', content);
    },
    newExpense: function () {
        let year = document.querySelector('#ano');
        let month = document.querySelector('#mes');
        let day = document.querySelector('#dia');
        let type = document.querySelector('#tipo');
        let description = document.querySelector('#descricao');
        let cost = document.querySelector('#valor');
        let expense = {
            year: year.value,
            month: month.value,
            day: day.value,
            type: type.value,
            description: description.value,
            cost: cost.value,
            id: this.makeId(24),
        }
        return expense;
    },
    makeId: function (len) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < len; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
}

list.listRecover();

let reload = setInterval(() => {
    list.listRecover();
}, 2000)

let addButton = document.querySelector('#addButton');
addButton.addEventListener('click', event => {
    event.preventDefault();
    let expense = list.newExpense();
    if (expense.year && expense.month && expense.day && expense.description && expense.cost && (expense.type !== 'Tipo')) {
        list.objToList(expense);
        clearFields();
        alert('Despesa cadastrada com sucesso!');
    } else {
        clearFields();
        alert('Você precisa preencher todos os campos.');
    }
});

function clearFields() {
    document.getElementById('ano').value = '';
    document.getElementById('mes').value = '';
    document.getElementById('dia').value = '';
    document.getElementById('tipo').value = '0';
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
}

// Bloquear a entrada de caracteres não numéricos e limitar o número de caracteres para cada campo
function blockNonNumericInput(element, maxLength) {
    element.addEventListener('input', function (event) {
        // Remove todos os caracteres não numéricos
        const numericValue = event.target.value.replace(/\D/g, '');

        // Limita o número de caracteres
        const limitedValue = numericValue.slice(0, maxLength);

        // Atualiza o valor do campo com o valor limitado
        event.target.value = limitedValue;
    });
}

// Validação do campo "Dia"
const diaInput = document.getElementById('dia');
blockNonNumericInput(diaInput, 2);

// Validação do campo "Mês"
const mesInput = document.getElementById('mes');
mesInput.addEventListener('change', function (event) {
    blockNonNumericInput(event.target, 2);
});

// Validação do campo "Ano"
const anoInput = document.getElementById('ano');
blockNonNumericInput(anoInput, 4);
