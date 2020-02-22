const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {

	it('can create a subdocument', (done) => {
		const jim = new User({ 
			name: 'Jim', 
			posts: [{ title: 'PostTitle' }] 
		});

		jim.save()
			.then(() => User.findOne({ name: 'Jim' }))
			.then((user) => {
				assert(user.posts[0].title === 'PostTitle');
			done();
			});

	});

	it('can add Subdocuments to an existing record', (done) => {
		const jim = new User({
			name: 'Jim',
			posts: []
		});

		jim.save()
			.then(() => User.findOne({ name: 'Jim' }))
			.then((user) => {
				user.posts.push({ title: 'New Post' });
				return user.save();
			})
			.then(() => User.findOne({ name: 'Jim' }))
			.then((user) => {
				assert(user.posts[0].title === 'New Post');
				done();
			});

	});


	it('can remove an existing subdocument', (done) => {
		const jim = new User({
			name: 'Jim',
			posts: [{ title: 'New Title' }]
		});

		jim.save()
			.then(() => User.findOne({ name: 'Jim' }))
			.then((user) => {
				const post = user.posts[0];
				post.remove();
				return user.save();
			})
			.then(() => User.findOne({ name: 'Jim' }))
			.then((user) => {
				assert(user.posts.length === 0);
				done();
			})

	});

});