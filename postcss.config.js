module.exports = ctx => {
    return {
        plugins: [
            require('postcss-import')(),
            require('postcss-url')(),
            require('postcss-cssnext')(),
            require('postcss-mixins'),
            require('postcss-nested')(),
        ],
    };
};
