{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML),
  };


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optAuthorListSelector = '.list.authors';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    //console.log('Link was clicked!');
    //console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    //console.log('clickedElement: ', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const hrefClickedLink = clickedElement.getAttribute('href');
    //console.log('hrefClickedLink: ', hrefClickedLink);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const clickedArticle = document.querySelector(hrefClickedLink);
    //console.log('clickedArticle: ', clickedArticle);

    /* [DONE] add class 'active' to the correct article */
    clickedArticle.classList.add('active');
  };

  function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    //console.log('titleList:', titleList);
    titleList.innerHTML='';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('articles:', articles);
    console.log('customSelector:', customSelector);

    let html = '';

    for (let article of articles){

      /* get the article id */
      const articleId = article.getAttribute('id');
      //console.log('articleID: ', articleId);

      /* find the title element and get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      //console.log('articleTitle: ', articleTitle);

      /* create HTML of the link */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      //console.log('linkHTML: ', linkHTML);

      /* insert link into titleList */
      // titleList.insertAdjacentHTML('beforeend', linkHTML);

      html += linkHTML;
      //console.log('html: ', html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    //console.log('links: ', links);

    for (let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();

  function calculateTagsParams(tags) {
    const tagsParams = {
      min: 99999999,
      max: 0
    };

    for (let tag in tags) {
      tagsParams.min = Math.min(tags[tag], tagsParams.min);
      tagsParams.max = Math.max(tags[tag], tagsParams.max);
    }

    console.log('tagsParams: ', tagsParams);

    return tagsParams;

  }

  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    return classNumber;

  }

  function generateTags(){
    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('generateTags - articles: ', articles);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagSelector);
      console.log('generateTags - tagswrapper: ', tagsWrapper);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('generateTags - articleTags: ', articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('generateTags - articleTagsArray: ', articleTagsArray);


      /* START LOOP: for each tag */
      for (let articleTag of articleTagsArray) {

        /* generate HTML of the link */
        //const linkHTML = '<li><a href="#tag-' + articleTag + '">' + articleTag + '</a></li>';
        const linkHTMLData = {id: articleTag, title: articleTag};
        const linkHTML = templates.tagLink(linkHTMLData);
        console.log ('generateTags - linkHTML', linkHTML);

        /* add generated code to html variable */
        html += linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        // eslint-disable-next-line no-prototype-builtins
        if(!allTags.hasOwnProperty(articleTag)){
          /* [NEW] add generated code to allTags array */
          allTags[articleTag] = 1;
        } else {
          allTags[articleTag]++;
        }

      /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);


    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    /* [NEW] create vaiable for all links HTML code */
    const allTagsData = {tags: []};

    /* START LOOP: for each tag in allTags */
    for (let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      //allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    /* [NEW] END LOOP: for each tag in allTags */

    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('allTagsData: ', allTagsData);
  }

  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const hrefClickedTag = clickedElement.getAttribute('href');
    console.log('hrefClickedTag: ', hrefClickedTag);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = hrefClickedTag.replace('#tag-', '');
    console.log('tag: ', tag);

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('activeTags: ', activeTags);

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags){
      console.log('activeTag: ', activeTag);

      /* remove class active */
      activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const clickedTagLinks = document.querySelectorAll('a[href="' + hrefClickedTag + '"]');
    console.log('clickedTagLinks', clickedTagLinks);

    /* START LOOP: for each found tag link */
    for (let clickedTagLink of clickedTagLinks){

      /* add class active */
      clickedTagLink.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    console.log('tagLinks: ', tagLinks);

    /* START LOOP: for each link */
    for ( let tagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      console.log(tagLink);
    }
    /* END LOOP: for each link */
  }

  addClickListenersToTags();

  function generateAuthors() {
    let allAuthors = [];
    const allAuthorsData = {authors: []};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('author articles: ', articles);

    /* START LOOP for every article */
    for (let article of articles) {

      /* find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      console.log('authorWrapper: ', authorWrapper);

      /* get author from data-author attribute */
      const author = article.getAttribute('data-author');
      console.log('author: ', author);

      /* generate html for author link */
      //const authorLink = '<a href="#author-' + author + '">' + author + '</a>';
      const linkHTMLData = {id: author, title: author};
      const linkHTML = templates.authorLink(linkHTMLData);



      //const authorListLink = '<li><a href="#author-' + author + '">' + author + '</a></li>';


      if (allAuthors.indexOf(author) == -1){
        allAuthors.push(author);
        allAuthorsData.authors.push({
          author: author
        });
      }

      /* add html to author wrapper */
      authorWrapper.innerHTML = linkHTML;

    /* END LOOP for every article */
    }
    console.log('allAuthors: ', allAuthors);

    const authorList = document.querySelector(optAuthorListSelector);

    authorList.innerHTML = templates.authorListLink(allAuthorsData);
    console.log('allAuthorsData: ', allAuthorsData);

  }

  generateAuthors();

  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    console.log('clicked author: ', author);

    /* find all author links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active author link */
    for (let activeAuthor of activeAuthors){
      console.log('activeAuthor: ', activeAuthor);

      /* remove class active */
      activeAuthor.classList.remove('active');

    /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const clickedAuthorLinks = document.querySelectorAll('a[href="' + href + '"');
    console.log('clickedAuthorLinks: ', clickedAuthorLinks);

    /* START LOOP: for each found author link */
    for (let clickedAuthorLink of clickedAuthorLinks){

      /* add class active */
      clickedAuthorLink.classList.add('active');

    /* END LOOP: for each found author link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  }

  function addClickListenersToAuthors() {
    /* find all links to authors */
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    console.log('authorLinks: ', authorLinks);

    /* START LOOP: for each link */
    for ( let authorLink of authorLinks){
      /* add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
    }
  }

  addClickListenersToAuthors();
}
