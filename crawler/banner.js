const figlet = require("figlet")
const Color = require('ansi-colors')
const { spinner } = require("./spinner")

const text = "InfoRover"
const font = "Standard"
const version = ' '.repeat(29)+Color.white.bgBlue.bold("Version : 1.0.0")
const boxBullet = `${Color.greenBright.bold("[")}${Color.white.bold("-")}${Color.greenBright.bold("]")}`
const dotBullet = `${Color.redBright.bold("[")}${Color.whiteBright.bold("::")}${Color.redBright.bold("]")}`
const one = `${Color.redBright.bold("[")}${Color.white.bold("1")}${Color.redBright.bold("]")}`
const two = `${Color.redBright.bold("[")}${Color.white.bold("2")}${Color.redBright.bold("]")}`
const three = `${Color.redBright.bold("[")}${Color.white.bold("3")}${Color.redBright.bold("]")}`
const four = `${Color.redBright.bold("[")}${Color.white.bold("4")}${Color.redBright.bold("]")}`
const exit = `${Color.redBright.bold("[")}${Color.white.bold("5")}${Color.redBright.bold("]")}`
const questBullet = `${Color.redBright.bold("[")}${Color.white.bold("?")}${Color.redBright.bold("]")}`
const successBullet = `${Color.greenBright.bold("[")}${Color.white.bold("√")}${Color.greenBright.bold("]")}`
const dangerBullet = `${Color.redBright.bold("[")}${Color.white.bold("×")}${Color.redBright.bold("]")}`
const cautionLine1=Color.white.bgRed.bold("::  Disclaimer: Developers assume no liability and are not    ::")
const cautionLine2=Color.white.bgRed.bold("::  responsible for any misuse or damage caused by InfoRover. ::")
const interruption = `${Color.redBright.bold("[")}${Color.white.bold("!")}${Color.redBright.bold("]")}`
const FilesuccessBullet = `${Color.greenBright.bold("[")}${Color.whiteBright.bold("+")}${Color.greenBright.bold("]")}`

const sleep = (ms = 3000 ) => new Promise((e) => setTimeout(e,ms))

function bannerTemplate(){

    console.clear()

    return new Promise((resolve, reject) => {
      figlet.text(text, { font }, async (err, data) => {
        if (err) {
          console.log("Error in figlet...");
          return;
        }

        console.log(Color.whiteBright.bold(data));
        console.log();
        console.log(version);
        console.log()
        console.log(cautionLine1+"\n"+cautionLine2)
        console.log();
        console.log(
          `${boxBullet} ${Color.blueBright.bold(
            "Tool Created by sk (Saran Kumaar)"
          )}`
        );
        console.log()
        spinner()
        await sleep()
        console.log(
          Color.yellow.bold(
            `${dotBullet} Select an opeartion listed below ${dotBullet}`
          )
        );
        console.log();
        console.log(
          `${one} ${Color.yellow.bold("Crawl Internal Links")}
${two} ${Color.yellow.bold("Crawl Internal and External Links")}
${three} ${Color.yellow.bold("Scrape the Webpage")}
${four} ${Color.yellow.bold("Capture the image of Webpage")}
${exit} ${Color.yellow.bold("Exit")}
`
        );

        resolve();
      });
    });

}

module.exports = {bannerTemplate, questBullet, boxBullet, successBullet, dangerBullet, interruption, FilesuccessBullet, sleep}