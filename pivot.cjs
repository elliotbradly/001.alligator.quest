const path = require('path');
var exec = require('child_process').exec;

exec('tsc -b 900.fictiq', async (err, stdout, stderr) => {
    if (err) {
        console.error(`exec error: ${err}`);
    }
    init();
})

const init = async (prt) => {

    PIVOT = require(path.resolve('./999.pivot/index'));
    PIVOT_ACTION = require(path.resolve('./999.pivot/00.pivot.unit/pivot.action'));
    await PIVOT.hunt(PIVOT_ACTION.INIT_PIVOT, { val: 1, dat: null, src: null });
    //await SHADE.hunt( SHADE_ACTION.INIT_SHADE , { val: 1, dat: MQTT, src:  [localBit]  });
};

