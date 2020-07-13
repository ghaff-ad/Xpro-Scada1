// USER MANAGED VIEWS
// There are two types of user managed views: svg_user and html_user
// Location of user managed views is specified in the config.js file.
// "user_views_folder": "projects/views"
//
// User managed views are configured in the menu.json file in the specified views folder

// SVG USER VIEWS
// SVG user views consist of two files
// name_of_svg_view.svg : the svg file
// name_of_svg_view.js : optional javascript file to be loaded with the view
// the files can be located in the root or sub folders of the specified views folder



// HTML USER VIEWS
// HTML user views consist of four files
// name_of_html_view.html : the html file
// name_of_html_view.js : optional javascript file to be loaded with the view
// name_of_html_view.json : optional json data file to be rendered with the view
// name_of_html_view.render.js : optional javascript file to be handle initial rendering of the view

// the files can be located in the root or sub folders of the specified views folder

// Format of name_of_html_view.render.js
// the render js file must export a 'render' function with three parameters as below:

module.exports.render = function (edge, view, json) {

}

// edge: this is the view templating engine object (see https://edge.adonisjs.com for details)
// view: this is the content of the view name_of_html_view.html
// json: this is the content of the json file name_of_html_view.json

// the render function must return the html to be displayed

// Example
module.exports.render = function (edge, view, json) {
    return edge.renderString(view, {'data': json});
}




// CONFIGURATION
// menu.json

// menu.json must be located in the root of the specified views folder
// position: top or bottom
// path: relative path to view without the extension

/*
{
    "enabled": true,
    "position": "bottom",
    "views": [
    {
        "name": "HTML EXAMPLE",
        "description": "HTML DISPLAY",
        "path": "html/html1",
        "view_access": -1,
        "show": true,
        "show_description": true,
        "type": "html_user"
    },
    {
        "name": "SVG EXAMPLE",
        "description": "SVG DISPLAY",
        "path": "svg/svg1",
        "view_access": -1,
        "show": true,
        "show_description": true,
        "type": "svg_user"
    }
]
}
*/




// GLOBAL JAVASCRIPT AND CSS

// Global javascript and css files are loaded on the client side and available globally
// They must be placed in sub folders of the specified views folder as follows

// global/js : this is the sub folder for all global js files
// global/css : this is the sub folder for all global css files

// the files may be organised into sub folders within the  global/js and  global/css sub folders.

