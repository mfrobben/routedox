/*jshint asi: true globalstrict: true*/
"use strict";
/**
 * 507 backend service
 * Coded by Developer Hive at Terrarium Inc.
 * Copyright (c) 2012 Terrarium Inc.
 */


/**
 * Route: POST /:sid/testingAPICommentGen
 *
 * Can the api sensing algorithm parse multiline
 * body comments and stuffs?
 *
 * @param {JSONObject} foo A really, really well formatted foo
 * @param {String} who A thing that Horton heard
 * @param {Number} bar Source of funs
 * @return {Object} Something equally silly as these inputs is returned.
 */


/**
 * Route: POST /:sid/privateRoute
 *
 * This should probably get ignored.
 *
 * @param {String} goo A super secret param
 * @return {JSONObject} And equally secret result.
 * @api private
 */


/**
 * Route: POST /thingy
 *
 * This comment shows how to format a comment that uses no tags but is IMO better formatted than the above.
 * Very important: At least one @ tag must be present for JSDoc compliance - so you must at least use @api public
 *
 * ###Input:
 * `    photoURL : String,
 *      title : String,
 *      description : String
 * `
 *
 *
 * ###Output:
 *`     id : String, //foo
 *`
 *
 *
 * @api public
 */