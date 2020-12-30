# test-video-recorder

Headless video recording using [FFmpeg](https://ffmpeg.org/) and Mocha. This package requires that FFmpeg is already installed.

## Installation

Use npm to install test-video-recorder.

```bash
npm install test-video-recorder
```

## Usage

After installing the package, import the package in your Mocha test.

```JS
const video = require('test-video-recorder');
```

Create the folder to save your video logs and set the path using the [Node path module](https://nodejs.org/api/path.html) and the setPath() function.

```JS
const path = require("path");
video.setPath(path.join(__dirname, "/log"));
```

Start video recorder before each mocha test:

```JS
describe('Test group', function() {
  beforeEach(function() {
    // runs before each test in this block
    video.start(this.currentTest);
  });
}

```

Stop the video recording after each test:

```JS
describe('Test group', function() {
    // ...

  afterEach(function() {
    // runs after each test in this block
    video.stop();
  });
}
```

## License

Distributed under GNU General Public License v3.0. See `LICENSE` for more information.

## Contact

Jared Blumer - jaredgblumer@gmail.com
