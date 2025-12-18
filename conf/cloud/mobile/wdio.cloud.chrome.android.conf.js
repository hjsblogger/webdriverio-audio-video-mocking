import fs from 'fs';
import path from 'path';

export const config = {

  before: async function ()
  {
    const localFilePath = `${path.resolve('./media/harvard.wav')}`
        const destPath = '/storage/emulated/0/Download/harvard.wav'
        const fileData = fs.readFileSync(localFilePath, { encoding: 'base64' })

        /* @hjsblogger - The file needs to be pushed before the browser is instantiated */
        await browser.pushFile(destPath, fileData);
  },

  services: [
    [
      "lambdatest",
      {
        tunnel: false,
        lambdatestOpts: {
          logFile: "tunnel.log"
        }
      }
    ]
  ],
  user: process.env.LT_USERNAME || 'LT_USERNAME',
  key: process.env.LT_ACCESS_KEY || 'LT_ACCESS_KEY',
  buildName: process.env.LT_BUILD_NAME,
  specs: ["../../../tests/specs/audio_mocking_real_device_test.js"],
  exclude: [],

  capabilities: [{
        'LT:Options':
        {
            build: "[Chrome - Android] SigFig: WebDriveIO Video + Mic Mocking Demo",
            network: false,
            w3c: true,
            /* @hjsblogger - Verified if the push operation is successful on the private device */
            /*
            platformName: "android",
            platformVersion: "13",
            deviceName: "Pixel 6",
            privateCloud: true,
            */
            platformName: "android",
            deviceName: "Galaxy.*",
            platformVersion: "16",
            uploadMedia: [
              'lt://MEDIAb21270510f494f6cbcf97e9cd19d53e0'
            ],
            isRealMobile: true,
            "automationName": "UiAutomator2",
            "autoGrantPermissions": true,
            chromeOptions: {
              args: [
                '--use-fake-ui-for-media-stream',
                '--use-fake-device-for-media-stream',
                '--allow-file-access-from-files',
                '--allow-file-access',
                '--use-file-for-fake-audio-capture=/storage/emulated/0/Download/harvard.wav',
              ]
            },
        }
    }],
    logLevel: "info",
    coloredLogs: true,
    screenshotPath: "./errorShots/",
    waitforTimeout: 100000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 1,
    path: "/wd/hub",
    hostname: "mobile-hub.lambdatest.com",
    port: 80,
    framework: "mocha",
    mochaOpts: {
      ui: "bdd",
      timeout: 50000,
    }
};