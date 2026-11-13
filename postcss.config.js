module.exports = {
    plugins: {
        "postcss-pxtorem": {
            rootValue: 16,
            propList: ["*"], // convert all properties
            selectorBlackList: [], // selectors to skip
            replace: true, // replace px with rem instead of adding a fallback
            mediaQuery: true, // convert px in media queries too
            minPixelValue: 0, // convert every px value, however small
        },
    },
};
