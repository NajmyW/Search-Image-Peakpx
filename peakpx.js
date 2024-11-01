const axios = require('axios')
const cheerio = require('cheerio')

async function peakpx(q) {
  try {
    const { data } = await axios.get('https://www.peakpx.com/en/search?q=' + q)
    const $ = cheerio.load(data)
    let img = []
    $('figure > a').each(function (a, b) {
      img.push($(b).attr('href'));
    })
    const random = img[Math.floor(Math.random() * img.length)]
    const getHD = (await axios.get(random)).data
    const $$ = cheerio.load(getHD)
    const imgHD = $$('#fig > img').attr('src')
    console.log(imgHD)
    return imgHD
  } catch (e) {
    return e.message
  }
}
// peakpx('loli')
