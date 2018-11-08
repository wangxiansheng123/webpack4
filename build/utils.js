var path = require('path');
var config = require('../config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

//var glob = require('glob');

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path)
};

exports.cssLoaders = function (options) {
  options = options || {};

  // generate loader string to be used with extract text plugin
  function generateLoaders(loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar;
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&'
      } else {
        loader = loader + '-loader';
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!');

    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = [];
  var loaders = exports.cssLoaders(options);
  for (var extension in loaders) {
    var loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
};

//增加获取多入口的方法 注意 这个参数是个数组
/*exports.getEntry = function (globPaths) {
  var entries = {}, basename, tmp, pathname;

  for (globPath of globPaths) {
    glob.sync(globPath).forEach(function (entry) {
      basename = path.basename(entry, path.extname(entry));
      tmp = entry.split('/').splice(-3);
      pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
      entries[pathname] = entry;
    });
  }
  console.log(entries);
  return entries;
};*/
