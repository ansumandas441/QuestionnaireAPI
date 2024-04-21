const axios  = require('axios');
const { response } = require('express');
const config = require('../config');
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
    }
}

module.exports = repository;