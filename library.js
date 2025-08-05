require('dotenv').config();
const { spawn } = require('child_process');
const path = require('path');

function launchBatchFile(userInputPath) {
    const sanitizedPath = path.normalize(userInputPath); // Sanitize the path

    batch = spawn('cmd', ['/c', sanitizedPath]);

    batch.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    batch.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    batch.on('close', (code) => {
        console.log(`child process exited with code ${code}`);

        //FS.emptyDir( dest, ()=>{
        //  FS.copySync('./dist/win-unpacked/' , dest )
        //})

        console.log("application complete ")

    });


    console.log('Batch file launched!');
}




launchBatchFile(process.env.LIBRARY_BAT);