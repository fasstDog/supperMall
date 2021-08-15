module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewprotWidth: 320, //视窗的宽度，对应我们设计稿的宽度(375,667)
            viewprotHeight: 568,
            unitPrecision: 5, //指定‘px’转换为视窗单位值的小数位数(大多数情况不能取整)
            viewprotUnit: 'vw', //指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类(可以添加到数组中，或给不需要添加的类加入ignore类名)
            minPixelValue: 1, //小于或等于‘1px’不转化为视窗单位
            mediaQuery: false //允许在媒体查询中转换'px
        }
    }
}