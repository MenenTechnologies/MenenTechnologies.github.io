$.getJSON("root/files/projects.json", function (data) {
  // console.log(data.projects);
  let projects = data.projects;

  function generateCard(project) {
    div_title = "<h3 class='title'>" + project.title + "</h3>";

    // create elements for tags
    let tags = [];
    if (project.tags) {
      for (let i = 0; i < project.tags.length; i++) {
        tags.push("<div class='tag'>" + project.tags[i] + "</div>");
      }
      if (project.year) tags.push("<div class='tag'>" + project.year + "</div>");
    }

    div_desc = "<div class='description'>" + project.description + "</div>";
    button_text = project.tags.includes("Game") ? "Play" : "See";
    button = project.link ? "<a class='button rounded play' href='" + project.link + "'>" + button_text + "</a>" : "";
    image = project.image ? "<img src='" + project.image + "'>" : "";
    return (
      "<div class='card' id='" +
      project.tags.join(" ") +
      "'>" +
      "<div class='content'>" +
      div_title +
      "<div class='tags'>" +
      tags.join("") +
      "</div>" +
      div_desc +
      (button ? "<div class='play_container'>" + button + "</div>" : "") +
      "</div>" +
      (image ? "<div class='media'>" + image + "</div>" : "") +
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

  // create filter for tags
  var tags = new Set();
  for (let i = 0; i < projects.length; i++) {
    projects[i].tags.forEach((tag) => tags.add(tag));
  }

  var groupFilter = $("<div/>", { class: "group-filter" });
  groupFilter.prependTo("#projects-container");

  $("<div/>", { class: "text", html: "Tags:" }).appendTo(groupFilter);
  var dropdownTags = $("<select/>", { id: "filter-by-tag", multiple: true });
  for (var tag of tags) {
    $("<option />", { value: tag, html: tag }).appendTo(dropdownTags);
  }
  dropdownTags.appendTo(groupFilter);
  $("#filter-by-tag").multiselect({
    buttonWidth: 150,
  });

  // create filter for year
  var years = new Set();
  projects.forEach((project) => years.add(project.year));

  $("<div/>", { class: "text", html: "Year:" }).appendTo(groupFilter);
  var dropdownYears = $("<select/>", { id: "filter-by-year", multiple: true });
  for (let year = 2019; year < 2022; year++) {
    $("<option />", { value: year, html: year }).appendTo(dropdownYears);
  }
  dropdownYears.appendTo(groupFilter);
  $("#filter-by-year").multiselect({
    buttonWidth: 150,
  });
});
