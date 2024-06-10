const axios = require('axios');
const config = require('../config');
require('dotenv').config();

const fs = require('fs');
const csv = require('csv-parser');

//====================================================

const topicList = [];
const topicIdsMap = new Map();
const questionsData = [];

//API request for saving the quetion-topic entries to the database
fs.createReadStream('./src/scripts/SAMPLE.csv')
    .pipe(csv())
    .on('data', async (row) => {
        try {
            const topicTitle = row.Type;
            const question = {
                description: row.Questions,
                topic: row.Type
            }
            if (!topicList.includes(topicTitle)) {
                topicList.push(topicTitle);
            }
            questionsData.push(question);

        } catch (error) {
            console.log("Error reading the csv data: ", error);
        }
    })
    .on('end', async () => {
        try {
            await Promise.all(topicList.map(async (topicTitle) => {
                const requestPayload = {
                    "data": {
                        Title: topicTitle
                    }
                }
                await axios.post(`http://localhost:1337/api/topics`,
                    requestPayload,
                    {
                        headers: {
                            Authorization: `Bearer ${config.strapiApiToken}`
                        }
                    }
                );
            }));
            const response = await axios.get(`http://localhost:1337/api/topics`, {
                    headers: {
                        Authorization: `Bearer ${config.strapiApiToken}`
                    }
                });
                console.log(response.data.data);
                response.data.data.forEach(obj => {
                    const topicId = obj.id;
                    const topic = obj.attributes.Title;
                    topicIdsMap.set(topic, topicId);
                });
            console.log(topicIdsMap);
            await Promise.all(questionsData.map(async (question) => {
                const requestPayload = {
                    "data": {
                        description:question.description,
                        topic:topicIdsMap.get(question.topic)
                    }
                }
                await axios.post(`http://localhost:1337/api/questions`,
                    requestPayload,
                    {
                        headers: {
                            Authorization: `Bearer ${config.strapiApiToken}`
                        }
                    }
                );
            }));
        } catch (error) {
            console.log(error);
        }
    }
);