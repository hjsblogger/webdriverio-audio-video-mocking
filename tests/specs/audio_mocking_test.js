import assert from 'assert'

/* Commented for cloud */
describe('SigFig: Mic Test', function()
{
  it('SigFig: Audio Mocking Test', async function ()
  {
    await browser.url('https://mictests.com/check')
    const micBtn = await $('#mic-launcher');
    await micBtn.waitForClickable({ timeout: browser.options.waitforTimeout });
    console.log("mic-launcher ready. Proceeding...");
    await micBtn.click();

    /* The button hides once the mic test starts; fall back to a JS click if an overlay ate the first one */
    const started = await micBtn.waitForDisplayed({ reverse: true, timeout: 10000 }).catch(() => false);
    if (!started) {
      console.log("mic-launcher still visible after click. Retrying with JS click...");
      await browser.execute((el) => el.click(), micBtn);
      await micBtn.waitForDisplayed({ reverse: true, timeout: 10000 });
    }
    assert.ok(!(await micBtn.isDisplayed()), 'Check my microphone button was not clicked');

    /* Keep session alive for observation */
    await browser.pause(15000);
  });
});
