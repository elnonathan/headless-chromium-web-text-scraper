const { chromium } = require('playwright');
const path = require('path');

(async () => {
    let browser = null;

    try {

        browser = await chromium.launch({
            headless: true,
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--disable-blink-features=AutomationControlled',
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-software-rasterizer',
                '--mute-audio',
                '--disable-background-networking',
                '--disable-background-timer-throttling',
                '--disable-breakpad',
                '--disable-client-side-phishing-detection',
                '--disable-default-apps',
                '--disable-hang-monitor',
                '--disable-prompt-on-repost',
                '--disable-sync',
                '--disable-translate',
                '--metrics-recording-only',
                '--no-first-run',
                '--safebrowsing-disable-auto-update',
                '--disable-features=IsolateOrigins,site-per-process'
            ]
        })

        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(process.argv[2], { waitUntil: 'domcontentloaded', timeout: 30000 });
        const html = await page.evaluate("document.documentElement.innerHTML");
        console.log(html)

    } catch (error) {
        console.log("Lo sentimos, no fue posible extraer el contenido de la página web. Esto puede deberse a restricciones en el sitio o a problemas de conexión. Por favor, intenta copiar y pegar el contenido manualmente desde el sitio web para analizarlo.");
    } finally {
        if(browser) browser.close();
    }
})();