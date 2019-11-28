const icons = require("@ant-design/icons");

function getAntdIcon() {
    const r = Object.create(null);
    for (let key in icons) {
        const curIcon = icons[key];
        if (curIcon.theme !== "twotone") {
            let { name, theme, icon } = curIcon;
            if (theme !== "outline") {
                name += "-filled";
            }
            r[name] = parseAbstractNode(icon, name);
        }
    }
    return r;
}

function parseAbstractNode(node, id) {
    const { tag, attrs, children } = node;
    let header, end, content = "";
    if (tag === "svg") {
        header = `<symbol viewBox="${attrs.viewBox}" id="${id}">`;
        end = "</symbol>";
    } else if (tag === "path") {
        header = `<path d="${attrs.d}"/>`;
        end = "";
    } else {
        return "";
    }
    if (children) {
        content += children.map(node => parseAbstractNode(node, id)).join("");
    }

    return header + content + end;

}

module.exports = getAntdIcon;
