import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const questionSchema = new Schema({
	cuid: { type: 'String', required: true },
	title: { type: 'String', required: true },
	subTitle: { type: 'String', required: true },
	questionType: {type: 'String', enum: ['one-choice', 'multi-choice'], default: 'one-choice', required: true},
 	desiredAnswer: { type: [Schema.Types.ObjectId], ref: 'Selection', required: false },
  	dateAdded: { type: 'Date', default: Date.now, required: false },
});

export default mongoose.model('Question', questionSchema);