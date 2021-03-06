/*jshint asi: true globalstrict: true*/
"use strict";

var dox = require('dox'),
    mustache = require('mustache'),
    fs = require('fs'),
    path = require('path')

var cwdFolder = process.cwd().split('/')[process.cwd().split('/').length-1]

var defaultTemplate =   '<h1>{{{description.summary}}}</h1>\n' +
                        '<p> {{{description.body}}}</p>\n' +
                        '<h3>Input:</h3>\n' +
                        '{{#params}} ' +
                        '{{name}} - {{types}} - {{description}}' +
                        '<br>{{/params}}\n' +
                        '<h3>Output:</h3>\n' +
                        '{{return.types}} - {{return.description}}<hr>'

var noTagTemplate =     '<h1>{{{description.summary}}}</h1>\n' +
                        '<p> {{{description.body}}}</p>\n<hr>'

var defaultHtml =       '<!DOCTYPE html>\n<html>\n<head>\n' +
                        '<title>Routedox: '+ cwdFolder + '</title>\n' +
                        '</head>\n<body>\n'


/**
 * Function: documentFileCommentsInDirectory
 *
 * This function iterates through files in a directory, reads all JSDoc tagged block comments, processes
 * them, and if they aren't marked `@api private`, they're appended to the output file as rendered HTML.
 *
 * @param dirPath
 * @api private
 */
function documentFileCommentsInDirectory(dirPath) {

    var fileArray = fs.readdirSync(dirPath)
    for(var i = 0; i < fileArray.length; i++) {

        // don't recurse on node_modules, test, or .*
        // FYI - dox incorrectly parses mocha test files with describe syntax as a giant comment :(
        var stat = fs.statSync(dirPath + '/' + fileArray[i])
        if (stat.isDirectory() && fileArray[i] !== 'node_modules'  &&
            fileArray[i] !== 'static' && fileArray[i] !== 'static-v2' &&
            fileArray[i] !== 'test' && fileArray[i][0] !== '.'){
            documentFileCommentsInDirectory(dirPath + '/' + fileArray[i])
        }
        
        // only care about .js files
        if (!stat.isDirectory() && path.extname(fileArray[i]) === '.js'){
            var filePath = dirPath + '/' + fileArray[i]

            try {
                var data = fs.readFileSync(filePath)
            } catch (err) {
                console.log('failed to open file:', filePath)
                throw err
            }
            
            var commentArray = dox.parseComments(data.toString())
            for (var j = 0; j < commentArray.length; j++) {
                var comment = commentArray[j]

                simplifyCommentTags(comment)

                // we only care about JSDoc tagged comments with an @api field
                if (comment.params && comment['return'] && comment.api && comment.api.visibility === 'public') {
                    var docHtml = mustache.render(defaultTemplate, comment)
                    fs.appendFileSync('./routedoc.html', docHtml)
                }
                else if (comment.api && comment.api.visibility === 'public') {
                    var docHtml = mustache.render(noTagTemplate, comment)
                    fs.appendFileSync('./routedoc.html', docHtml)
                }
            }
        }
    }
}


/**
 * Function: simplifyCommentTags
 *
 * This function puts param and return comment tags into buckets so mustache can access them simply.
 *
 * @param {JSONObject} comment A single comment from a javascript file
 * @return {JSONObject} The comment after modification
 * @api private
 */

function simplifyCommentTags(comment){

    comment['params'] = []

    for (var i = 0; i < comment.tags.length; i++){
        if (comment.tags[i]['type'] === 'param')
            comment['params'][i] =  comment.tags[i]
        else if (comment.tags[i]['type'] === 'return')
            comment['return'] = comment.tags[i]
        else if (comment.tags[i]['type'] === 'api')
            comment['api'] = comment.tags[i]
    }
    return
}



// create initial file contents
fs.writeFileSync('./routedoc.html', defaultHtml)

documentFileCommentsInDirectory(process.cwd())

// close out the HTML
fs.appendFileSync('./routedoc.html', '</body> </html>')

