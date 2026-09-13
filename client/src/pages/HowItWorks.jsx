import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const faqs = [
  {
    q: 'How do I create a campaign?',
    a: 'Simply sign up as a campaign creator, click "Start a Campaign," fill in your story and goal, upload a cover image, and submit. Your campaign will be reviewed and published within 24 hours.',
  },
  {
    q: 'Is there a fee for using NexusFund?',
    a: 'NexusFund is free to use. We only charge a small transaction fee (Stripe processing fee) on each donation to cover payment processing costs.',
  },
  {
    q: 'How do I receive the funds raised?',
    a: 'Funds are transferred directly to your connected bank account through Stripe. You can request withdrawals from your dashboard once your campaign receives donations.',
  },
  {
    q: 'Can I donate anonymously?',
    a: 'Yes! When making a donation, simply check the "Donate anonymously" option. Your name will not be shown publicly on the campaign page.',
  },
  {
    q: 'What types of campaigns are allowed?',
    a: 'We support Medical, Emergency, Education, Community, Memorial, and other campaigns. All campaigns are reviewed to ensure they meet our community guidelines.',
  },
  {
    q: 'Is my payment information secure?',
    a: 'Absolutely. All payments are processed through Stripe, a PCI-compliant payment processor. We never store your card details on our servers.',
  },
];

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="page-content">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Header */}
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <h1>How NexusFund Works</h1>
            <p className="text-secondary text-lg" style={{ marginTop: 'var(--space-3)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Raising money has never been easier. Start a campaign in minutes and get support from people who care.
            </p>
          </div>

          {/* Steps */}
          <div className="steps-grid" style={{ marginBottom: 'var(--space-16)' }}>
            {[
              {
                num: '1',
                title: 'Create Your Campaign',
                desc: 'Sign up, write your story, upload photos, set your goal and deadline. It takes less than 5 minutes to get started.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                ),
              },
              {
                num: '2',
                title: 'Share Your Story',
                desc: 'Share your campaign link on social media, messaging apps, email — wherever your supporters are. The more you share, the more you raise.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                ),
              },
              {
                num: '3',
                title: 'Receive Donations',
                desc: 'Supporters donate securely via Stripe. Watch your progress in real-time and withdraw funds to your bank account.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                ),
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                className="step-card card-flat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="step-number">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Trust Section */}
          <div className="card-flat text-center" style={{ padding: 'var(--space-12) var(--space-8)', marginBottom: 'var(--space-16)' }}>
            <h2 style={{ marginBottom: 'var(--space-4)' }}>Trust & Safety</h2>
            <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto var(--space-8)' }}>
              We take trust seriously. Every campaign is reviewed by our team before going live.
            </p>
            <div className="grid grid-3">
              {[
                { title: 'Verified Campaigns', desc: 'Every campaign is reviewed before publishing.' },
                { title: 'Secure Payments', desc: 'Powered by Stripe with PCI compliance.' },
                { title: 'Donor Protection', desc: 'Your payment information is never stored.' },
              ].map((item) => (
                <div key={item.title} style={{ padding: 'var(--space-4)' }}>
                  <h4 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>{item.title}</h4>
                  <p className="text-sm text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ maxWidth: '720px', margin: '0 auto', marginBottom: 'var(--space-16)' }}>
            <h2 className="text-center" style={{ marginBottom: 'var(--space-8)' }}>Frequently Asked Questions</h2>
            <div>
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item">
                  <button
                    className={`faq-question ${openFaq === i ? 'faq-question-open' : ''}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <motion.div
                      className="faq-answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="cta-banner" style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Ready to Start?</h2>
            <p>Create your campaign today and let the world rally behind your cause.</p>
            <Link to="/create" className="btn btn-lg" style={{ backgroundColor: '#fff', color: 'var(--color-primary)', fontWeight: 'var(--font-bold)' }}>
              Start Your Campaign
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
