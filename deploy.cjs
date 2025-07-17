const { exec } = require("child_process");

const FS = require("fs-extra");



exec("npm run build", async (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
    }

    console.log("stdout: " + stdout )

    
    console.log("complete "  )

    var source = './dist'
    var output = '../glops.ink'

    FS.cpSync( source, output, {recursive: true});

    console.log("file swap "  )
    //now copy everything over


   // lst = [];

   // bit = await ste.bus(ActPvt.BUNDLE_PIVOT, { src: "002.space" });
   // lst.push(bit);

    //bit = await ste.bus(ActDsk.READ_DISK, { src: "./work/002.space.js" });
    //var blend = bit.dskBit.dat;

    //var replace = '_globals = (function(){ return this || (0,eval)("this"); }());'
    //blend = S(blend).replaceAll(replace, '').s

    //bit = await ste.bus(ActDsk.WRITE_DISK, { src: "./cloud/002.space.js", dat: blend });
    //lst.push(bit);

   // setTimeout(async () => {

   //   bit = await ste.hunt(ActCns.UPDATE_CONSOLE, { idx: "cns00", src: "--- space bundled" });

  //    if (bal.slv != null) bal.slv({ spcBit: { idx: "update-space" } });
  //  }, 3);
  });
