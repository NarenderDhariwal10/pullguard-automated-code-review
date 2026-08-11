const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
    {
        severity: {
            type: String,
            enum: ['HIGH', 'MEDIUM', 'LOW'],
            required: true
        },

        category: {
            type: String,
            enum: [
                'security',
                'performance',
                'maintainability',
                'best-practices'
            ],
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        suggestedFix: {
            type: String,
            required: true
        }
    },
    {
        _id: false
    }
);

const reviewSchema = new mongoose.Schema(
    {
        prNumber: {
            type: Number,
            required: true
        },

        prTitle: {
            type: String,
            required: true
        },

        prUrl: {
            type: String,
            required: true
        },

        repo: {
            type: String,
            required: true
        },

        owner: {
            type: String,
            required: true
        },

        // First/main file of the PR
        filename: {
            type: String,
            default: null
        },

        // All files included in the PR
        filesReviewed: {
            type: [String],
            default: []
        },

        status: {
            type: String,
            enum: [
                'pending',
                'processing',
                'completed',
                'failed'
            ],
            default: 'completed'
        },

        summary: {
            type: String,
            required: true
        },

        overallScore: {
            type: Number,
            min: 0,
            max: 100,
            required: true
        },

        recommendation: {
            type: String,
            enum: [
                'approve',
                'approve_with_suggestions',
                'needs_changes'
            ],
            required: true
        },

        issues: {
            type: [issueSchema],
            default: []
        },

        categoryScores: {
            security: {
                type: Number,
                min: 0,
                max: 100,
                default: 0
            },

            performance: {
                type: Number,
                min: 0,
                max: 100,
                default: 0
            },

            maintainability: {
                type: Number,
                min: 0,
                max: 100,
                default: 0
            },

            bestPractices: {
                type: Number,
                min: 0,
                max: 100,
                default: 0
            }
        },

        issueCounts: {
            high: {
                type: Number,
                default: 0
            },

            medium: {
                type: Number,
                default: 0
            },

            low: {
                type: Number,
                default: 0
            }
        },

        
        comment: {
            type: String,
            default: ''
        },

        isDemo: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

reviewSchema.index({
    repo: 1,
    prNumber: 1
});

reviewSchema.index({
    createdAt: -1
});

module.exports = mongoose.model('Review', reviewSchema);