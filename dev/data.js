import faker from 'faker';
import moment from 'moment';

let roles = [
	{ id: "admin", name: "Administrator"},
	{ id: "moderator", name: "Moderator"},
	{ id: "user", name: "Registered User"},
	{ id: "visitor", name: "Visitor"}
]

let skills = [ "HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS" ];

module.exports = {
	roles,
	skills,

	users: (function() {
		let res = [];
		for (let i = 0; i < 5; i++) {
			let lang = faker.helpers.randomize(['en-US', 'en-GB', 'de', 'fr', 'it']);
			//faker.locale = lang;
			let user = faker.helpers.createCard();
			user.id = i + 1;
			user.type = faker.helpers.randomize(["personal", "business"]);
			user.password = faker.internet.password(10);
			user.bio = faker.lorem.paragraph();
			let dob = faker.date.past(40, "1998-01-01");
			user.dob = dob.valueOf();
			user.age = moment().year() - moment(dob).year();
			user.rank = faker.random.number({
				min: 1,
				max: 10
			});
			user.role = faker.helpers.randomize(roles).id;


			user.skills = [];
			user.skills.push(faker.helpers.randomize(skills));
			user.skills.push(faker.helpers.randomize(skills));

			user.language = lang;
			user.status = faker.helpers.randomize([true, false, true]);
			user.created = faker.date.recent(30).valueOf();
			user.dt = faker.date.recent(30).valueOf();
			user.favoriteColor = faker.internet.color();

			if (user.type == "business") {
				user.company = {
					"name": faker.company.companyName(),
					"catchPhrase": faker.company.catchPhrase(),
					"bs": faker.company.bs(),
					"website": faker.internet.domainName(),
					"phone": faker.phone.phoneNumber(),
					"address": {
						"street": faker.address.streetAddress(),
						"city": faker.address.city(),
						"country": faker.address.country(),
						"zipcode": faker.address.zipCode(),
						"geo": {
							"lat": faker.address.latitude(),
							"lng": faker.address.longitude()
						}
					}

				}
			} else {
				user.company = undefined;
			}

			user.posts = undefined;
			user.accountHistory = undefined;

			res.push(user);
			//console.log(user);
		}
		//console.log(res);
		return res;
	})()
}
