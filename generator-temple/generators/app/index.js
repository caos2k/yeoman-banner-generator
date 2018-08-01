'use strict';

//Require dependencies
var Generator = require('yeoman-generator');

var yosay = require('yosay');
var chalk = require('chalk');
// // var wiredep = require('wiredep');
// var mkdirp = require('mkdirp');
var camelCase = require('camelcase');
// var _s = require('underscore.string');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {

    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      
      // this.log(yosay("Ciao! Let's make some banner!"));

      const message = chalk.white("\n ") +
      chalk.black.bgWhiteBright("\n **************************************************************************************************** ") +
      chalk.black.bgWhiteBright("\n ******************************* CIAO BELLO! LET'S MAKE SOME BANNERS! ******************************* ") +
      chalk.black.bgWhiteBright("\n **************************************************************************************************** ") +
      chalk.black.bgWhiteBright("\n   __  __     _____     ____      ___        _        __  __      ___      _   _     _  __    ____    ") +
      chalk.black.bgWhiteBright("\n  |  \\/  |   | ____|   |  _ \\    |_ _|      / \\      |  \\/  |    / _ \\    | \\ | |   | |/ /   / ___|   ") +
      chalk.black.bgWhiteBright("\n  | |\\/| |   |  _|     | | | |    | |      / _ \\     | |\\/| |   | | | |   |  \\| |   | ' /    \\___ \\   ") +
      chalk.black.bgWhiteBright("\n  | |  | |   | |___    | |_| |    | |     / ___ \\    | |  | |   | |_| |   | |\\  |   | . \\     ___) |  ") +
      chalk.black.bgWhiteBright("\n  |_|  |_|   |_____|   |____/    |___|   /_/   \\_\\   |_|  |_|    \\___/    |_| \\_|   |_|\\_\\   |____/   ") +
      chalk.black.bgWhiteBright("\n                                                                                                      ") +
      chalk.black.bgWhiteBright("\n **************************************************************************************************** ") +
      chalk.black.bgWhiteBright("\n ********************* PLEASE ANSWER TO SOME QUESTIONS IN ORDER TO GET STARTED! ********************* ") +
      chalk.black.bgWhiteBright("\n **************************************************************************************************** ") +
      chalk.white("\n ");
      
      this.log(message);

    }

    var prompts = [
      {
        type: 'input',
        name: 'campaignName',
        message: "What is the name of the campaign?",
        default: "My Rich Media Campaign",
        filter: function(answer) {
          return camelCase(answer)
        }
      }, 
      {
        type: 'input',
        name: 'bannerSize',
        message: 'What size do you need?',
        default: "300x250"
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.config.set('campaignName', answers.campaignName);
      this.config.set('bannerSize', answers.bannerSize);
      this.config.set('bannerWidth', answers.bannerSize.split('x')[0]);
      this.config.set('bannerHeight', answers.bannerSize.split('x')[1]);
      done();

    });

  }

  configJson() {
    this.fs.copyTpl(
      this.templatePath('config.json'),
      this.destinationPath(this.config.get("campaignName")+'/'+this.config.get("bannerSize")+'/config.json'),
        {
          banner_width: this.config.get("bannerWidth"), 
          banner_height: this.config.get("bannerHeight")
        }
      );
  }

  gulpfile() {
    this.fs.copyTpl(
      this.templatePath('../../../gulpfile.js'),
      this.destinationPath(this.config.get("campaignName")+'/'+this.config.get("bannerSize")+'/gulpfile.js'),
        {
          campaign_name: this.config.get("campaignName"), 
          banner_size: this.config.get("bannerSize")
        }
    );
  }

  styles() {
    this.fs.copyTpl(
      this.templatePath('css/main.scss'),
      this.destinationPath(this.config.get("campaignName")+'/'+this.config.get("bannerSize")+'/css/main.scss'),
        {
          banner_width: this.config.get("bannerWidth"), 
          banner_height: this.config.get("bannerHeight")
        }
      );
  }

  images() {
    this.fs.copyTpl(
      this.templatePath('img/logo.png'),
      this.destinationPath(this.config.get("campaignName")+'/'+this.config.get("bannerSize")+'/img/logo.png')
    );
  }

  scripts() {
    this.fs.copyTpl(
      this.templatePath('js/main.js'),
      this.destinationPath(this.config.get("campaignName")+'/'+this.config.get("bannerSize")+'/js/main.js')
      );
  }

  html() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath(this.config.get("campaignName")+'/'+this.config.get("bannerSize")+'/index.html'),
        {
          title: this.config.get("campaignName"),
          banner_width: this.config.get("bannerWidth"), 
          banner_height: this.config.get("bannerHeight")
        }
      );
  }

};