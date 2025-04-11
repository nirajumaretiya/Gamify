import mongoose, { Schema, Document } from 'mongoose';

interface IMatchStats extends Document {
  matchId: string;
  teamA: boolean[];
  teamB: boolean[];
  createdAt: Date;
  updatedAt: Date;
}

const MatchStatsSchema = new Schema({
  matchId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  teamA: [{
    type: Boolean,
    required: true,
    validate: {
      validator: function(array: boolean[]) {
        return array.length <= 24;
      },
      message: 'Team A array cannot exceed 24 rounds'
    }
  }],
  teamB: [{
    type: Boolean,
    required: true,
    validate: {
      validator: function(array: boolean[]) {
        return array.length <= 24;
      },
      message: 'Team B array cannot exceed 24 rounds'
    }
  }]
}, {
  timestamps: true
});

// Validate array lengths match
MatchStatsSchema.pre('save', function(next) {
  if (this.teamA.length !== this.teamB.length) {
    next(new Error('Team A and Team B must have same number of rounds'));
  }
  next();
});

const MatchStats = mongoose.models.MatchStats || mongoose.model<IMatchStats>('MatchStats', MatchStatsSchema);

export default MatchStats;