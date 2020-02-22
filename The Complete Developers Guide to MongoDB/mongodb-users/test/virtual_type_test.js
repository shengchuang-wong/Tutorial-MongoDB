const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {

	it('postCount returns number of posts', (done) => {
		const jacky = new User({
			name: 'Jacky',
			posts: [{ title: 'PostTitle' }]
		});

		jacky.save()
			.then(() => User.findOne({ name: 'Jacky' }))
			.then((user) => {
				assert(jacky.postCount === 1);
				done();
			});

	});

});