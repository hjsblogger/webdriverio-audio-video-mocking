import CameraService from 'wdio-camera-service';
import path from 'path';

const browserArgsLocal = [
  '--no-sandbox',
  '--start-maximized',
  '--disable-infobars',
  '--allow-file-access-from-files',
  '--use-fake-ui-for-media-stream',
  `--use-file-for-fake-audio-capture=${path.resolve('./media/harvard.wav')}`,
  /* `--use-file-for-fake-video-capture=${path.resolve('./media/dhurandar.mjpeg')}`, */
  `--use-file-for-fake-video-capture=${path.resolve('./media/garden_sif.y4m')}`,
  '--use-fake-device-for-media-stream',
  '--enable-features=ClipboardReadWrite',
  '--disable-features=WebRtcHideLocalIpsWithMdns',
  '--autoplay-policy=no-user-gesture-required',
  '--disable-notifications',
  '--no-first-run',
  '--no-default-browser-check'
];

let capabilities;
let services;


capabilities = [
  {
    browserName: 'MicrosoftEdge',
    'ms:edgeOptions':
    {
      binary: '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
      args: [
        ...browserArgsLocal
      ],
    },
  }
];

services = [
  /* @hjsblogger - WDIO Camera Service for Local Execution,
  same job can be achieved with Chrome Options too */
  /*
  'edgedriver',
  [
    CameraService,
    {
      microphone: {
        audio: './media/harvard.wav'
      },
      defaultCameraFeed: './media/garden_sif.y4m',
      // defaultCameraFeed: './media/garden_sif.y4m',
      videoDirectory: './.camera/video',
    },
  ]
  */
];

export const config = {
  hostname: 'localhost',
  port: 9515,
  path: '/',

  automationProtocol: 'webdriver',
  specs: [
    "../../tests/specs/audio_mocking_test.js",
    "../../tests/specs/video_mocking_test.js"
  ],
  exclude: [
    "../../tests/specs/audio_mocking_real_device_test.js"
  ],
  maxInstances: 1,
  capabilities,
  services,
  logLevel: 'info',
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  waitforTimeout: 60000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3
};