describe('SigFig: Mic Test', function()
{
  it('SigFig: Audio Mocking Test', async function ()
  {

    await browser.url('https://mictests.com/check')
    const micBtn = $('#mic-launcher');
    await browser.pause(10000);
    console.log("mic-launcher removed. Proceeding...");
    await browser.pause(2000);
    await micBtn.click();
    await browser.pause(5000);
    /* Keep session alive for observation */
    await browser.pause(10000);
  });
});