const axios = require('axios');
const FormData = require('form-data');
const config = require('../config');
const fs = require('fs');

const repository = {
    fetchQuestions: async (topicId, paginationStart = 0 , paginationLimit = 25)=>{
        try {
            console.log("topicid:",topicId);
            console.log("paginationStart:",paginationStart);
            console.log("paginationLimit:",paginationLimit);
            const dataObj = [];
            const response = await axios.get(`http://localhost:1337/api/topics/${topicId}`, {
                    params: {
                        [`pagination[start]`]: paginationStart,
                        [`pagination[limit]`]: paginationLimit,
                        populate: 'questions',
                    },
                    headers: {
                        Authorization: `Bearer ${config.strapiApiToken}`
                    }    
                });
                const questionObj = response.data.data.attributes.questions;
                questionObj.data.forEach(element => {
                    dataObj.push({id: element.id, question: element.attributes.description})
                });
                console.log(dataObj);
                return dataObj;
        } catch (error) {
            console.log("fetchQuestions Error", error);
            throw error;
        }
    },
    postAnswer: async (questionId, answerText, file)=>{
        try {
            const fileName = file.filename;
            const filePath = file.destination+'/'+fileName;
            const fileData = fs.createReadStream(filePath);
            let data = new FormData();
            data.append('ref', 'api::answer.answer');
            data.append('refId', '1');
            data.append('field', 'file');
            data.append('files', fileData);

            let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:1337/api/upload',
            headers: { 
                'Authorization': 'Bearer a4292a39a52e55b9985d021ece449419757d096ede4fc3a848c134dc3594d76a3edb43424cbb2893313402f40663209aac92ceec0fb434c4134ea07cd58f577a8c26a241a0a6dcc43403ed9017aee578dc3552b2d5c6e2983fa663c64c10b0168c6322a7ab3d535349d8b752e76e55c72c3195607a61c19e593838cf4febbb7e', 
                ...data.getHeaders()
            },
            data : data
            };

            axios.request(config)
            .then((response) => {
            console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
            console.log(error);
            });
        } catch (error) {
            console.log("postAnswer Error", error);
            throw error;
        }
    },
}

module.exports = repository;