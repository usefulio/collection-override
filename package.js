Package.describe({
  name: 'useful:collection-override',
  version: '0.1.1',
  summary: 'Allows you to override the default server method handlers for collection operations.',
  git: 'http://github.com/usefulio/collection-override',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('underscore', 'server');
  api.addFiles('collection-override.js', 'server');
  api.export('CollectionOverride', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('useful:collection-override');
  api.addFiles('collection-override-tests.js');
});
