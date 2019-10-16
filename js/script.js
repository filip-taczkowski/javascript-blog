{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
  
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
  
    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement: ', clickedElement);
    clickedElement.classList.add('active');
  
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
  
    /* [DONE] get 'href' attribute from the clicked link */
    const hrefClickedLink = clickedElement.getAttribute('href');
    console.log('hrefClickedLink: ', hrefClickedLink);
  
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const clickedArticle = document.querySelector(hrefClickedLink);
    console.log('clickedArticle: ', clickedArticle);

    /* [DONE] add class 'active' to the correct article */
    clickedArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks() {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log('titleList:', titleList);
    titleList.innerHTML='';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('articles:', articles);

    let html = '';

    for (let article of articles){

      /* get the article id */
      const articleId = article.getAttribute('id');
      console.log('articleID: ', articleId);

      /* find the title element and get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('articleTitle: ', articleTitle);

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('linkHTML: ', linkHTML);

      /* insert link into titleList */
      // titleList.insertAdjacentHTML('beforeend', linkHTML);

      html += linkHTML;
      console.log('html: ', html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('links: ', links);
    
    for (let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();
    
}
