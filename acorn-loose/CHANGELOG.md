## 6.0.0 (2018-09-14)

### Breaking changes

This module has been moved into its own package, `acorn-loose`.

Plugins work differently, and will have to be rewritten to work with this version.

## 5.1.0 (2017-07-05)

### Bug fixes

Make the ES module version of the loose parser actually work.

## 4.0.4 (2016-12-19)

### Bug fixes

Fix issue with loading acorn_loose.js with an AMD loader.

## 3.2.0 (2016-06-07)

### Bug fixes

Don't crash when the loose parser is called without options object.

## 3.1.0 (2016-04-18)

### Bug fixes

Fix issue where the loose parser created invalid TemplateElement nodes for unclosed template literals.

## 2.7.0 (2016-01-04)

### Fixes

Make sure the loose parser always attaches a `local` property to `ImportNamespaceSpecifier` nodes.

## 2.6.4 (2015-11-12)

### Fixes

Fix crash in loose parser when parsing invalid object pattern.

### New features

Support plugins in the loose parser.

## 2.5.0 (2015-10-27)

### Fixes

In the loose parser, don't allow non-string-literals as import sources.
