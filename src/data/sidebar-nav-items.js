export default function() {
  return [
    {
      title: "Solicitudes y reservas",
      htmlBefore: '<i class="material-icons">book</i>',
      to: "https://solrec-app.herokuapp.com/",
    },
    {
      title: "Quimioterapia",
      to: "/quimioterapia",
      htmlBefore: '<i class="material-icons">event_seat</i>'
    },
    {
      title: 'Pabellones',
      htmlBefore: '<i class="material-icons">healing</i>',
      to: 'https://iif-front.herokuapp.com/pabellones/'
    },
    {
      title: 'Salas de recuperación',
      htmlBefore: '<i class="material-icons">accessible</i>',
      to: 'https://iif-front.herokuapp.com/recuperacion/'
    },
    {
      title: 'Equipamientos',
      htmlBefore: '<i class="material-icons">biotech</i>',
      to: 'https://sogireact.herokuapp.com/listar-equipamientos/'
    },
    {
      title: 'Personal y Equipos',
      htmlBefore: '<i class="material-icons">person_search</i>',
      to: 'https://chopinhauer-web.herokuapp.com/pservice/all-pservice'
    }
  ];
}
