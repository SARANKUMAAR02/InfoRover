#!/usr/bin/env node

const { questBullet,bannerTemplate, boxBullet, sleep, interruption } = require("./banner");
const { crawlPage, crawlAll } = require("./crawler");
const { printReport, printReportAll } = require("./report");
const readlineSync = require('readline-sync');
const Color = require('ansi-colors');
const { info, questions } = require("./color");
const { art } = require("./art");
const { scrape } = require("./scraping");
const { capture } = require("./capture");

process.on('SIGINT', () => {
  console.log(`\n\n${interruption} ${Color.redBright.bold("Program interrupted.")}`);
  console.log()
  process.exit();
});

async function main() {
  await bannerTemplate()
  const userInput = readlineSync.question(`${questBullet}${Color.green.bold(" What dou you prefer ")}${Color.magenta.bold("[1-5] :")}`);
  console.clear()
  art()
  await sleep(2000)
  console.clear()
  while(true){
    if(Number(userInput) === 1){
      const baseURL = readlineSync.question(questions(' Enter the url to crawl :'));
      console.log()
      info(` Starting crawl of ${baseURL}`);
      const pages = await crawlPage(baseURL, baseURL, {});
      printReport(pages,baseURL)
      break
    }
    else if(Number(userInput) === 2){
      const baseURL = readlineSync.question(questions(' Enter the url to crawl :'));
      console.log()
      info(` Starting crawl of ${baseURL}`);
      const pagesAll = await crawlAll(baseURL, baseURL, {}, 1, 3);
      printReportAll(pagesAll,baseURL)
      break
    }
    else if(Number(userInput) === 3){
      const baseURL = readlineSync.question(questions(' Enter the url to scrape :'));
      console.log()
      info(` Starting scraping of ${baseURL}`);
      scrape(baseURL)
      break
    }
    else if(Number(userInput) === 4){
      const baseURL = readlineSync.question(questions(' Enter the url to capture image :'));
      console.log()
      info(` Starting capture of ${baseURL}`);
      capture(baseURL)
      break
    }
    else if(Number(userInput) === 5){
      console.log()
      info(' Exiting.....')
      await sleep()
      console.clear()
      break
    }
    else{
      error(`Invalid option !! enter correct option [1-5].`)
      break
    }
  }
}

main()







