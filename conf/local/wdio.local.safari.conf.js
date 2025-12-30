import CameraService from 'wdio-camera-service';
import path from 'path';

let capabilities;
let services;

capabilities = [
  {
    browserName: 'safari',
    'webkit:WebRTC': {
      DisableInsecureMediaCapture: false
    }
  }
];

services = [
  [
    CameraService,
    {
      microphone: {
        audio: './media/harvard.wav'
      },
      defaultCameraFeed: './media/garden_sif.y4m',
      videoDirectory: './.camera/video',
    },
  ]
];

export const config = {
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
  connectionRetryCount: 3,
  
  // Hook to maximize Safari window after session starts
  before: async function() {
    await browser.maximizeWindow();
  }
};
