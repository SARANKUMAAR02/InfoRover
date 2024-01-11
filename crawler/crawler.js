const { JSDOM } = require("jsdom");
const { error, depthInfo, noResponse, infoURL } = require("./color");

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);

  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;

  infoURL(` Actively crawling : ${currentURL}`);

  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log()
      error(
        ` Error in fetch with status code : ${resp.status}, on page ${currentURL}`
      );
      console.log()
      return pages;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log()
      noResponse(
        ` Non HTML response, content type : ${contentType}, on page ${currentURL}`
      );
      console.log()
      return pages;
    }

    const htmlBody = await resp.text();

    nextURLs = getURLsFromHTML(htmlBody, baseURL);
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);                  
    }
  } catch (err) {
    console.log()
    error(` Error in fetch : ${err.message}, on the page : ${currentURL}`);
    console.log()
  }

  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      //relative
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log()
        error(` Error with relative url : ${err.message}`);
        console.log()
      }
    } else {
      //absolute
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log()
        error(` Error with absolute url : ${err.message}`);
        console.log()
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}


async function crawlAll(baseURL, currentURL, pagesAll, depth, maxDepth) {
    const normalizedCurrentURL = normalizeURL(currentURL);
  
    if (depth >= maxDepth) {
      return pagesAll;
    }
  
    if (pagesAll[normalizedCurrentURL] > 0) {
      pagesAll[normalizedCurrentURL]++;
      return pagesAll;
    }
  
    pagesAll[normalizedCurrentURL] = 1;
  
    depthInfo(` Depth : ${depth}, actively crawling : ${currentURL}`);
  
    try {
      const resp = await fetch(currentURL);
      if (resp.status > 399) {
        console.log()
        error(
          ` Error in fetch with status code : ${resp.status}, on page ${currentURL}`
        );
        console.log()
        return pagesAll;
      }
  
      const contentType = resp.headers.get("content-type");
      if (!contentType.includes("text/html")) {
        console.log()
        noResponse(
          ` Non HTML response, content type : ${contentType}, on page ${currentURL}`
        );
        console.log()
        return pagesAll;
      }
  
      const htmlBody = await resp.text();
  
      const nextURLs = getURLsFromHTML(htmlBody, baseURL);
      for (const nextURL of nextURLs) {
        pagesAll = await crawlAll(baseURL, nextURL, pagesAll, depth + 1, maxDepth);
      }
    } catch (err) {
      console.log()
      error(` Error in fetch : ${err.message}, on the page : ${currentURL}`);
      console.log()
    }
  
    return pagesAll;
  }
  

module.exports = { normalizeURL, getURLsFromHTML, crawlPage, crawlAll };
