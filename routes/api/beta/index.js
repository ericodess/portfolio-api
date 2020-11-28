const express = require('express');

const router = express.Router();

const auth = require('./auth');
const users = require('./users');
const posts = require('./posts');
const products = require('./products');
const podcasts = require('./podcasts');
const courses = require('./courses');
const banners = require('./banners');
const concepts = require('./concetps');


router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);
router.use('/products', products);
router.use('/podcasts', podcasts);
router.use('/courses', courses);
router.use('/banners', banners);
router.use('/concepts', concepts);

module.exports = router;