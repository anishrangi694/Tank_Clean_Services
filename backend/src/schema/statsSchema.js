import mongoose from "mongoose";

// one small document per counter, e.g. { key: "visitors", count: 120 }
const statsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const Stats = mongoose.model("Stats", statsSchema);

export default Stats;