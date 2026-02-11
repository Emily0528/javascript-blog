"use strict";

function titleClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  console.log("Link was clicked!");
  //console.log("clickedElement (with plus): " + clickedElement);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* [DONE] add class 'active' to the clicked link */
  console.log("clickedElement:", clickedElement);
  clickedElement.classList.add("active");

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".post.active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
  console.log("articleSelector:", articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log("targetArticle:", targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add("active");
}

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optArticleAuthorSelector = ".post-author",
  optTagsListSelector = ".tags.list",
  optCloudClassCount = 5,
  optCloudClassPrefix = "tag-size-",
  optAuthorsListSelector = ".authors.list";

function generateTitleLinks(customSelector = "") {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";
  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector,
  );
  let html = "";
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute("id");

    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";
    console.log("linkHTML:", linkHTML);

    /* insert link into titleList */
    titleList.insertAdjacentHTML("beforeend", linkHTML);

    /* insert link into html variable*/
    html = html + linkHTML;
    console.log("html:", html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll(".titles a");
  console.log("links:", links);

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagClass(count, params) {
  // tutaj w przyszłości dodamy logikę obliczania klasy tagu
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(".post");
  console.log("Znalezione artykuły:", articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const optArticleTagsSelector = ".post-tags";
    const titleList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = "";

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");

    /* split tags into array */
    const articleTagsArray = articleTags.split(" ");
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + "</span></a></li>";

      /* add generated code to html variable */
      html += linkHTML;
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    if (titleList) {
      titleList.innerHTML = html;
    }
  }
  /* END LOOP: for every article: */
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", "");
  console.log("tag:", tag);
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove("active");
  }
  /* END LOOP: for each active tag link */
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add("active");
  }
  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener("click", tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article */
  for (let article of articles) {
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */
    let html = "";

    /* get author from data-author attribute */
    const author = article.getAttribute("data-author");

    /* create HTML of the link */
    const authorHTML = '<a href="#author-' + author + '">' + author + "</a>";

    /* insert HTML into author wrapper */
    html = html + authorHTML;
    authorWrapper.innerHTML = html;
  }
  /* END LOOP: for every article */
}

function authorClickHandler(event) {
  /* prevent default action */
  event.preventDefault();

  /* get clicked element */
  const clickedElement = this;

  /* get href attribute */
  const href = clickedElement.getAttribute("href");

  /* extract author from href */
  const author = href.replace("#author-", "");
  console.log("author:", author);

  /* find all active author links */
  const activeAuthorLinks = document.querySelectorAll(
    'a.active[href^="#author-"]',
  );

  /* remove active class */
  for (let activeLink of activeAuthorLinks) {
    activeLink.classList.remove("active");
  }

  /* find all links with matching href */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* add active class */
  for (let authorLink of authorLinks) {
    authorLink.classList.add("active");
  }

  /* generate filtered list of articles */
  generateTitleLinks('[data-author="' + author + '"]');
}

generateAuthors();

function addClickListenersToAuthors() {
  /* find all author links */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* add click listeners */
  for (let authorLink of authorLinks) {
    authorLink.addEventListener("click", authorClickHandler);
  }
}

addClickListenersToAuthors();

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  };

  for (let tag in tags) {
    //console.log(tag + " is used " + tags[tag] + " times");
    // params.max = Math.max(tags[tag], params.max);
    //params.max = tags[tag] > params.max ? tags[tag] : params.max;
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(".post-tags .list");

    /* make html variable with empty string */
    let html = "";

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");

    /* split tags into array */
    const articleTagsArray = articleTags.split(" ");

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";

      /* add generated code to html variable */
      html += linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  }

  /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  console.log("tagsParams:", tagsParams);
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = "";

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [New] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += tag + " (" + allTags[tag] + ") ";
    /*const tagLinkHTML =
      '<li><a href="#tag-' +
      tag +
      '" class="' +
      calculateTagClass(allTags[tag], tagsParams) +
      '">' +
      tag +
      " (" +
      allTags[tag] +
      ")</a></li>";
*/
    const tagLinkHTML =
      '<li><a href="#tag-' +
      tag +
      '" class="' +
      calculateTagClass(allTags[tag], tagsParams) +
      '">' +
      tag +
      " </a></li>";
    //allTagsHTML += linkHTML;
    allTagsHTML += tagLinkHTML;
  }

  /* [New] END LOOP: for each tag in allTags: */

  /* [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(" ");
  tagList.innerHTML = allTagsHTML;
}

generateTags();
addClickListenersToTags();

/*Lista autorów */

function generateAuthors() {
  /* create empty object for counting authors */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article */
  for (let article of articles) {
    /* get author from data-author */
    const articleAuthor = article.getAttribute("data-author");

    /* find author wrapper in article */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* generate link HTML */
    const authorHTML =
      '<a href="#author-' + articleAuthor + '">' + articleAuthor + "</a>";

    /* insert author link into article */
    authorWrapper.innerHTML = authorHTML;

    /* count author occurrences */
    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
  }
  /* END LOOP */

  /* find authors list in sidebar */
  const authorsList = document.querySelector(optAuthorsListSelector);

  /* create html variable */
  let allAuthorsHTML = "";

  /* START LOOP: for each author */
  for (let author in allAuthors) {
    const authorLinkHTML =
      '<li><a href="#author-' +
      author +
      '">' +
      author +
      " (" +
      allAuthors[author] +
      ")" +
      "</a></li>";

    allAuthorsHTML += authorLinkHTML;
  }
  /* END LOOP */

  /* insert into sidebar */
  authorsList.innerHTML = allAuthorsHTML;
}
