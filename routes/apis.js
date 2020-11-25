const express = require('express');

const router = express.Router();

const auth = require('./api/auth');
const users = require('./api/users');
const posts = require('./api/posts');
const products = require('./api/products');
const podcasts = require('./api/podcasts');
const courses = require('./api/courses');
const banners = require('./api/banners');
const concepts = require('./api/concetps');

router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);
router.use('/products', products);
router.use('/podcasts', podcasts);
router.use('/courses', courses);
router.use('/banners', banners);
router.use('/concepts', concepts);

module.exports = router;