export const config = {
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
  specs: [
    "../../../tests/specs/audio_mocking_test.js",
    "../../../tests/specs/video_mocking_test.js"
  ],
  exclude: [
    "../../../tests/specs/audio_mocking_real_device_test.js"
  ],

  capabilities: [{
    browserName: 'Safari',
    browserVersion: 'latest',
    platformName: 'macOS Sonoma',

    'webkit:WebRTC': {
      DisableInsecureMediaCapture: false
    },

    'LT:Options': {
      build: "[Safari] SigFig: WebDriveIO Video + Mic Mocking Demo",
      network: true,
      w3c: true,
      // Safari-specific options
      video: true,
      visual: true,
      console: true
    }
  }],
  logLevel: "info",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  waitforTimeout: 100000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 1,
  path: "/wd/hub",
  hostname: "hub.lambdatest.com",
  port: 80,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 50000,
  },
  
  // Hook to maximize Safari window after session starts
  before: async function() {
    await browser.maximizeWindow();
  }
};
