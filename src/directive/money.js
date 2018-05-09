let money = {}
money.install = function(Vue, options) {
    Vue.directive('amount', {
        bind(el) {
            const prevent = function(e) {
                e.preventDefault ? e.preventDefault() : e.returnValue = false
            }
            el.addEventListener('keydown', function(event) {
                let str = el.value
                let len = str.split('.')
                if (event.keyCode === 110 || event.keyCode === 190) {
                    el.value.indexOf('.') >= 0 && prevent(event)
                } else if (48 <= event.keyCode && event.keyCode <= 57 || event.keyCode === 8) {
                    if (len.length === 2 && (len[1].length) > 1 && event.keyCode !== 8) {
                        prevent(event)
                    }
                } else {
                    prevent(event)
                }

            })
        }

    })
}
export default money