# test-video-recorder

Headless video recording using FFmpeg and Mocha.

## Installation

Use npm to install test-video-recorder.

```bash
npm install test-video-recorder
```

## Usage

After installing the package, import the package in your Mocha test.

```JS
const test-video-recorder = require('test-video-recorder');
```

Start video recorder before each mocha test:

```JS
describe('Test group', function() {
  beforeEach(function() {
    // runs before each test in this block
    test-video-recorder.start(this.currentTest);
  });
}

```

Stop the video recording after each test:

```JS
describe('Test group', function() {
    // ...

  afterEach(function() {
    // runs after each test in this block
    test-video-recorder.stop();
  });
}
```

## License

Distributed under GNU General Public License v3.0. See `LICENSE` for more information.

## Contact

Jared Blumer - jaredgblumer@gmail.com
