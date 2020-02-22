const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Assocations', () => {

	let jessy, blogPost, comment;

	beforeEach((done) => {

		jessy = new User({ name: 'Jessy' });
		blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
		comment = new Comment({ content: 'Congrats on great post' });

		jessy.blogPosts_.push(blogPost);
		blogPost.comments_.push(comment);
		comment._user = jessy;

		Promise.all([jessy.save(), blogPost.save(), comment.save()])
			.then(() => {
				done();
			});

	});

	it('saves a relation between a user and a blogpost', (done) => {
		User.findOne({ name: 'Jessy' })
			.populate('blogPosts_')
			.then((user) => {
				assert(user.blogPosts_[0].title === 'JS is Great');
				done();
			})
	});

	it('saves a full relation tree', (done) => {
		User.findOne({ name: 'Jessy' })
			.populate({
				path: 'blogPosts_',
				populate: {
					path: 'comments_',
					model: 'comment',
					populate: {
						path: '_user',
						model: 'user'
					}
				}
			})
			.then((user) => {
				assert(user.name === 'Jessy');
				assert(user.blogPosts_[0].title === 'JS is Great');
				assert(user.blogPosts_[0].comments_[0].content === 'Congrats on great post');
				assert(user.blogPosts_[0].comments_[0]._user.name === 'Jessy');

				done();
			});
	});


});