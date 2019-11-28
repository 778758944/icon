build:
	npm run getIcon && rollup -c && mv ./lib/icon/index.d.ts ./lib/index.d.ts && rm -rf ./lib/icon

publish: 
	rollup -c && mv ./lib/icon/index.d.ts ./lib/index.d.ts && rm -rf ./lib/icon && znpm publish