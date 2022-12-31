const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
const users = require('../models/users');

exports.index = (req, res) => {
  res.render('index', {
    title: 'msg.',
  });
};

exports.getFeed = async (req, res) => {
  // console.log(req.body);
  // console.log(res.locals.currentUser);
  // const user = await users.find({ username: req.body.user });
  // console.log(req.body.user);
  // console.log('user >>', user);
  res.render('feed', {
    title: 'you have created an account or log in.',
    user: req.user,
  });
};

exports.getClubForm = (req, res) => {
  // const user = await users.find({ user: req.user.id });
  console.log(req.params.id);
  // console.log(req.user);
  res.render('join_us', { title: 'Give us the code.', userId: req.params.id });
};

exports.msgForm = (req, res) => {
  res.render('post', { title: 'Create your message.' });
};

exports.postMsg = async (req, res) => {
  console.log(req.body.text);
  console.log(req.user);
  try {
    await Post.create({
      text: req.body.text,
      user: req.user,
    });
    console.log('post added');
    res.redirect('/clubhouse/feed');
  } catch (error) {
    console.error(error);
  }
};

// exports.postMsg = [
//   // Validate and sanitize fields.
//   body('post', 'Name must not be empty.').trim().escape(),

//   // Process request after validation and sanitization.
//   (req, res, next) => {
//     // Extract the validation errors from a request.
//     const errors = validationResult(req);

//     // let result = img();

//     // async function img() {
//     //   try {
//     //     const res = await cloudinary.uploader.upload(req.file.path);
//     //   } catch (error) {
//     //     console.error(error);
//     //   }
//     //   return res;
//     // }
//     // Create a Book object with escaped and trimmed data.
//     console.log(req.user);
//     console.log(req.body.user);
//     const post = new Post({
//       text: req.body.post,
//       user: req.user,
//       // image: result.secure_url,
//       // cloudinaryId: result.public_id,
//     });
//     console.log(post);

//     if (!errors.isEmpty()) {
//       // There are errors. Render form again with sanitized values/error messages.

//       // async.parallel(
//       //   {
//       //     brands(callback) {
//       //       Brand.find(callback);
//       //     },
//       //     category(callback) {
//       //       Category.find(callback);
//       //     },
//       //   },
//       //   (err, results) => {
//       //     if (err) {
//       //       return next(err);
//       //     }

//       // Mark our selected genres as checked.
//       // for (const category of results.category) {
//       //   if (shoe.category.includes(category._id)) {
//       //     genre.checked = 'true';
//       //   }
//       // }
//       res.render('post', {
//         title: 'Create Post',
//         post,
//         errors: errors.array(),
//       });
//       //   }
//       // );
//       return;
//     }

//     // Data from form is valid. Save book.
//     post.save((err) => {
//       if (err) {
//         return next(err);
//       }
//       // Successful: redirect to new book record.
//       res.redirect('/clubhouse/feed');
//     });
//   },
// ];

exports.postClubForm = (req, res) => {
  console.log(req.body.passcode);

  if (req.body.passcode === 'horse') {
    // console.log(req.params.id);
    async (req, res) => {
      try {
        await users.findOneAndUpdate(
          //Post is the name of the model (first parameter) in post model file
          { _id: req.params.id },
          {
            admin: true,
          }
        );
        console.log('changed');
        res.redirect(`/clubhouse/feed`);
      } catch (err) {
        console.log(err);
      }
    };
    // console.log('iuyf');
  } else {
    console.log('hgfd');
  }
};

exports.logout = (req, res) => {};
