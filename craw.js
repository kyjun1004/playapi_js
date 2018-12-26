const request = require('request');
const url = 'http://www.naver.com';
const cheerio = require('cheerio');

request(url, function(err, res, body){
    if(err){
        throw err;
    }
    const $ = cheerio.load(body);
    const nav = $('.ah_list .ah_a');
    nav.each(function(){
        console.log($(this).children('.ah_k').text());
        const link = $(this).attr('href');
        request(link, function(err, res, body){
            if(err){
                throw err;
            }
            const $ = cheerio.load(body);
            const nav = $('._related_keyword_ul li');
            nav.each(function(){
                console.log($(this).children().text());
            })
        })
    });
});