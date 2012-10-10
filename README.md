routedox
========

Routedox is a quick tool I put together that uses dox and mustache to recurse through files in a directory
and output JSDoc formatted block comments as an html file.

Any block comment flagged as @api:private will not be output.

**Usage
`node routedox` in the directory you want to generate docs for.