const faker = require('faker');


module.exports.randomPersonList = function (count) {
	count = (typeof(count) === 'number' && count > 0) ? count : 1;
	
	const person = () => ({
		name: faker.name.findName(),
		email: faker.internet.email(),
		text: faker.lorem.text(1),
	})
	
	const personList = [];
	
	for (let i = 0; i < count; i++) {
		personList.push({ id: i, ...person() })
	}
	
	return personList;
}
