export function trigger (el, event, args) {
	let e = document.createEvent('HTMLEvents')
	e.initEvent(event, true, false)

	if (args) {
		for (let prop in args) {
			e[prop] = args[prop]
		}
	}

	// Due to Firefox bug, events fired on disabled
	// non-attached form controls can throw errors
	try { el.dispatchEvent(e) } catch (e) {}
}