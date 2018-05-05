'use strict';
import path from 'path';

import prettify from 'gulp-html-beautify';
import replace from 'gulp-replace';


module.exports = function(gulp, setgulp, plugins, config, target, browserSync) {
    let url = config;
    let dest = path.join(target);

    // Run task
    gulp.task('html-beautify', function() {

        return gulp.src(path.join(target, '**/*.html'))
            .pipe(prettify({
                "indent_size": 4,
                // "indent_char": " ",
                // "eol": "\n",
                // "indent_level": 0,
                // "indent_with_tabs": true,
                // "preserve_newlines": true,
                // "max_preserve_newlines": 10,
                // "jslint_happy": true,
                // "space_after_anon_function": true,
                // "brace_style": "collapse",
                // "keep_array_indentation": true,
                // "keep_function_indentation": true,
                // "space_before_conditional": true,
                // "break_chained_methods": true,
                // "eval_code": true,
                // "unescape_strings": true,
                // "wrap_line_length": 0,
                // "wrap_attributes": "auto",
                // "wrap_attributes_indent_size": 4,
                // "end_with_newline": true
            }))
            // .pipe(plugins.changed(dest))
            .pipe(gulp.dest(dest));
    });
}