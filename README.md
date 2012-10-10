routedox
========

routedox is a quick tool I put together that uses dox and mustache to recurse through files in a directory
and output JSDoc formatted block comments as an html file.

Any block comment flagged as `@api private` will not be output.

Usage
-----
`node routedox` in the directory you want to generate docs for.

Block comments should be formatted as follows:
````js
/**
 * NAME OF YOUR FUNCTION
 *
 * Description of your function
 *
 * @param {paramType} paramName paramDescription
 * @return {returnType} returnDescription
 * @api private (or @api public)
 */
````