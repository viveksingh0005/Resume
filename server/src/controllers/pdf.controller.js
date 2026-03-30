// src/controllers/pdf.controller.js
const puppeteer = require('puppeteer');

exports.generateResumePDF = async (req, res) => {
  let browser;

  try {
    const { html, format = 'A4', filename = 'resume.pdf' } = req.body;

    if (!html || typeof html !== 'string' || html.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Valid HTML content is required'
      });
    }

    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',     // ← important on many cloud hosts
        '--font-render-hinting=medium', // helps with font consistency
      ],
      // timeout: 60000,                 // optional - increase if complex resumes
    });

    const page = await browser.newPage();

    // Very important: match your frontend preview size
    const widthPx = format.toLowerCase() === 'letter' ? 816 : 794;
    await page.setViewport({ width: widthPx, height: Math.round(widthPx * 1.414) });

    // Set content + wait for everything (fonts, images, etc.)
    await page.setContent(html, {
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 45000,
    });

    // Optional: wait a tiny bit more if fonts/icons are still loading
    await page.evaluate(() => document.fonts.ready);

    const pdfBuffer = await page.pdf({
      format: format.toLowerCase() === 'letter' ? 'Letter' : 'A4',
      printBackground: true,
      margin: { top: '0cm', right: '0cm', bottom: '0cm', left: '0cm' },
      preferCSSPageSize: true,
      scale: 1,                    // 1 = 100%
    });

    await browser.close();

    // Send as downloadable file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(filename)}"`
    );

    return res.send(pdfBuffer);
  } catch (err) {
    console.error('[PDF Generation Error]', err);

    if (browser) {
      try { await browser.close(); } catch (_) {}
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to generate PDF',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};