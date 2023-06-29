
function openModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
  }

  function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
  }

  document.addEventListener('DOMContentLoaded', function() {
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