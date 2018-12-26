const express = require('express');
const router = express.Router();

const request = require('request');

router.get("/crawlingTest", (req, res, next) => {
    let url = "http://www.naver.com/";

    request(url, (error, response, body) => {
        console.log(body);
    })
})