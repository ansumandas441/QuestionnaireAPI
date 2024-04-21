
const repository = require('../repository/questionRepository');

const apiController = {
    // sendTopic: async (req, res)=> {
    //     // axios
    // }
    // ,
    getQuestions: async (req,res)=> {
        try {
            const {topicId, paginationStart, paginationLimit} = req.query;
            
            const data = await repository.fetchQuestions(topicId, paginationStart, paginationLimit);
            // const jsonData = JSON.stringify(data);
            res.status(200).json(data);
        } catch (error) {
            console.log('Error in fetching questions', error);
            res.json({error: error});
        }
    },
    // sendAnswer:
}

module.exports = apiController;