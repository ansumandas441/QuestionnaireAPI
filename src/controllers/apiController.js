
const repository = require('../repository/questionRepository');

const apiController = {
    getQuestions: async (req,res)=>{
        try {
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
                error
            });
        }
    },
    sendAnswer: async (req,res)=>{
        try {
            const file = req.file;
            const answer = req.body.answer;
            const questionId = parseInt(req.body.questionId,10);
            console.log(typeof questionId);
            if (!answer) {
                return res.status(400).json({ message: 'Invalid or missing input' });
            }
            await repository.postAnswer(questionId, answer, file);
            res.status(200).json({message:'success'});
        } catch (error) {
            console.log('Error in fetching questions', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error
            });
        }
    },
}

module.exports = apiController;