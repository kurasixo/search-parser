const puppeteer = require('puppeteer');

const initBrowser = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--ash-host-window-bounds=2000',
      '--window-size=2000,2000',
    ],
  });

  const [page] = await browser.pages();
  await page.setViewport({ width: 2000, height: 2000 });
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  return { page, browser };
}

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const navigate = async (page, selectorGroup, imageCount) => {
  await page.evaluate(async ([selectorGroup, imageCount]) => {
    const delay = (ms) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };

    const emptyArr = [0];

    for await (let i of emptyArr) {
      if (document.querySelectorAll(selectorGroup.elementSelector).length < imageCount) {
        const moreButton = document.querySelector(selectorGroup.moreButton);
        if (moreButton) {
          await moreButton.click();
        }

        window.scrollBy(0, window.innerHeight);

        await delay(2000);
        emptyArr.push(0);
      } else {
        return;
      }
    }
  }, [selectorGroup, imageCount]);
};

module.exports = { navigate, delay, initBrowser };
