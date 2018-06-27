import Fakerator from "fakerator";
import fecha from "fecha";

let fakerator = new Fakerator();

let roles = [{ id: "admin", name: "Administrator" }, { id: "moderator", name: "Moderator" }, { id: "user", name: "Registered User" }, { id: "visitor", name: "Visitor" }];

let skills = ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"];

let users = (function() {
	let res = [];
	for (let i = 0; i < 5; i++) {
		let lang = fakerator.random.arrayElement(["en-US", "en-GB", "de", "fr", "it"]);
		let user = fakerator.entity.user();
		user.id = i + 1;
		user.type = fakerator.random.arrayElement(["personal", "business"]);
		user.bio = fakerator.lorem.paragraph();
		let dob = fakerator.date.past(40, "1998-01-01");
		user.dob = /* fecha.format(dob, "YYYY.MM.DD");*/ dob.valueOf();
		user.time = fecha.format(new Date(), "hh:mm:ss");
		user.age = fecha.format(new Date().getFullYear() - dob, "YY");
		user.rank = fakerator.random.number(1, 10);
		user.role = fakerator.random.arrayElement(roles).id;
		// user.mobile = fakerator.phone.phoneNumber();
		user.avatar = fakerator.internet.avatar();
		user.sex = fakerator.random.arrayElement(["male", "female"]);

		user.skills = fakerator.utimes(fakerator.random.arrayElement, 2, skills);

		user.language = lang;
		user.status = fakerator.random.boolean(75);
		user.created = fakerator.date.recent(30).valueOf();
		user.dt = fakerator.date.recent(30).valueOf();
		user.favoriteColor = "#" + fakerator.internet.color();
		user.color = "#" + fakerator.internet.color();

		if (user.type === "business") user.company = fakerator.entity.company();

		user.income = [fakerator.random.number(50000), fakerator.random.number(50000, 100000)];

		res.push(user);
		// console.log(user);
	}
	// console.log(res);
	return res;
})();

export { roles, skills, users };
