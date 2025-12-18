import assert from 'assert'

describe('SigFig: Video Test', function() {
  it('SigFig: Video Mocking Test', async function () {
    await browser.url('https://webcamtests.com/')
    const micBtn = $('#webcam-launcher');
    await micBtn.waitForExist({ timeout: browser.options.waitforTimeout });
    await browser.pause(10000);
    console.log("webcam-launcher removed. Proceeding...");
    await micBtn.click();
    await browser.pause(20000);
  });
});


/* Veed.io */
/* @hjsblogger - Video Mocking Test on LambdaTest */
/*
describe('Fake Video Test on LambdaTest', () => {
    let status = 'failed';

    it('should run webcam test with fake video', async () => {
        console.log('Loading URL');

        await browser.url('https://www.veed.io/tools/webcam-test');

        const startButton = await $('//*[@id="webcam-test-app"]/div[1]/div[1]/div[1]/button');
        await startButton.waitForClickable({ timeout: 30000 });
        await startButton.click();

        // Keep session alive for observation
        await browser.pause(200000);

        status = 'passed';
        console.log('Test Finished');
    });
});
*/