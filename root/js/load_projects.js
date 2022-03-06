$.getJSON("root/files/projects.json", function (data) {
  // console.log(data.projects);
  let projects = data.projects;

  function generateCard(project) {
    div_title = "<h3 class='title'>" + project.title + "</h3>";

    // create elements for tags
    let tags = [];
    if (project.tags) {
      if (project.year) project.tags.push(project.year);
      for (let i = 0; i < project.tags.length; i++) {
        tags.push("<div class='tag'>" + project.tags[i] + "</div>");
      }
    }

    div_desc = "<div class='description'>" + project.description + "</div>";
    button_text = project.tags.includes("Game") ? "Play" : "See";
    button = project.link ? "<a class='button rounded play' href='" + project.link + "'>" + button_text + "</a>" : "";
    image = "<img src='" + project.image + "'>";
    return (
      "<div class='card'>" +
      "<div class='content'>" +
      div_title +
      "<div class='tags'>" +
      tags.join("") +
      "</div>" +
      div_desc +
      (button ? "<div class='play_container'>" + button + "</div>" : "") +
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
