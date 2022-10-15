//get url
var url = window.location;
var baseurl = url.protocol + "//" + url.host + "/";
var fullurl = window.location.href;

//get language code
let language = fullurl.replace(baseurl, "").split("/")[0];
language = language.length > 2 || language.length == 0 ? "en" : language;

var stringsMap; // values assigned on $(document).ready > $getJSON

// function to create dropdown filters for tags
// - tags is a set
function createTagsFilter(tags) {
  var groupFilter = $(".group-filter");

  $("<div/>", { class: "text", html: stringsMap.get("TypeFilterTitle") }).appendTo(groupFilter);
  var dropdownTags = $("<select/>", { id: "filter-by-tag", multiple: true });
  for (var tag of tags) {
    $("<option />", { selected: true, value: tag, html: stringsMap.get(tag) }).appendTo(dropdownTags);
  }
  dropdownTags.appendTo(groupFilter);
  $("#filter-by-tag").multiselect({
    buttonWidth: 150,
    click: function (event, ui) {
      // console.log(ui.value + " is " + (ui.checked ? "checked" : "unchecked"));
      // console.log($("#filter-by-tag").val()); // issue: clicked item is not included when checking it on
      filterProjects();
    },
    checkAll: function () {
      filterProjects();
    },
    uncheckAll: function () {
      filterProjects();
    },
  });
}

// function to create dropdown filter for years
function createYearsFilter() {
  var groupFilter = $(".group-filter");

  $("<div/>", { class: "text", html: stringsMap.get("YearFilterTitle") }).appendTo(groupFilter);
  var dropdownYears = $("<select/>", { id: "filter-by-year", multiple: true });
  for (let year = 2022; year >= 2019; year--) {
    $("<option />", { selected: true, value: year, html: year }).appendTo(dropdownYears);
  }
  dropdownYears.appendTo(groupFilter);
  $("#filter-by-year").multiselect({
    buttonWidth: 150,
    click: function (event, ui) {
      filterProjects();
    },
    checkAll: function () {
      filterProjects();
    },
    uncheckAll: function () {
      filterProjects();
    },
  });
}

// function to call on dropdowns events to refresh grid
function filterProjects() {
  checkedTags = $("#filter-by-tag")
    .multiselect("getChecked")
    .map(function () {
      return $(this).val();
    })
    .toArray();

  checkedYears = $("#filter-by-year")
    .multiselect("getChecked")
    .map(function () {
      return $(this).val();
    })
    .toArray();

  // check each card for filter settings and show/hide them
  $(".card").each(function (index, item) {
    // check if tags or year match
    var foundTag = false,
      foundYear = false;
    checkedTags.forEach(function (checkedTag) {
      if ($(item).attr("tags").includes(checkedTag)) foundTag = true;
    });
    checkedYears.forEach(function (checkedYear) {
      if ($(item).attr("years").includes(checkedYear)) foundYear = true;
    });

    // show/hide items
    var shouldBeVisible = foundTag && foundYear;
    if (($(item).is(":visible") && !shouldBeVisible) || (!$(item).is(":visible") && shouldBeVisible)) {
      $(item).slideToggle({ duration: 700 });
    }
  });
}

//function to generate a card of each project
function generateCard(project) {
  div_title = "<h3 class='title'>" + project.title + "</h3>";

  // create elements for tags
  let tags = [];
  if (project.tags) {
    for (let i = 0; i < project.tags.length; i++) {
      tags.push("<div class='tag'>" + stringsMap.get(project.tags[i]) + "</div>");
    }
  }

  if (project.year) tags.push("<div class='year' style='float:right'>" + project.year + "</div>");

  let skillsDivs = [];
  if (project.skills) {
    for (let i = 0; i < project.skills.length; i++) {
      skillsDivs.push("<div class='tag tag-skill'>" + project.skills[i] + "</div>");
    }
  }

  div_desc = "<div class='description'>" + project.description + "</div>";
  button_text = project.tags.includes("Game") ? "Play" : "See";
  button = project.link ? "<a class='button rounded play' href='" + project.link + "'>" + button_text + "</a>" : "";
  image = project.image ? "<img src='" + baseurl + project.image + "'>" : "";
  return (
    "<div class='card' tags='" +
    project.tags.join(" ") +
    "' years='" +
    project.year +
    "'>" +
    "<div class='content'>" +
    div_title +
    "<div class='tags'>" +
    tags.join("") +
    "</div>" +
    "<div class='tags'>" +
    skillsDivs.join("") +
    "</div>" +
    div_desc +
    (button ? "<div class='play_container'>" + button + "</div>" : "") +
    "</div>" +
    (image ? "<div class='media'>" + image + "</div>" : "") +
    "</div>"
  );
}

$(document).ready(function () {
  // get data, build grid and create filters
  $.getJSON(baseurl + "/root/data/" + language + "/projects.json", function (data) {
    // console.log(data.projects);
    let projects = data.projects;
    stringsMap = new Map(Object.entries(data.strings));

    // add div for intro
    var introDiv = $("<p/>", { class: "", html: stringsMap.get("Intro") });
    introDiv.appendTo("#projects-container");

    // add div for filters
    var groupFilter = $("<div/>", { class: "group-filter" });
    groupFilter.appendTo("#projects-container");

    // add div for projects
    var cardsDiv = $("<div/>", { class: "cards" });
    cardsDiv.appendTo("#projects-container");

    // generate list of projects
    let items = [];
    for (let i = 0; i < projects.length; i++) {
      items.push(generateCard(projects[i]));
    }
    cardsDiv.html(items.join(""));

    // create filters
    var tags = new Set();
    for (let i = 0; i < projects.length; i++) {
      projects[i].tags.forEach((tag) => tags.add(tag));
    }

    if (language == "en") {
      createTagsFilter(tags);
      createYearsFilter();
    } else {
      // for non-English, first load scripts with translations
      let scriptUrl = baseurl + "root/lib/jQuery-UI-Multiple-Select-Widget/i18n/jquery.multiselect." + language + ".js";
      $.getScript(scriptUrl, function () {
        createTagsFilter(tags);
        createYearsFilter();
      });
    }
  });
});
