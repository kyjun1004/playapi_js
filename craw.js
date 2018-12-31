const request = require('request');
const cheerio = require('cheerio');

class Data {
    constructor(naver_search, naver_search_down){
        this.naver_search = naver_search;
        this.naver_search_down = naver_search_down;
    }
}

function naver_now(){
    get_naver_search().then(arr => {
        const promise = arr.map(arr => get_naver_search_down(arr));
        return Promise.all(promise);
    }).then(result => console.log(result));
}

function get_naver_search(){
    const url = 'http://www.naver.com';

    return new Promise((resolve, reject) => {
        request(url, function(err, res, body){
            if(err){
                throw err;
            }
            const $ = cheerio.load(body);
            const arr = [];
            const search = $('.ah_list .ah_l .ah_a')
            search.each(function(index){
                if(index < 10){
                    arr.push($(this).children('.ah_k').text());
                }
            });

            resolve(arr);
        })
    })
}

function get_naver_search_down(arr){
    const url = "https://search.naver.com/search.naver?where=nexearch&query="
                + encodeURI(arr);
    return new Promise((resolve, reject) => {

        request(url, function(err, res, body){
            if(err){
                throw err;
            }
            const $ = cheerio.load(body);
            const narr = [];

            const search_down = $('._related_keyword_ul li a');
            search_down.each(function(){
                narr.push($(this).text());
            });

            resolve(new Data(arr, narr));
        })
    })
}

naver_now();