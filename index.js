"use strict";

const fs = require("fs");
const path = require("path");
const logPath = process.env.LOG_DIR || path.join(__dirname, "/log");
let ffmpeg;

// get current test title and clean it, to use it as file name
function fileName(title) {
  return encodeURIComponent(title.replace(/\s+/g, "-"));
}

// build file path
function filePath(test, screenshotPath, extension) {
  return path.join(
    screenshotPath,
    `${fileName(test.parent)}-${fileName(test.title)}.${extension}`
  );
}

export function start(test) {
  if (process.env.DISPLAY && process.env.DISPLAY.startsWith(":")) {
    const videoPath = filePath(test, logPath, "mp4");
    const { spawn } = require("child_process");
    ffmpeg = spawn("ffmpeg", [
      "-f",
      "x11grab", //  grab the X11 display
      "-video_size",
      "1280x1024", // video size
      "-i",
      process.env.DISPLAY, // input file url
      "-loglevel",
      "error", // log only errors
      "-y", // overwrite output files without asking
      "-pix_fmt",
      "yuv420p", // QuickTime Player support, "Use -pix_fmt yuv420p for compatibility with outdated media players"
      videoPath, // output file
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
}

export function stop() {
  if (ffmpeg) {
    // stop video recording
    ffmpeg.kill("SIGINT");
  }
}
