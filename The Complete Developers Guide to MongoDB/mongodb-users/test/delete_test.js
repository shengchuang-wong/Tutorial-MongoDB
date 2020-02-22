const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {

	let jack;

	beforeEach((done) => {
		jack = new User({ name: 'Jack' });
		jack.save()
			.then(() => done());
	});

	it('model instance remove', (done) => {
		jack.remove()
			.then(() => User.findOne({ name: 'Jack' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it('class method remove', (done) => {
		User.remove({ name: 'Jack' })
			.then(() => User.findOne({ name: 'Jack' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it('class method findOneAndRemove', (done) => {
		User.findOneAndRemove({ name: 'Jack' })
			.then(() => User.findOne({ name: 'Jack' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it('class method findByIdAndRemove', (done) => {
		User.findByIdAndRemove(jack._id)
			.then(() => User.findOne({ name: 'Jack' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

});