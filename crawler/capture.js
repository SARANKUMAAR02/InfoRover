const puppeteer = require('puppeteer');
const { fileSuccess } = require('./color');
const { spinner } = require('./spinner');
const { sleep } = require('./banner');


async function capture(url){
    const urlobj = new URL(url)
    const filePath = `outputs/Image/${urlobj.hostname.split(".").at(0)}.png`
    console.log()
    spinner()
    await sleep()
    const browser = await puppeteer.launch({headless: "new",})
    const page = await browser.newPage();
    await page.goto(`${url}`)
    await page.screenshot({path:filePath,fullPage:true}) 
    await page.pdf({path:`outputs/Image/${urlobj.hostname.split(".").at(0)}.pdf`,format:"A4"}) 
    fileSuccess(` Image ${urlobj.hostname.split(".").at(0)}.png captured successfully.`)
    process.exit(0)
}



module.exports = {capture}