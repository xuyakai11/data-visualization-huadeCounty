export default function () {
	var doc: any = window.document,
			docEle: any = doc.documentElement,
			viewport: any = doc.querySelector('meta[name=viewport]'),
			scale: number = 0,
			dpr: number = 0,
			m: any

	if (viewport) {
			// 根据视口配置设置缩放比例，而不是自适应。
			m = viewport.getAttribute('content').match(/initial-scale=([\d.]+)/)
			if (m) {
					scale = +m[1]
					dpr = ~~(1 / scale)
			}
	} else {
			m = window.navigator.userAgent.match(/iPhone|iPod|iPad/)
			if (m) {
					dpr = ~~window.devicePixelRatio
					dpr = dpr >= 3 ? 3 : dpr
					dpr = dpr <= 1 ? 1 : dpr
			} else {
					dpr = 1
			}
			scale = 1 / dpr

			viewport = doc.createElement('meta')
			viewport.setAttribute('name', 'viewport')
			viewport.setAttribute('content', ['initial-scale', 'maximum-scale', 'minimum-scale', 'user-scalable=no'].join('=' + scale + ', '))

			if (docEle.firstElementChild) {
					docEle.firstElementChild.appendChild(viewport)
					viewport = null
			}
	}

	var tid: any = null,
			rem: number  = 12,
			forceRefresh = function () {
					// 刷新 dpr 对应的 rem 字号大小
					var w = docEle.getBoundingClientRect().width
					rem = w / 2777 * 100
					docEle.style.fontSize = rem + 'px';
			},
			refresh = function () {
					clearTimeout(tid)
					tid = setTimeout(forceRefresh, 300)
			}

	window.addEventListener('resize', refresh, false)
	window.addEventListener('pageshow', refresh, false)

	forceRefresh()
	docEle.setAttribute('data-dpr', dpr)
}