import Report from '../models/Report.js';
import Campaign from '../models/Campaign.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';
export const createReport = asyncHandler(async (req, res) => {
  const { reason } = req.body;
  const { campaignId } = req.params;
  if (!reason || reason.trim().length < 10) {
    throw new ApiError('Report reason must be at least 10 characters', 400);
  }
  const existing = await Report.findOne({
    campaign: campaignId,
    reportedBy: req.user._id,
    status: 'open',
  });
  if (existing) {
    throw new ApiError('You have already reported this campaign', 400);
  }
  const report = await Report.create({
    campaign: campaignId,
    reportedBy: req.user._id,
    reason: reason.trim(),
  });
  res.status(201).json({
    success: true,
    data: report,
  });
});
export const listReports = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  const skip = (Number(page) - 1) * Number(limit);
  const [reports, total] = await Promise.all([
    Report.find(filter)
      .populate('campaign', 'title slug status')
      .populate('reportedBy', 'name email')
      .populate('resolvedBy', 'name')
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(Number(limit)),
    Report.countDocuments(filter),
  ]);
  res.json({
    success: true,
    data: reports,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
});
export const resolveReport = asyncHandler(async (req, res) => {
  const { resolution, flagCampaign } = req.body;
  const report = await Report.findById(req.params.id);
  if (!report) {
    throw new ApiError('Report not found', 404);
  }
  if (report.status === 'resolved') {
    throw new ApiError('Report is already resolved', 400);
  }
  report.status = 'resolved';
  report.resolution = resolution || 'Reviewed and resolved';
  report.resolvedBy = req.user._id;
  report.resolvedAt = new Date();
  await report.save();
  if (flagCampaign) {
    const campaign = await Campaign.findById(report.campaign);
    if (campaign && campaign.status === 'active') {
      campaign.status = 'flagged';
      await campaign.save();
    }
  }
  res.json({
    success: true,
    message: flagCampaign ? 'Report resolved and campaign flagged' : 'Report resolved',
    data: report,
  });
});
