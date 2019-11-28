import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from "autoprefixer"
import json from "rollup-plugin-json"
import { uglify } from "rollup-plugin-uglify"

export default {
    input: "./src/icon/index.tsx",
    output: {
        file: "./lib/index.js",
        format: "umd",
        name: "Icon",
        globals: {
            react: "React" 
        }
    },
    external(id) {
        return id.indexOf('react') >= 0;
    },
    plugins: [typescript({
        useTsconfigDeclarationDir: true,
    }), postcss({
        plugins: [autoprefixer()]
    }), json({
        compact: true
    }), uglify()]
}