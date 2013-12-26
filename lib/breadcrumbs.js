/**
 * Easy to use generic breadcrumbs middleware for Express.
 * @author HeroicYang <me@heroicyang.com>
 * /

/**
 * Module dependencies
 */
var _ = require('lodash');

/**
 * Breadcrumbs initialization.
 * Intializes Breadcrumbs for incoming requests, adds `breadcrumbs()` method to `req`.
 *
 * Examples:
 *      app.use(breadcrumbs.init());
 * 
 * @return {Function}
 */
exports.init = function() {
  var breadcrumbs = [];

  function exists(breadcrumb) {
    return _.findIndex(breadcrumbs, breadcrumb) !== -1;
  }

  function addBreadcrumbs(name, url) {
    if (arguments.length === 1) {
      if (_.isArray(name)) {
        _.each(name, function(breadcrumb) {
          if (!exists(breadcrumb)) {
            breadcrumbs.push(breadcrumb);
          }
        });
      } else if (_.isObject(name)) {
        if (!exists(name)) {
          breadcrumbs.push(name);
        }
      } else {
        if (!exists(name)) {
          breadcrumbs.push({ name: name });
        }
      }
    } else if (arguments.length === 2) {
      if (!exists(name)) {
        breadcrumbs.push({
          name: name,
          url: url
        });
      }
    } else {
      return breadcrumbs;
    }
  }

  function cleanBreadcrumbs() {
    breadcrumbs = [];
  }

  return function(req, res, next) {
    cleanBreadcrumbs();
    req.breadcrumbs = addBreadcrumbs;
    next();
  };
};

/**
 * Set Breadcrumbs home information.
 *
 * Examples:
 *      app.use(breadcrumbs.setHome());
 *      app.use('/admin', breadcrumbs.setHome({
 *        name: 'Dashboard',
 *        url: '/admin'
 *      }));
 * 
 * @param {Object} options
 *  - name    home name, default `Home`
 *  - url     home url, default `/`
 * @return {Function}
 */
exports.setHome = function(options) {
  options = options || {};
  var homeName = options.name || 'Home',
    homeUrl = options.url || '/';

  return function(req, res, next) {
    var homeBreadcrumb = _.find(req.breadcrumbs(), function(breadcrumb) {
      return breadcrumb._home;
    });

    if (!homeBreadcrumb) {
      req.breadcrumbs({
        name: homeName,
        url: homeUrl,
        _home: true
      });
    } else {
      _.extend(homeBreadcrumb, {
        name: homeName,
        url: homeUrl
      });
    }

    next();
  };
};