'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  askFor: function () {
    var done = this.async();

    var prompts = [
      {
        name: 'externalCSS',
        message: 'Would you like an external CSS file for this element?',
        type: 'confirm'
      }
    ];

    this.prompt(prompts, function (props) {
      this.includeCore = props.includeCore;
      this.includePaper = props.includePaper;

      done();
    }.bind(this));
  },
  el: function () {
    this.elementName = this.args[0];
    if (!this.elementName) {
      console.error('Element name required');
      console.error('ex: yo polymer:el my-element');
      return;
    }

    if (this.elementName.indexOf('-') === -1) {
      console.error('Element name must contain a dash "-"');
      console.error('ex: yo polymer:el my-element');
      return;
    }

    // Create the template element
    this.template('_element.html', 'app/elements/' + this.elementName + '.html');

    // Wire up the dependency in elements.html
    var file = this.readFileAsString('app/elements/elements.html');
    file += '<link rel="import" href="' + this.elementName + '.html">\n';
    this.writeFileFromString(file, 'app/elements/elements.html');
  }
});
