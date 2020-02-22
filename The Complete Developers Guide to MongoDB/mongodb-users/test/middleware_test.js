const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {

	let jay, blogPost;

	beforeEach((done) => {

		jay = new User({ name: 'Jay' });
		blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });

		jay.blogPosts_.push(blogPost);

		Promise.all([jay.save(), blogPost.save()])
			.then(() => {
				done();
			});
	});

	it('users clean up dangling blogposts on remove', (done) => {
		jay.remove()
			.then(() => BlogPost.count())
			.then((count) => {
				assert(count === 0);
				done();
			});
	});

});