const browserArgsCloud = [
    '--start-maximized',
    '--use-fake-ui-for-media-stream',
    '--use-fake-device-for-media-stream',
    /* @hjsblogger - Start: Added for Microsoft Edge */
    '--start-maximized',
    '--disable-notifications',
    '--disable-infobars',
    '--allow-file-access-from-files',
    '--use-fake-ui-for-media-stream',
    /* @hjsblogger - End: Added for Microsoft Edge */
    `--use-file-for-fake-audio-capture=C:\\Users\\ltuser\\Downloads\\harvard.wav`,
    '--use-file-for-fake-video-capture=C:\\Users\\ltuser\\Downloads\\garden_sif.y4m',
    '--use-fake-device-for-media-stream',
    '--enable-features=ClipboardReadWrite',
    '--disable-features=WebRtcHideLocalIpsWithMdns',
    '--autoplay-policy=no-user-gesture-required',
    '--disable-notifications',
    '--no-first-run',
    '--no-default-browser-check'
];

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
    "../../tests/specs/audio_mocking_real_device_test.js"
  ],

   capabilities: [{
        browserName: 'MicrosoftEdge',
        browserVersion: 'latest',
        platformName: 'Windows 11',

        'ms:edgeOptions': {
            args: [
                ...browserArgsCloud
            ],
            prefs: {
                'profile.default_content_setting_values.media_stream_camera': 1,
                'profile.default_content_setting_values.media_stream_mic': 1
            }
        },

        'LT:Options': {
            build: "[Edge] SigFig: WebDriveIO Video + Mic Mocking Demo",
            network: true,
            w3c: true,
            'lambda:userFiles': ['harvard.wav', 'garden_sif.y4m']
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
  }
};
