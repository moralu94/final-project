const express = require('express')
const { DateTime } = require("luxon");
const { faker } = require('@faker-js/faker')

const generatePost = () => {

    const post = {
        title: faker.lorem.words(6),
        body: faker.lorem.sentence(12),
        date: DateTime.now().setLocale('es').toFormat('DDD'),
    }

    // testear
    // console.log(post)
    
    return post
}

generatePost()

module.exports = {
    generatePost
}
