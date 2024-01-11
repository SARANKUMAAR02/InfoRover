const puppeteer = require('puppeteer')
const fs = require('fs');
const { fileSuccess } = require('./color');
const { spinner } = require('./spinner');
const { sleep } = require('./banner');

async function scrape(url){
    const urlObj = new URL(url);
    const filePath = `outputs/Html/${urlObj.hostname.split(".").at(0)}.html`
    console.log()
    spinner("Processing")
    await sleep()
    const browser = await puppeteer.launch({headless: "new",})
    const page = await browser.newPage();
    await page.goto(`${url}`)    
    const html = await page.content();

    fs.writeFile(filePath,html,(err)=>{
        if(err) throw err;
        fileSuccess(` HTML file "${urlObj.hostname.split(".").at(0)}.html" created successfully .`)
        process.exit(0)
    })

    

}

module.exports = {scrape}
