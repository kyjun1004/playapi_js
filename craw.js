const request = require('request-promise');
const cheerio = require('cheerio');

class Data {
    constructor(naver_search, naver_search_down){
        this.naver_search = naver_search;
        this.naver_search_down = naver_search_down;
    }
}

async function naver_now(){
    const naver_result = await get_naver_search();
    const promise = naver_result.map(naver_search_data_array => get_naver_search_down(naver_search_data_array));
    console.log(await Promise.all(promise));
}

async function get_naver_search(){
    try {
        const url = 'http://www.naver.com';

        const body = await request(url)
        const $ = cheerio.load(body);
        const naver_search_array = [];
        const search = $('.ah_list .ah_l .ah_a')
        search.each(function(index){
            if(index < 10){
                naver_search_array.push($(this).children('.ah_k').text());
            }
        });
        return naver_search_array;
    } catch (error) {
        console.log(error);
    }
}

async function get_naver_search_down(naver_search_array){
    try{
        const url = "https://search.naver.com/search.naver?where=nexearch&query="
                    + encodeURI(naver_search_array);

        const body = await request(url)
        const $ = cheerio.load(body);
        const naver_search_array_down = [];

        const search_down = $('._related_keyword_ul li a');
        search_down.each(function(){
            naver_search_array_down.push($(this).text());
        });

        return new Data(naver_search_array, naver_search_array_down);
    }catch(error){
        console.log(error);
    }
}

naver_now();