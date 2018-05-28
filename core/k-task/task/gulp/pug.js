'use strict';

import fs from 'fs';
import path from 'path';
import foldero from 'foldero';
import pug from 'pug';
import yaml from 'js-yaml';

module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);
    let destjade = path.join(target);
    let dataPath = path.join(url.src, url.data);
    let dataPathJS = path.join(url.src, url.dataJS);
    // Run task

    // Jade template compile
    gulp.task('pug', () => {
        let siteData = {};
        let siteDataJS = '';
        if (fs.existsSync(dataPath)) {
            // Convert directory to JS Object
            siteData = foldero(dataPath, {
                recurse: true,
                whitelist: '(.*/)*.+\.(json|ya?ml)$',
                loader: function loadAsString(file) {
                    let json = {};
                    try {
                        if (path.extname(file).match(/^.ya?ml$/)) {
                            json = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
                        } else {
                            json = JSON.parse(fs.readFileSync(file, 'utf8'));
                        }
                    } catch (e) {
                        console.log('Error Parsing JSON file: ' + file);
                        console.log('==== Details Below ====');
                        console.log(e);
                    }
                    return json;
                }
            });
        }

        if (fs.existsSync(dataPathJS)) {
            // Convert directory to JS Object
            siteDataJS = foldero(dataPathJS, {
                recurse: true,
                whitelist: 'config.js',
                loader: function loadAsString(file) {
                    let json = {};
                    try {
                        json = JSON.parse('{' + fs.readFileSync(file, 'utf8').replace(/const\sCANHCAM_APP\s=/g, '"CANHCAM_APP" :') + '}');

                    } catch (e) {
                        console.log('Error Parsing JSON file: ' + file);
                        console.log('==== Details Below ====');
                        console.log(e);
                    }
                    return json;
                }
            });
        }

        // Add --debug option to your gulp task to view
        // what data is being loaded into your templates
        if (setgulp.debug) {
            console.log('==== DEBUG: site.data being injected to templates ====');
            console.log(siteData);
            console.log('\n==== DEBUG: package.json config being injected to templates ====');
            console.log(config);
        }

        return gulp.src([
                path.join(url.src, url.layouts.jade, '*.pug'),
                '!' + path.join(url.src, '{**/\_*,**/\_*/**}'),
                '!' + path.join(url.src, url.layouts.jade, url.ignore.jade)
            ])
            .pipe(plugins.changed(destjade))
            .pipe(plugins.plumber())
            .pipe(plugins.pug({
                pug: pug,
                pretty: true,
                locals: {
                    config: config,
                    debug: true,
                    // site: {
                    //     data: siteData,
                    //     dataJS: siteDataJS
                    // }
                }
            }))
            .pipe(plugins.htmlmin({
                collapseBooleanAttributes: true,
                conservativeCollapse: true,
                removeCommentsFromCDATA: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true
            }))
            .pipe(gulp.dest(destjade))
            // .on('end', browserSync.reload);
    });
}
