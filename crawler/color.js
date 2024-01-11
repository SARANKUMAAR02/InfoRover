const Color = require("ansi-colors")
const { successBullet, dangerBullet, boxBullet, FilesuccessBullet } = require("./banner")

function info(a){
    console.log(`${successBullet}${Color.cyanBright.bold(a)}`)
}

function infoURL(a){
    console.log(`${successBullet}${Color.cyanBright.bold(a.slice(0,21))}${Color.greenBright.bold(a.slice(21,a.length))}`)
}

function error(a){
    console.log(Color.underline(`${dangerBullet}${Color.redBright.bold(a)}`))
}

function noResponse(a){
    console.log(Color.underline(`${dangerBullet}${Color.blueBright.bold(a)}`))
}

function questions(a){
    console.log(`${boxBullet}${Color.cyanBright.bold(a)}`)
}

function depthInfo(a){
    console.log(`${successBullet}${Color.magentaBright.bold(a.slice(0,11))}${Color.cyanBright.bold(a.slice(11,a.length))}`)
}

function fileSuccess(a){
    console.log()
    console.log(`${FilesuccessBullet}${Color.blueBright.bold(a)}`)
    console.log()
}


module.exports = {info, error, noResponse, depthInfo, questions, fileSuccess, infoURL}
