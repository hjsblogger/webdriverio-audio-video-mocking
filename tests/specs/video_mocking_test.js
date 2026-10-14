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

    // Chrome's built-in fake camera is 640x480; garden_sif.y4m is 352x240,
    // so the frame size tells us whether the file feed was actually used.
    const settings = await browser.executeAsync((done) => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          const track = stream.getVideoTracks()[0];
          const { width, height } = track.getSettings();
          const label = track.label;
          stream.getTracks().forEach((t) => t.stop());
          done({ width, height, label });
        })
        .catch((err) => done({ error: `${err.name}: ${err.message}` }));
    });
    console.log('Camera track settings:', JSON.stringify(settings));

    assert.ok(!settings.error, `getUserMedia failed - ${settings.error}`);
    assert.strictEqual(settings.width, 352, 'Fake video file not used (expected 352px width from garden_sif.y4m)');
    assert.strictEqual(settings.height, 240, 'Fake video file not used (expected 240px height from garden_sif.y4m)');
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