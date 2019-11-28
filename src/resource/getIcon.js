const getAntdIcon = require("./getAntdIcon");
const fs = require("fs");

function getIcon(filePath, isExact) {
    const antdIcons = getAntdIcon();
    let list = [];
    if (Array.isArray(filePath)) {
        list = filePath;
    } else {
        if (fs.existsSync(filePath)) {
            const tempList = JSON.parse(fs.readFileSync(filePath, "utf8"));
            if (Array.isArray(tempList)) list = tempList;
        }
    }
    let filterIcons = Object.create(null);
    list.forEach((key) => {
        const val = antdIcons[key];
        let valFilled;
        
        if (!isExact) {
            valFilled = antdIcons[`${key}-filled`];
        }

        if (!val && !valFilled) {
            console.error("You may add an icon(%s) which not exists in ant-design", key);
        }

        if (val) filterIcons[key] = val;
        if (valFilled) filterIcons[`${key}-filled`] = valFilled;
    });
    return filterIcons;
}


module.exports = getIcon;