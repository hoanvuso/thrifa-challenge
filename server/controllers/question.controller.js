import Question from '../models/question';
import Selection from '../models/selection';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all questions
 * @param req
 * @param res
 * @returns void
 */
export function getQuestions(req, res) {
  Question.find().sort('-dateAdded').exec((err, questions) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ questions });
  });
}

/**
 * Save a question
 * @param req
 * @param res
 * @returns void
 */
export function addQuestion(req, res) {
  if (!req.body.question.title 
        || !req.body.question.subTitle 
        || !req.body.question.questionType) {
    res.json({status: 403});
  }

  const newQuestion = new Question(req.body.question);

  // Let's sanitize inputs
  newQuestion.title = sanitizeHtml(newQuestion.title);
  newQuestion.subTitle = sanitizeHtml(newQuestion.subTitle);
  newQuestion.cuid = cuid();
  
  newQuestion.save((err, saved) => {
    if (err) {
      res.json({status: 500, error: err});
    }
    res.json({ question: saved });
  });
}

/**
 * Get a single question
 * @param req
 * @param res
 * @returns void
 */
export function getQuestion(req, res) {
  Question.findOne({ cuid: req.params.cuid }).exec((err, question) => {
    if (err) {
      res.json({status: 500, error: err});
    }
    res.json({ question });
  });
}

/**
 * Delete a question
 * @param req
 * @param res
 * @returns void
 */
export function deleteQuestion(req, res) {
  Question.findOne({ cuid: req.params.cuid }).exec((err, question) => {
    if (err) {
      res.json({status: 500, error: err});
    }

    question.remove(() => {
      res.json({ status: 200, msg: 'Question removed' });
    });
  });
}
