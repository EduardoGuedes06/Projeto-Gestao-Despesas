debugger
const totalCostElement = $("#CustoTotal")
let list = {
  content: [],
  listRecover: function () {
    const toRecoverList = localStorage.getItem('list');
    if (toRecoverList === null) return;
    const recoveredList = JSON.parse(toRecoverList);
    this.content = recoveredList;
  },
  createList: function (obj) {
    this.content.push(obj);
  },
  showList: function () {
    for (const obj of this.content) {
      console.log(obj); // Exemplo de processamento dos dados
    }
  },
  compare: function (obj) {
    // Lógica de comparação e filtragem dos dados
  },
  search: function () {
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
    };
    return searchObj;
  },

  delete: function (element) {
    // Lógica para deletar um elemento
  },
  listSave: function (array) {
    let content = JSON.stringify(array);
    localStorage.setItem('list', content);
  },
  getDatesAndHTMLFromList: function () {

    // Lógica para obter datas e conteúdo HTML dos objetos
    let datesAndHTML = [];
    this.content.forEach(obj => {
      let date = new Date(obj.year, obj.month - 1, obj.day); // Os meses em JavaScript começam em zero
      let cost = obj.cost; // Supondo que o objeto tenha a propriedade 'html' contendo o conteúdo HTML
      let tipo = obj.type; // Obtendo o valor do campo 'tipo'
      datesAndHTML.push({ date, cost, tipo });
    });
    return datesAndHTML;
  },
  getItensFromList: function () {

    let datesAndHTML = [];
    this.content.forEach(obj => {
      let date = new Date(obj.year, obj.month - 1, obj.day); // Os meses em JavaScript começam em zero
      let cost = obj.cost;
      let desc = obj.desc;
      let tipo = obj.type; // Obtendo o valor do campo 'tipo'

      datesAndHTML.push({ date, cost, tipo, desc });
    });
    return datesAndHTML;
  }
};

list.listRecover();
list.showList();

function openModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'pt-br',
    initialView: 'dayGridMonth'
  });
  calendar.render();

  // Obtenha as datas e valores de 'tipo' da lista de objetos

  let datesAndHTML = list.getDatesAndHTMLFromList();

  // Adicione as datas e valores de 'tipo' como eventos no calendário
  datesAndHTML.forEach(item => {
    let eventType = '';
    switch (item.tipo) {
      case '1':
        eventType = 'Alimentação';
        break;
      case '2':
        eventType = 'Educação';
        break;
      case '3':
        eventType = 'Lazer';
        break;
      case '4':
        eventType = 'Saúde';
        break;
      case '5':
        eventType = 'Transporte';
        break;
      case '6':
        eventType = 'Segurança';
        break;
      default:
        eventType = 'Evento';
        break;
    }

    calendar.addEvent({
      title: eventType,
      start: item.date,
      allDay: true
    });
  });
});
$(document).ready(function () {
  var ctx = document.getElementById('myChart').getContext('2d');

  var datesAndItens = list.getItensFromList();

  var monthNames = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];

  var formattedDates = datesAndItens.map(item => {

    var day = item.date.getDate();
    var month = item.date.getMonth();
    var year = item.date.getFullYear();
    var monthName = monthNames[month];
    var cost = 'R$' + item.cost;
    return cost + ' - ' + day + '/' + (month + 1) + '/' + year + ' - ' + monthName;
  });

  var costs = datesAndItens.map(item => item.cost);

  var chartConfig = {
    type: 'line',
    data: {
      labels: formattedDates,
      datasets: [{
        label: 'DESPESAS ATUAIS',
        data: costs,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  var myLineChart = new Chart(ctx, chartConfig);
});
$(document).ready(function () {
  var costByType = {};
  var datesAndItens = list.getDatesAndHTMLFromList();
  debugger
  datesAndItens.forEach(item => {
    let eventType = '';
    debugger
    switch (item.tipo) {
      case "1":
        eventType = 'Alimentação';
        break;
      case "2":
        eventType = 'Educação';
        break;
      case "3":
        eventType = 'Lazer';
        break;
      case "4":
        eventType = 'Saúde';
        break;
      case "5":
        eventType = 'Transporte';
        break;
      case "6":
        eventType = 'Segurança';
        break;
      default:
        eventType = item.type;
        break;
    }
    debugger
    if (costByType[eventType]) {
      costByType[eventType] += parseFloat(item.cost);
    } else {
      costByType[eventType] = parseFloat(item.cost);
    }
    debugger
  });

  // Converte os objetos em dois arrays: um para os tipos (labels) e outro para os custos (data)
  var labels = Object.keys(costByType);
  var data = Object.values(costByType);

  // Função auxiliar para gerar uma cor aleatória
  function generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Cria um novo array de cores com base no número de tipos
  var colors = labels.map(function () {
    return generateRandomColor();
  });

  // Cria o gráfico de pizza
  var pieChart = new Chart($('#pieChart'), {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors, // Define as cores para cada tipo
        borderWidth: 1
      }]
    },
    options: {
      responsive: true
    }
  });
});

debugger
document.addEventListener("DOMContentLoaded", function () {

  const totalCostElement = $("#CustoTotal");
  const totalDespesaElement = $("#DespesasTotal");

  var datesAndItens = list.getDatesAndHTMLFromList();
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth() + 1; // Adicionar 1, pois os meses em JavaScript começam em zero
  var totalCost = 0;

  var totalDespesa = 0;
  var totalTipo = 0;
  for (var i = 0; i < datesAndItens.length; i++) {
    if (datesAndItens[i].date.getMonth() + 1 === currentMonth) {
      totalCost += parseFloat(datesAndItens[i].cost);
      totalDespesa = totalDespesa + 1;

    }
  }

  totalDespesaElement.val(totalDespesa.toString())
  totalCostElement.val("R$" + totalCost.toString());
});


