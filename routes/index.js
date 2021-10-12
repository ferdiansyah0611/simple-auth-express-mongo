var express = require('express')
var router = express.Router()

var User = require('../model/users')

const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/', async function(req, res, next) {
	res.render('index', { title: 'Express', email: req.session.email })
})
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' })
})
router.post('/logout', function(req, res, next) {
	req.session.destroy()
	res.redirect('/login')
})
router.post('/login', async function(req, res, next) {
	const { email, password } = req.body
	if(email && password){
		var data = await User.findOne({email: email})
		if(data){
			bcrypt.compare(String(password), data.password, function(err, result) {
				if(result){
					req.session.isUser = true
					req.session.email = email
					res.redirect('/')
				}else{
					res.redirect('/login')
				}
			})
		}else{
			res.redirect('/login')
		}
	}else{
		res.redirect('/login')
	}
})
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' })
})
router.post('/signup', async function(req, res, next) {
	const { email, password } = req.body
	if(String(email) && String(password)){
		bcrypt.hash(String(password), saltRounds, async function(err, hash) {
			if(!err){
				var commit = new User({
					email: String(email),
					password: hash,
				})
				commit.save()
				res.redirect('/login')
			}else{
				res.redirect('/signup')
			}
		})
	}else{
		res.redirect('signup')
	}
})

module.exports = router
