export default function slugify(str, slug) {
	// NB: This is a very simple, conservative, slugify function,
	// avoiding extra dependencies.

	// Default the slug char to a dash
	if (typeof slug === "undefined") {
		slug = "-";
	}

	return str
		.toString()
		.trim()
		.toLowerCase()
		// Spaces to slugs
		.replace(/\s+/g, slug)
		// Multiple slugs to one
		.replace(new RegExp(`${slug}{2,}`), slug)
		// Remove leading & trailing slugs
		.replace(new RegExp(`^${slug}+|${slug}+$`), "")
		// Remove anything that isn't a (English/ASCII) letter, number or slug
		.replace(new RegExp(`[^a-zA-Z0-9${slug}]`), "")
		;
}
