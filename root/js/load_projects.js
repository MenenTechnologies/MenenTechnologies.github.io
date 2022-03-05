$.getJSON("root/files/projects.json", function (data) {
  console.log(data.projects[0]);
  let projects = data.projects;

  function generateCard(project) {
    div_title = "<h2 class='title'>" + project.title + "</h2>";
    div_type1 = "<div class='tag type1'>" + project.type1 + "</div>";
    div_type2 = "<div class='tag type2'>" + project.type2 + "</div>";
    div_year = "<div class='tag year'>" + project.year + "</div>";
    button_play = "<div class='play'>Play</div>";
    image = "<img src='root/images/me/CD1196.jpg'>";
    return (
      "<div class='card'>" +
      "<div class='content'>" +
      div_title +
      "<div class='tags'>" +
      div_type1 +
      div_type2 +
      (project.year != 0 ? div_year : "") +
      "</div>" +
      (project.type2 == "Game"
        ? "<div class='play_container'>" + button_play + "</div>"
        : "") +
      "</div>" +
      "<div class='media'>" +
      image +
      "</div>" +
      "</div>"
    );
  }

  var items = [];
  for (let i = 0; i < projects.length; i++) {
    items.push(generateCard(projects[i]));
  }

  $("<div/>", {
    class: "cards",
    html: items.join(""),
  }).appendTo("#projects-container");
});
