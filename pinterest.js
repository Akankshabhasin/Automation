// Automation Project on Pinterest for maintaining a healthy body
let puppeteer = require("puppeteer");
let credFile = process.argv[2];
let fs = require("fs");

(async function () {
  try {
    let data = await fs.promises.readFile(credFile);
    let {
      url,
      user,
      pwd,
      nPost,
      searchInput,
      searchInput2
    } = JSON.parse(data);

    //for chrome
    //   const browser = await puppeteer.launch({
    //     executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    //     headless: false,
    //     defaultViewport:null,
    //     args: ["--start-maximized", "--disable-notifications",]
    // });
    //launch puppeteer
    let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized", "--disable-notifications"]
    });
    let pages = await browser.pages();
    let page = pages[0];
    await page.goto(url, {
      waitUntil: "load",
      timeout: 0
    });
    await page.waitForSelector("#email");
    await page.type("#email", user, {
      delay: 150
    });
    await page.type("#password", pwd, {
      delay: 150
    });
    await Promise.all([page.click(".red.SignupButton.active"), page.waitForNavigation({
      waitUntil: "load"
    })]);
    // await page.waitForNavigation({waitUntil:"load"});

    await page.waitForSelector('input[name="searchBoxInput"]');
    await page.type('input[name="searchBoxInput"]', searchInput, {
      delay: 150
    });
    await page.keyboard.press('Enter');
    let idx = 0;
    do {
      await page.waitForSelector(".vbI.XiG");
      console.log("Inside the loop");

      await page.evaluate(() => {
        window.scrollBy(0, 1000);
      });

      function delay(time) {
        return new Promise(function (resolve) {
          setTimeout(resolve, time)
        });
      }
      await delay(4000);
      let elements = await page.$$(".Yl-.MIw.Hb7");
      console.log("Elements are: " + elements);
      let pic = elements[idx];
      await Promise.all([pic.click({
        delay: 150
      }), page.waitForNavigation({
        waitUntil: "load"
      })]);

      await page.waitForSelector(".PinBetterSave__Button.PinBetterSave__Button--lego");
      await page.click(".PinBetterSave__Button.PinBetterSave__Button--lego");
      console.log(idx + 1 + "post(s) saved");
      idx++;
      // PinBetterSave__Button PinBetterSave__Button--lego
      // SaveButton SaveButton--enabled
    } while (idx < nPost)
    console.log("Posts Saved!!");


    //-------------------------
    await page.waitForSelector('input[name="searchBoxInput"]');
    await page.type('input[name="searchBoxInput"]', searchInput2, {
      delay: 150
    });
    await page.keyboard.press('Enter');
    let idxx = 0;
    do {
      await page.waitForSelector(".vbI.XiG");
      console.log("Inside the loop");

      await page.evaluate(() => {
        window.scrollBy(0, 1000);
      });

      function delay(time) {
        return new Promise(function (resolve) {
          setTimeout(resolve, time)
        });
      }
      await delay(4000);
      let elements = await page.$$(".Yl-.MIw.Hb7");
      console.log("Elements are: " + elements);
      let pic = elements[idxx];
      await Promise.all([pic.click({
        delay: 150
      }), page.waitForNavigation({
        waitUntil: "load"
      })]);

      await page.waitForSelector(".PinBetterSave__Button.PinBetterSave__Button--lego");
      await page.click(".PinBetterSave__Button.PinBetterSave__Button--lego");
      console.log(idxx + 1 + "post(s) saved");
      idxx++;
      // PinBetterSave__Button PinBetterSave__Button--lego
      // SaveButton SaveButton--enabled
    } while (idxx < nPost)
    console.log("Posts Saved!!");
    //----------------------------

    // await browser.close();
  } catch (err) {
    console.log("Error is: " + err);
  }
})
()