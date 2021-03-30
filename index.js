"use strict";

const fs = require("fs");
const path = require("path");
let ffmpeg, logPath;

// Get current test title and clean it, to use it as file name
function fileName(title) {
  return encodeURIComponent(title.trim().replace(/\s+/g, "-"));
}

// Build file path
function filePath(test, logPath, extension, testType) {

  // Mocha test type
  if (testType === 'wdio') {
    return path.join(
      logPath,
      `${fileName(test.parent)}-${fileName(test.title)}.${extension}`
    );
  }

  // WDIO test type 
  else if (testType === 'mocha') {
    return path.join(
      logPath,
      `${fileName(test.parent.title)}-${fileName(test.title)}.${extension}`
    );
  }
  
  // Else, throw error
  else {
    throw new Error("Invalid test type. Use 'wdio' or 'mocha'.")
  }
}

// Set video path
exports.setPath = (path) => {
  logPath = path;
};

// Start video recording
exports.start = (test, testType) => {
  // Throw error if video path not set
  if (!logPath) {
    throw new Error("Video path not set. Set using setPath() function.");
  }

  if (!testType) {
    throw new Error("Test type required. Use 'wdio' or 'mocha'.");
  }

  if (process.env.DISPLAY && process.env.DISPLAY.startsWith(":")) {
    const videoPath = filePath(test, logPath, "mp4", testType);
    const { spawn } = require("child_process");
    ffmpeg = spawn("ffmpeg", [
      "-f",
      "x11grab", //  Grab the X11 display
      "-video_size",
      "1280x1024", // Video size
      "-i",
      process.env.DISPLAY, // Input file url
      "-loglevel",
      "error", // Log only errors
      "-y", // Overwrite output files without asking
      "-pix_fmt",
      "yuv420p", // QuickTime Player support, "Use -pix_fmt yuv420p for compatibility with outdated media players"
      videoPath, // Output file
    ]);

    const logBuffer = function (buffer, prefix) {
      const lines = buffer.toString().trim().split("\n");
      lines.forEach(function (line) {
        console.log(prefix + line);
      });
    };

    ffmpeg.stdout.on("data", (data) => {
      logBuffer(data, "ffmpeg stdout: ");
    });

    ffmpeg.stderr.on("data", (data) => {
      logBuffer(data, "ffmpeg stderr: ");
    });

    ffmpeg.on("close", (code, signal) => {
      console.log("\n\tVideo location:", videoPath, "\n");
      if (code !== null) {
        console.log(`\tffmpeg exited with code ${code} ${videoPath}`);
      }
      if (signal !== null) {
        console.log(`\tffmpeg received signal ${signal} ${videoPath}`);
      }
    });
  }
};

// Stop video recording
exports.stop = () => {
  if (ffmpeg) {
    ffmpeg.kill("SIGINT");
  }
};
