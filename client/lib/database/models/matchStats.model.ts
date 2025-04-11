import mongoose, { Schema, Document } from 'mongoose';

interface IPlayerStats {
  agentName: string;
  playerName: string;
  kills: number;
  deaths: number;
  assists: number;
  kd: number;
  damagePerRound: number;
  headshotPercentage: number;
}

interface IMatchStats extends Document {
  matchId: string;
  players: IPlayerStats[];
  createdAt: Date;
  updatedAt: Date;
}

const PlayerStatsSchema = new Schema({
  agentName: {
    type: String,
    required: true
  },
  playerName: {
    type: String,
    required: true
  },
  kills: {
    type: Number,
    required: true,
    min: 0
  },
  deaths: {
    type: Number,
    required: true,
    min: 0
  },
  assists: {
    type: Number,
    required: true,
    min: 0
  },
  kd: {
    type: Number,
    default: function(this: IPlayerStats) {
      return this.deaths === 0 ? this.kills : +(this.kills / this.deaths).toFixed(2);
    }
  },
  damagePerRound: {
    type: Number,
    required: true,
    min: 0
  },
  headshotPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
});

const MatchStatsSchema = new Schema({
  matchId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  players: [PlayerStatsSchema]
}, {
  timestamps: true
});

const MatchStats = mongoose.models.MatchStats || mongoose.model<IMatchStats>('MatchStats', MatchStatsSchema);

export default MatchStats;