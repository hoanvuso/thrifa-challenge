import Question from '../models/question';
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
    res.json({ status: 200, questions });
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
        || !req.body.question.questionType
        || !req.body.question.desiredAnswer) {
    res.json({status: 403});
  }

  var title = req.body.question.title;
  var subTitle = req.body.question.subTitle;
  var questionType = req.body.question.questionType;
  var desiredAnswer = req.body.question.desiredAnswer;
  var selections = req.body.question.selections;

  const newQuestion = new Question({
      title: sanitizeHtml(title),
      subTitle: sanitizeHtml(subTitle),
      questionType: questionType,
      desiredAnswer: desiredAnswer,
      selections: selections,
      cuid: cuid()
  });

  newQuestion.save((err, saved) => {
    if (err) {
      res.json({status: 500, error: err});
    }

    res.json({status: 200, question: saved });
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
    res.json({status: 200, question });
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
