const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	let josh;

	beforeEach((done) => {
		josh = new User({ name: 'Josh', likes: 0 });
		josh.save()
			.then(() => done());
	});

	function assertName(operation, done) {
		operation
			.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Alex');
				done();
			});
	}

	it('instance type using set n save', (done) => {
		josh.set('name', 'Alex');
		assertName(josh.save(), done);
	});

	it('A model instance can update', (done) => {
		assertName(josh.update({ name: 'Alex' }), done);
	});

	it('A model class can update', (done) => {
		assertName(
			User.update({ name: 'Josh' }, { name: 'Alex' }),
			done
		);
	});

	it('A model class can update one record', (done) => {
		assertName(
			User.findOneAndUpdate({ name: 'Josh' }, { name: 'Alex' }),
			done
		);
	});

	it('A model class can find a record with an Id and update', (done) => {
		assertName(
			User.findByIdAndUpdate(josh._id, { name: 'Alex' }),
			done
		);
	});

	it('A user can have their postcount incremented by 1', (done) => {
		User.update({ name: 'Josh'}, { $inc: { likes: 1 } })
			.then(() => User.findOne({ name: 'Josh' }))
			.then((user) => {
				assert(user.likes === 1);
				done();
			});
	});

});