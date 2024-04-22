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
                }
            );
            const questionObj = response.data.data.attributes.questions;
            questionObj.data.forEach(element => {
                dataObj.push({id: element.id, question: element.attributes.description})
            });
            console.log(dataObj);
            return dataObj;
        } catch (error) {
            console.log("fetchQuestions Error");
            throw error;
        }
    },
    postAnswer: async (questionId, answerText, file)=>{
        try {
            const requestPayload = {
                "data": {
                    answerdata:answerText,
                    question:questionId
                }
            }
            const response = await axios.post(`http://localhost:1337/api/answers`,
                requestPayload,
                {
                    headers: {
                        Authorization: `Bearer ${config.strapiApiToken}`
                    }
                }
            );
            const id = response.data.data.id;
            sendFile(id, file);
            
        } catch (error) {
            console.log("postAnswer Error");
            throw error;
        }
    },
}

const sendFile = (id, file)=>{
    const fileName = file.filename;
    const filePath = file.destination+'/'+fileName;
    const fileData = fs.createReadStream(filePath);
    let data = new FormData();
    data.append('ref', 'api::answer.answer');
    data.append('refId', id);
    data.append('field', 'file');
    data.append('files', fileData);

    let requestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:1337/api/upload',
    headers: { 
        Authorization: `Bearer ${config.strapiApiToken}`,
        ...data.getHeaders()
    },
    data : data
    };

    axios.request(requestConfig)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log("File upload error");
        throw error;
    });
}

module.exports = repository;