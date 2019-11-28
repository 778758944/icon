#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const getIcon = require("../src/resource/getIcon");
const config = require("../package.json");
try {
    let dest = "icon.json";
    const argv = process.argv;
    switch(argv[2]) {
        case "-v":
            console.log(config.version);
            process.exit(0);
        break;

        case "-h":
            console.log(`-o: specific the path to store the icon resource(.json file)`);
            process.exit(1);
        break;

        case "-o":
            dest = argv[3]
        break;
    }
    const configPath = path.resolve(process.env.PWD, "icon.config.json");
    const iconPath = path.resolve(process.env.PWD, dest);
    const fp = fs.openSync(iconPath, "w");
    const content = getIcon(configPath);
    fs.appendFileSync(fp, JSON.stringify(content), "utf8");
    fs.closeSync(fp);
    
} catch(e) {
    console.error(e);
}
