'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendAuditReportResponse {
  success: boolean;
  error?: string;
}

type AuditScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

type Category = {
  key: keyof AuditScores;
  label: string;
  score: number;
  tier: 'red' | 'yellow' | 'green';
};

export async function sendAuditReport(data: {
  email: string;
  url: string;
  scores: AuditScores;
}): Promise<SendAuditReportResponse> {

  if (!process.env.RESEND_API_KEY) {
    return { success: false, error: "Server configuration error." };
  }

  const { email, url, scores } = data;

  // --- Helpers ---

  function getTier(score: number): 'red' | 'yellow' | 'green' {
    if (score >= 90) return 'green';
    if (score >= 50) return 'yellow';
    return 'red';
  }

  function scoreColor(score: number): string {
    if (score >= 90) return "#34d399";
    if (score >= 50) return "#fbbf24";
    return "#f87171";
  }

  function scoreBg(score: number): string {
    if (score >= 90) return "#064e3b";
    if (score >= 50) return "#78350f";
    return "#7f1d1d";
  }

  // --- Build sorted category list (worst first) ---

  const categories: Category[] = ([
    { key: 'performance' as const, label: 'Performance', score: scores.performance, tier: getTier(scores.performance) },
    { key: 'accessibility' as const, label: 'Accessibility', score: scores.accessibility, tier: getTier(scores.accessibility) },
    { key: 'bestPractices' as const, label: 'Best Practices', score: scores.bestPractices, tier: getTier(scores.bestPractices) },
    { key: 'seo' as const, label: 'SEO', score: scores.seo, tier: getTier(scores.seo) },
  ]).sort((a, b) => a.score - b.score);

  const hasRed = categories.some(c => c.tier === 'red');
  const hasYellow = categories.some(c => c.tier === 'yellow');
  const worstScore = categories[0].score;
  const worstLabel = categories[0].label;

  // --- Opening verdict ---

  let subjectLine: string;
  let verdictHeading: string;
  let verdictBody: string;

  if (hasRed) {
    subjectLine = `Your website is losing you customers — here's the breakdown`;
    verdictHeading = "Your website has critical issues that are costing you customers.";
    verdictBody = "We ran a full audit on your site. The results show serious issues that are likely costing you leads and revenue right now. This report breaks down what we found, what it means for your business, and what it would take to fix it.";
  } else if (hasYellow) {
    subjectLine = `Your website audit results — room to improve`;
    verdictHeading = "Your website is functional but leaving opportunity on the table.";
    verdictBody = "We ran a full audit on your site. It works, but there are gaps your competitors may already be exploiting. This report breaks down where you stand and where targeted improvements would have the most impact.";
  } else {
    subjectLine = `Your website audit results — looking strong`;
    verdictHeading = "Your website is in solid shape.";
    verdictBody = "We ran a full audit on your site. You are ahead of most small business websites. This report covers where you stand and where there is still room to sharpen your edge.";
  }

  // --- Per-category copy (severity-weighted) ---

  function getCategoryBlock(cat: Category): string {
    const color = scoreColor(cat.score);
    let heading: string;
    let body: string;

    if (cat.key === 'performance') {
      if (cat.tier === 'red') {
        heading = "Your site is slow — and it's driving people away.";
        body = `Your site scored ${cat.score} out of 100 on performance. To put that in perspective, Google's research shows that 53% of mobile visitors leave a site that takes longer than 3 seconds to load. At this score, your site is taking far longer than that.<br><br>Think about what that means in practice. Someone searches for what you do, clicks your link, waits... and leaves. They never see your homepage, your services, your phone number. They go back to Google and click the next result — your competitor. This happens every single day your site stays at this speed.`;
      } else if (cat.tier === 'yellow') {
        heading = "Your site loads, but not fast enough to win.";
        body = `Your site scored ${cat.score} out of 100 on performance. Page speed is a direct ranking factor in Google search. Sites in this range typically lose 10–20% of potential visitors to impatience. Your competitors with faster sites are capturing those visitors instead.`;
      } else {
        heading = "Your site loads fast.";
        body = `Performance score of ${cat.score} out of 100. This is a real competitive advantage — most small business websites score well below this. Your visitors get a smooth experience and Google rewards you for it.`;
      }
    } else if (cat.key === 'seo') {
      if (cat.tier === 'red') {
        heading = "Google can't find you.";
        body = `Your SEO score is ${cat.score} out of 100. This means search engines are struggling to read and index your site properly. Missing metadata, incomplete page structure, or crawl issues are keeping you out of the search results where your customers are looking.<br><br>This is the most expensive problem on this list because it's invisible. You don't see the customers you're not getting. But your competitors with proper SEO foundations are showing up where you're not — and they're getting the calls.`;
      } else if (cat.tier === 'yellow') {
        heading = "Your SEO foundations have gaps.";
        body = `Your SEO score is ${cat.score} out of 100. You are likely missing rankings you could capture with proper metadata, structured data, and content optimization. Every keyword you are not ranking for is traffic going to a competitor instead.`;
      } else {
        heading = "Your SEO foundations are solid.";
        body = `SEO score of ${cat.score} out of 100. Search engines can read and index your site effectively, which means you are eligible to compete for the search terms that matter to your business.`;
      }
    } else if (cat.key === 'accessibility') {
      if (cat.tier === 'red') {
        heading = "Some of your visitors can't use your site.";
        body = `Your accessibility score is ${cat.score} out of 100. That means there are serious barriers — poor contrast, missing labels, broken navigation — that prevent a portion of your potential customers from using your website at all. Beyond the lost revenue, accessibility issues create legal exposure under ADA compliance standards. Businesses in every industry have faced lawsuits over inaccessible websites.`;
      } else if (cat.tier === 'yellow') {
        heading = "Your site has accessibility gaps.";
        body = `Your accessibility score is ${cat.score} out of 100. Poor contrast, missing labels, and navigation issues make your site harder to use — not just for people with disabilities, but for anyone on a phone in bright sunlight or anyone with aging eyesight. These are your customers, and some of them are giving up.`;
      } else {
        heading = "Your site is accessible.";
        body = `Accessibility score of ${cat.score} out of 100. More people can use your site without barriers, and you are in a strong position if accessibility compliance becomes a concern in your industry.`;
      }
    } else {
      // bestPractices
      if (cat.tier === 'red') {
        heading = "Your site has technical issues browsers are flagging.";
        body = `Your best practices score is ${cat.score} out of 100. This means your site has security or code quality problems that browsers actively flag. This can trigger visible warnings that tell visitors your site is not safe — and most people leave immediately when they see that. These issues also signal to Google that your site may not be trustworthy.`;
      } else if (cat.tier === 'yellow') {
        heading = "A few technical issues under the hood.";
        body = `Your best practices score is ${cat.score} out of 100. While visitors may not see these issues directly, they affect how browsers and search engines evaluate your site. Cleaning these up strengthens trust signals and ensures compatibility across devices.`;
      } else {
        heading = "The technical foundation is solid.";
        body = `Best practices score of ${cat.score} out of 100. No security warnings, no browser flags. Nothing is working against you behind the scenes.`;
      }
    }

    // Red scores get full-width blocks. Yellow gets moderate. Green gets compact.
    if (cat.tier === 'green') {
      return `
        <div style="padding: 12px 16px; border-left: 3px solid ${color}; margin-bottom: 12px;">
          <p style="font-size: 13px; margin: 0;"><strong>${heading}</strong> <span style="color: #94a3b8;">${body}</span></p>
        </div>`;
    }

    return `
      <div style="padding: 16px 20px; border-left: 3px solid ${color}; margin-bottom: 20px;">
        <p style="font-size: 15px; font-weight: 700; margin: 0 0 8px 0;">${heading}</p>
        <p style="font-size: 13px; color: #94a3b8; margin: 0; line-height: 1.7;">${body}</p>
      </div>`;
  }

  // --- Stakes section ---

  let stakesText: string;
  if (hasRed) {
    stakesText = "When performance, SEO, and accessibility issues stack up, the effect compounds. A slow site that Google can't read properly and that some visitors can't use is fighting against you on every front. The businesses winning in your market have sites that load fast, rank on the first page, and convert visitors into calls and inquiries.";
  } else if (hasYellow) {
    stakesText = "The gaps in your scores represent real opportunities — faster load times, better search visibility, and a smoother experience for every visitor. Closing these gaps is often the difference between a site that exists and a site that generates leads.";
  } else {
    stakesText = "You are ahead of most small business websites. At this point, the gains come from refinement — tighter performance, sharper conversion paths, and a design that reflects the quality of your business.";
  }

  // --- Build category blocks in severity order ---

  const categoryBlocks = categories.map(getCategoryBlock).join('');

  // --- Comparison line referencing their worst score ---

  const comparisonLine = worstScore < 90
    ? `Your site scored ${worstScore} on ${worstLabel.toLowerCase()}. The sites we build score 95+. That's not a marginal difference — it's the difference between a site that loses visitors and one that converts them.`
    : "Your scores are already strong. The difference between a good site and a great one often comes down to design, speed refinements, and conversion optimization — areas where a custom build gives you full control.";

  // --- Assemble the HTML ---

  const reportHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #020617; color: #f1f5f9;">

      <!-- Header -->
      <div style="padding: 40px 24px 24px 24px;">
        <p style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin: 0 0 16px 0;">Website Audit Report</p>
        <h1 style="font-size: 20px; font-weight: 800; margin: 0 0 12px 0; line-height: 1.4;">${verdictHeading}</h1>
        <p style="font-size: 14px; color: #94a3b8; margin: 0; line-height: 1.6;">${verdictBody}</p>
        <p style="font-size: 12px; color: #64748b; margin: 16px 0 0 0;">Tested: ${url}</p>
      </div>

      <!-- Score Cards (2x2 grid — mobile safe) -->
      <div style="padding: 0 24px 24px 24px;">
        <table style="width: 100%; border-collapse: separate; border-spacing: 8px;">
          <tr>
            <td style="text-align: center; padding: 16px 8px; background-color: ${scoreBg(scores.performance)}; border-radius: 12px; width: 50%;">
              <div style="font-size: 32px; font-weight: 800; color: ${scoreColor(scores.performance)};">${scores.performance}</div>
              <div style="font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-top: 4px;">Performance</div>
            </td>
            <td style="text-align: center; padding: 16px 8px; background-color: ${scoreBg(scores.accessibility)}; border-radius: 12px; width: 50%;">
              <div style="font-size: 32px; font-weight: 800; color: ${scoreColor(scores.accessibility)};">${scores.accessibility}</div>
              <div style="font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-top: 4px;">Accessibility</div>
            </td>
          </tr>
          <tr>
            <td style="text-align: center; padding: 16px 8px; background-color: ${scoreBg(scores.bestPractices)}; border-radius: 12px; width: 50%;">
              <div style="font-size: 32px; font-weight: 800; color: ${scoreColor(scores.bestPractices)};">${scores.bestPractices}</div>
              <div style="font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-top: 4px;">Best Practices</div>
            </td>
            <td style="text-align: center; padding: 16px 8px; background-color: ${scoreBg(scores.seo)}; border-radius: 12px; width: 50%;">
              <div style="font-size: 32px; font-weight: 800; color: ${scoreColor(scores.seo)};">${scores.seo}</div>
              <div style="font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-top: 4px;">SEO</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Category Breakdown (sorted worst first) -->
      <div style="padding: 0 24px 24px 24px;">
        <h2 style="font-size: 16px; font-weight: 700; margin: 0 0 20px 0;">What This Means for Your Business</h2>
        ${categoryBlocks}
      </div>

      <!-- The Bottom Line -->
      <div style="padding: 0 24px 24px 24px;">
        <div style="border-top: 1px solid #1f2937; padding-top: 20px;">
          <h2 style="font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">The Bottom Line</h2>
          <p style="font-size: 13px; color: #94a3b8; margin: 0; line-height: 1.7;">${stakesText}</p>
        </div>
      </div>

      <!-- What Good Looks Like -->
      <div style="padding: 0 24px 24px 24px;">
        <div style="background-color: #0f172a; border: 1px solid #1f2937; border-radius: 12px; padding: 20px;">
          <h2 style="font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">What a Properly Built Site Looks Like</h2>
          <p style="font-size: 13px; color: #94a3b8; margin: 0 0 16px 0; line-height: 1.6;">${comparisonLine}</p>
          <table style="width: 100%; border-collapse: separate; border-spacing: 6px;">
            <tr>
              <td style="text-align: center; padding: 10px 4px; background-color: #064e3b; border-radius: 8px; width: 25%;">
                <div style="font-size: 20px; font-weight: 800; color: #34d399;">100</div>
                <div style="font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-top: 2px;">Perf</div>
              </td>
              <td style="text-align: center; padding: 10px 4px; background-color: #064e3b; border-radius: 8px; width: 25%;">
                <div style="font-size: 20px; font-weight: 800; color: #34d399;">100</div>
                <div style="font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-top: 2px;">A11y</div>
              </td>
              <td style="text-align: center; padding: 10px 4px; background-color: #064e3b; border-radius: 8px; width: 25%;">
                <div style="font-size: 20px; font-weight: 800; color: #34d399;">100</div>
                <div style="font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-top: 2px;">BP</div>
              </td>
              <td style="text-align: center; padding: 10px 4px; background-color: #064e3b; border-radius: 8px; width: 25%;">
                <div style="font-size: 20px; font-weight: 800; color: #34d399;">100</div>
                <div style="font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-top: 2px;">SEO</div>
              </td>
            </tr>
          </table>
          <p style="font-size: 10px; color: #64748b; margin: 10px 0 0 0; text-align: center;">FORGE Athletics — built by Brian Woodson Web Development</p>
        </div>
      </div>

      <!-- The Pitch -->
      <div style="padding: 0 24px 32px 24px;">
        <div style="text-align: center; padding: 28px 20px; border: 1px solid #1f2937; border-radius: 12px;">
          <h2 style="font-size: 18px; font-weight: 800; margin: 0 0 12px 0;">We can do this for your site.</h2>
          <p style="font-size: 13px; color: #94a3b8; margin: 0 0 20px 0; line-height: 1.6;">We build custom websites for small businesses that score 95+ on every Google audit. Design, copy, and SEO included. Every project is fixed-price and scoped around your business goals before work begins.</p>
          <a href="https://brianwoodson.dev/contact" style="display: inline-block; background-color: #f1f5f9; color: #020617; padding: 14px 28px; border-radius: 999px; font-size: 13px; font-weight: 700; text-decoration: none;">Let's talk about your site</a>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding: 0 24px 32px 24px; text-align: center;">
        <p style="font-size: 11px; color: #64748b; margin: 0;">Brian Woodson Web Development</p>
        <p style="font-size: 11px; color: #64748b; margin: 4px 0 0 0;">Custom-built websites that load fast, rank on Google, and drive leads.</p>
        <a href="https://brianwoodson.dev" style="font-size: 11px; color: #94a3b8; text-decoration: none;">brianwoodson.dev</a>
      </div>

    </div>
  `;

  try {
    // Send the report to the visitor
    const { error: reportError } = await resend.emails.send({
      from: 'Brian Woodson Web Development <no-reply@brianwoodson.dev>',
      to: [email],
      subject: subjectLine,
      html: reportHtml,
    });

    if (reportError) {
      return { success: false, error: reportError.message };
    }

    // Notify you of the new lead
    await resend.emails.send({
      from: 'Brian Woodson Web Development <audit-lead@brianwoodson.dev>',
      to: ['brian@brianwoodson.dev'],
      subject: `// AUDIT LEAD: ${email} — ${url}`,
      html: `
        <div style="font-family: monospace; background-color: #050505; color: #ffffff; padding: 20px; border: 1px solid #3b82f6;">
          <h2 style="color: #3b82f6;">// AUDIT LEAD</h2>
          <p><strong>EMAIL:</strong> ${email}</p>
          <p><strong>URL:</strong> ${url}</p>
          <p><strong>SCORES:</strong> Performance ${scores.performance} | Accessibility ${scores.accessibility} | Best Practices ${scores.bestPractices} | SEO ${scores.seo}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to send report.";
    return { success: false, error: errorMessage };
  }
}
