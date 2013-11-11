express-breadcrumbs
===================

Easy to use generic breadcrumbs middleware for Express.


## Usage

```javascript
// server.js
var breadcrumbs = require('express-breadcrumbs');
app.use(breadcrumbs.init());
app.use(function(req, res, next) {
  res.locals.breadcrumbs = req.breadcrumbs();
  next();
});

...

// routes.js
app.get('/signup', function(req, res) {
  req.breadcrumbs('SignUp');
  res.render('/signup');
});

// signup.jade
ul
  each breadcrumb in breadcrumbs
    li: a(href="#{breadcrumb.url}") #{breadcrumb.title}
```