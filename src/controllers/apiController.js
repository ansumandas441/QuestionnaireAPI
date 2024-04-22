
const repository = require('../repository/questionRepository');

const apiController = {
    getQuestions: async (req,res)=>{
        try {
            //checking for valid input
            const {topicId, paginationStart, paginationLimit} = req.query;
            if(!topicId || !Number.isInteger(Number(topicId))){
                return res.status(400).json({ message: 'Invalid input please provide a valid topicId' });
            }
            if(paginationStart && !Number.isInteger(Number(paginationStart))) {
                return res.status(400).json({ message: 'Invalid input please provide a valid topicId' });
            }
            if(paginationLimit && !Number.isInteger(Number(paginationLimit))) {
                return res.status(400).json({ message: 'Invalid input please provide a valid topicId' });
            }
            const data = await repository.fetchQuestions(topicId, paginationStart, paginationLimit);
            // const jsonData = JSON.stringify(data);
            res.status(200).json(data);
        } catch (error) {
            console.log('Error in fetching questions', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error:error.message
            });
        }
    },
    sendAnswer: async (req,res)=>{
        try {
            const questionId = parseInt(req.body.questionId);
            const file = req.file;
            const answer = req.body.answer;
            //check if questionId is valid
            console.log("questionId:",questionId);
            if(questionId.toString() !== req.body.questionId || !answer){
                console.log('Invalid questionId');
                return res.status(400).json({ message: 'Invalid or missing input' });
            }
            //requesting data from the cms
            await repository.postAnswer(questionId, answer, file);
            //response
            res.status(200).json({message:'success'});
        } catch (error) {
            console.log('Error in fetching questions', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error:error.message
            });
        }
    },
}

module.exports = apiController;