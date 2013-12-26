express-breadcrumbs
===================

Easy to use generic breadcrumbs middleware for Express.

## Install

```bash
npm install express-breadcrumbs --save
```

## Usage

### 1 - Initialization

Intializes Breadcrumbs in server.js.

```javascript
// server.js

var breadcrumbs = require('express-breadcrumbs');
app.use(breadcrumbs.init());

// Set Breadcrumbs home information
app.use(breadcrumbs.setHome());

// Mount the breadcrumbs at `/admin`
app.use('/admin', breadcrumbs.setHome({
  name: 'Dashboard',
  url: '/admin'
}));
```

### 2 - Adding breadcrumbs

Call `req.breadcrumbs('name', 'url')` on each request, and call `req.breadcrumbs()` to obtain data.

```javascript
// routes.js

app.get('/signup', function(req, res) {
  req.breadcrumbs('SignUp');
  res.render('/signup', {
    breadcrumbs: req.breadcrumbs()
  });
});
```

**More usages:**

```javascript
// one by one
req.breadcrumbs('name', 'url');

// object with properties `name` and `url`
req.breadcrumbs({
  name: 'name',
  url: 'url'
});

// objects with properties `name` and `url`
req.breadcrumbs([obj1, obj2]);
```

### 3 - Using in templates

To use breadcrumbs in template, only that you need is iterate over breadcrumbs.

```
// signup.jade

ul
  each breadcrumb in breadcrumbs
    li: a(href="#{breadcrumb.url}") #{breadcrumb.name}
```