
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// const parseResponse = async (data) => {
//     const url = `https://www.yad2.co.il/vehicles/${data.type}?manufacturer=${data.manufacturer}&model=${data.model}&year=${data.fromYear}-${data.toYear}&km=0-${data.kilometers}&hand=1-${data.owners}`;


//     const response = await axios.get(url);
//     return cheerio.load(response.data);
// }
// const fetchData = async (body) => {
//     console.log('fetchData has been called!');
//     const $ = await parseResponse(body);
//     data = [];
//     $('.feed_list').children('.feeditem').each((i,elem) => {
//         $('.feed_list').children('.feeditem').find(`#feed_item_${i}`).trigger('click')
//         $('.feed_list').children('.feeditem').find(`#feed_item_${i}`).find('#share_item_copy-link').find('i').trigger('click');
//         data.push({

//             title: $(elem).find('.title').text().trim(),
//             engineSize:$(elem).find('#data_engine_size_' + i).text(),
//             owners:$(elem).find('#data_hand_' + i).text(),
//             year:$(elem).find('#data_year_' + i).text(),
//             price:$(elem).find('.price').text().trim(),
//             summary:$(elem).find('.details_text').text(),
//             kilometers:`KM: ${$(elem).find('.more_details_kilometers').text()}`,
//             link: $('.feed_list').children('.feeditem').find(`#feed_item_${i}`).find('#share_item_copy-link').find('textarea').val()
//         })
//     })
//     return data;
// }

const parseResponse = async (data) => {
    try{

    const engine = data.minEngineSize ? `&engineval=${data.minEngineSize}--1` : '';

    const url = `https://www.yad2.co.il/vehicles/${data.type}?manufacturer=${data.manufacturer}&model=${data.model}&year=${data.fromYear}-${data.toYear}&km=10000-${data.kilometers}&hand=${data.minOwners}-${data.maxOwners}${engine}`;  

    // const url = 'https://www.yad2.co.il/vehicles/private-cars?manufacturer=1&model=1270&year=2019-2020&km=10000-20000'
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0)
    await page.goto(url)
    await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.min.js' });
    await page.setViewport({ width: 937, height: 1920 })

    // await page.waitForSelector('.feed_list > .feeditem')
    // await page.click('.feed_list > .feeditem')
    
    // await page.waitForSelector('.footer > .share_menu > .item > #share_item_copy-link > .share_icon')
    // await page.click('.footer > .share_menu > .item > #share_item_copy-link > .share_icon')
    
    const handles = await page.$$('.feeditem');
    for (const handle of handles)
        await handle.click();
    
    const ihandles = await page.$$('#share_item_copy-link > .share_icon');
    for (const handle of ihandles)
        await handle.click();



    const result = await page.evaluate(()=>{
        var data = [];
        const $ = window.$; 

        $('.feed_list').children('.feeditem.table').each((i,elem) => {
            if(!$(elem).children().hasClass('agency')){
            data.push({
                title: $(elem).find('.subtitle').text().trim().replace(/(\r\n|\n|\r)/gm, ''),
                engineSize:$(elem).find('#data_engine_size_' + i).text(),
                owners:$(elem).find('#data_hand_' + i).text(),
                year:$(elem).find('#data_year_' + i).text(),
                price:$(elem).find('.price[data-test-id=item_price]').text().trim().replace(/(\r\n|\n|\r)/gm, ''),
                summary:$(elem).find('.details_text').text(),
                kilometers:$(elem).find('#more_details_kilometers').find('span').text().trim(),
                link: $(elem).find('#share_item_copy-link').find('textarea').val()
            })
        }
        })
        return data;
    })
    // await browser.close()
    return result;
    // console.log(result)
    }
    catch(err){
        console.log(err)
    }

}

module.exports = parseResponse;
