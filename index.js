const fs = require('fs'), minify = require('minify'), recursive = require('recursive-readdir-synchronous');

function recursiveMinify(entryPath, fileTypes = ["css", "js"]) {
    recursive(entryPath).forEach(file => {
        if (fileTypes.some(type => file.endsWith(`.${type}`))) {
            minifyFile(`${entryPath}/${file}`);
        }
    });
}

function minifyFile(fileLocation) {
    minify(fileLocation).then(minified => fs.writeFileSync(fileLocation, minified, () => {}));
}

module.exports = recursiveMinify;