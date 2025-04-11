import mongoose, { Schema, Document } from 'mongoose';

interface IWeaponStats {
  weaponName: string;
  kills: number;
  damage: number;
}

interface IWeaponAnalysis extends Document {
  matchId: string;
  weapons: IWeaponStats[];
  createdAt: Date;
  updatedAt: Date;
}

const WeaponStatsSchema = new Schema({
  weaponName: {
    type: String,
    required: true
  },
  kills: {
    type: Number,
    required: true,
    min: 0
  },
  damage: {
    type: Number,
    required: true,
    min: 0
  }
});

const WeaponAnalysisSchema = new Schema({
  matchId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  weapons: [WeaponStatsSchema]
}, {
  timestamps: true
});

const WeaponAnalysis = mongoose.models.WeaponAnalysis || 
  mongoose.model<IWeaponAnalysis>('WeaponAnalysis', WeaponAnalysisSchema);

export default WeaponAnalysis;