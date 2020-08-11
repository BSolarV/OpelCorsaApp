export default function() {
  return [
    {
      title: "Solicitudes y reservas",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "https://solrec-app.herokuapp.com/",
    },
    {
      title: "Quimioterapia",
      to: "/quimioterapia",
      htmlBefore: '<i class="material-icons">edit</i>'
    },
    // {
    //   title: "Blog Posts",
    //   htmlBefore: '<i class="material-icons">vertical_split</i>',
    //   to: "/blog-posts",
    // },
    // {
    //   title: "Add New Post",
    //   htmlBefore: '<i class="material-icons">note_add</i>',
    //   to: "/add-new-post",
    // },
    // {
    //   title: "Forms & Components",
    //   htmlBefore: '<i class="material-icons">view_module</i>',
    //   to: "/components-overview",
    // },
    // {
    //   title: "Tables",
    //   htmlBefore: '<i class="material-icons">table_chart</i>',
    //   to: "/tables",
    // },
    // {
    //   title: "User Profile",
    //   htmlBefore: '<i class="material-icons">person</i>',
    //   to: "/user-profile-lite",
    // },
    // {
    //   title: "Errors",
    //   htmlBefore: '<i class="material-icons">error</i>',
    //   to: "/errors",
    // },
    {
      title: 'Pabellones',
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: 'https://iif-front.herokuapp.com/pabellones/'
    },
    {
      title: 'Salas de recuperación',
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: 'https://iif-front.herokuapp.com/recuperacion/'
    },
    {
      title: 'Equipamientos',
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: 'https://sogireact.herokuapp.com/listar-equipamientos/'
    },
    {
      title: 'Personal y Equipos',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: 'https://chopinhauer-web.herokuapp.com/all-pservice'
    }
  ];
}
