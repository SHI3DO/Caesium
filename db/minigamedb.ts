import mongoose from 'mongoose';

const schema = new mongoose.Schema({
   UserID: {
      type: String,
      required: true,
   },
   Coin: {
      type: Number,
      required: true,
   },
   Created: {
      type: Date,
      required: true,
   },
   isBanned: {
      type: Boolean,
      required: true,
   },
   Casino_PP: {
      type: Number,
      required: true
   }
});

export default mongoose.model('minigamedb', schema, 'minigamedb');
