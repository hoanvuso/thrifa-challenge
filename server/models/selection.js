import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const selectionSchema = new Schema({
  	uid: { type: 'String', required: true },
  	title: { type: 'String', required: true },
  	questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  	dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Selection', selectionSchema);
