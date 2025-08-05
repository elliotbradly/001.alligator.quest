const os = require('os');
const { execSync } = require('child_process');

//var FS = require('fs-extra');
//console.log('prepare to copy');

//var sourceDir = '../100.fictiq/dist/100.fictiq';
//var destDir = './100.fictiq';

//FS.ensureDirSync('./100.fictiq');

//async function emptyDirectory(dirPath) {
//  try {
//    FS.emptyDirSync(dirPath); // fs-extra's emptyDir efficiently removes all files & subdirectories.
//    console.log(`Directory "${dirPath}" emptied successfully.`);
//  } catch (err) {
//    console.error(`Error emptying directory "${dirPath}":`, err);
//  }
//}

// Example usage:

//function copyDirectory(sourceDir, destinationDir) {
//  try {
//    FS.copySync(sourceDir, destinationDir); // fs-extra's copy recursively copies contents.
//    console.log(`Directory "${sourceDir}" copied to "${destinationDir}" successfully.`);
//  } catch (err) {
//    console.error(`Error copying directory:`, err);
//  }
//}

// Example usage:
//emptyDirectory(destDir);
//copyDirectory(sourceDir, destDir);

console.log('prepare to clear');

try {
  const platform = os.platform();
  let command;

  if (platform === 'win32') {
    command = 'taskkill /f /im node.exe';
  } else if (platform === 'darwin') {
    // macOS
    command = 'killall node';
  } else if (platform === 'linux') {
    command = 'killall node';
  } else {
    console.warn('Unsupported platform.  Cannot kill Node.js processes.');
    return;
  }

  execSync(command, { stdio: 'ignore' });
  console.log('Killed all Node.js processes.');
} catch (error) {
  console.error('Error killing Node.js processes:', error);
}
