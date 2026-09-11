import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: [
        'campaign_approved',
        'campaign_rejected',
        'withdrawal_approved',
        'withdrawal_rejected',
        'report_resolved',
        'user_role_changed',
        'user_suspended',
        'campaign_flagged',
      ],
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    targetType: {
      type: String,
      required: true,
      enum: ['Campaign', 'WithdrawalRequest', 'Report', 'User'],
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

auditLogSchema.index({ performedBy: 1 });
auditLogSchema.index({ targetType: 1, targetId: 1 });
auditLogSchema.index({ createdAt: -1 });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
