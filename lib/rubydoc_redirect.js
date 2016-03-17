// ==UserScript==
// @name         RubyDoc Redirect
// @namespace    http://patrickmclaren.com
// @version      0.1
// @description  Redirects core and stdlib urls to latest Ruby version.
// @author       Patrick McLaren
// @match        http://ruby-doc.org/core-*
// @match        http://ruby-doc.org/stdlib-*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==
/* jshint esversion: 6 */
/* globals GM_getValue, GM_setValue */

(function () {
  'use strict';

  var MODULE = 'rubydoc_redirect';
  var REGEX  = /(core|stdlib)-([0-9\.]+)/;

  /** 
   * Wrapper for local storage that namespaces keys with
   * `MODULE:` to prevent clobbering.
   */
  function Storage() {
    this.get = function (item, defaultValue) {
      return GM_getValue(this.key(item), defaultValue);
    };

    this.set = function (item, value) {
      return GM_setValue(this.key(item), value);
    };

    this.key = function (item) {
      return MODULE + ':' + item;
    };
  }

  var storage = new Storage();

  /* TODO: Fetch latest version programatically */
  var rubyVersion = storage.get('rubyVersion', '2.3.0');

  var href = location.href;
  var matches = href.match(REGEX);
  if (matches === null) {
    return;
  }

  var [sec, ver] = matches.slice(1);

  var next = href.replace(sec + "-" + ver, sec + "-" + rubyVersion);

  if (href != next) {
    location.href = next;
  }
})();
