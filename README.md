# test-video-recorder

Headless video recording for [WebdriverIO](https://webdriver.io/) and [Mocha](https://mochajs.org/) using [FFmpeg](https://ffmpeg.org/).

## Installation

1. Use npm to install test-video-recorder.

```bash
npm install test-video-recorder
```

2. [FFmpeg](https://ffmpeg.org/) is a dependency for this package. Visit their [website](https://ffmpeg.org/) to download and install the package.

## Setup

After installing test-video-recorder and FFmpeg, import the package in your mocha test file or Webdriver IO config file.

```JS
const video = require('test-video-recorder');
```

Create the folder to save your video logs and set the path using the [Node path module](https://nodejs.org/api/path.html) and the setPath function. The path below will save the videos to a log folder within the current test directory.

```JS
const path = require("path");
video.setPath(path.join(__dirname, "/log"));
```

## Choose Test Type: WebdriverIO or Mocha
Follow the instructions below for your desired test type.

## WebdriverIO
In your wdio config file, start the video recording using the beforeTest hook and stop the recording using the afterTest hook as seen below. The video start function requires the wdio test object from the hook function as well as a test type parameter, which in this case is 'wdio'.

```JS
exports.config = {
	// Start video before each test
	beforeTest: function ( test ) {
		video.start(test, 'wdio');
	},

	// Stop video recording after each test
	afterTest: function ( test ) {
		video.stop();
  }
}
```
## Mocha
You can add video recording to Mocha test files directly using the beforeEach and afterEach hook within your describe block. The video start function requires the mocha currentTest object from the hook function as well as a test type parameter, which in this case is 'mocha'.

```JS
describe('Test group', function() {
  // Start video before each test in this block
  beforeEach(function() {
    video.start(this.currentTest, 'mocha');
  });
}

```

Stop the video recording after each test:

```JS
describe('Test group', function() {
  // ...

  // Stop each video after test completes
  afterEach(function() {
    video.stop();
  });
}
```

## License

Distributed under GNU General Public License v3.0. See `LICENSE` for more information.

## Author
**Shy Blumer** (they/them), Full-Stack Software Engineer and Data Analyst 🏳️‍🌈🏳️‍⚧️  
- [GitHub](https://github.com/shyblumer)
- [LinkedIn](https://www.linkedin.com/in/shyblumer/)
- [Résumé](https://www.imshy.net/resume)
