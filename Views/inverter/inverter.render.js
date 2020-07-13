
module.exports.render = function (edge, view, json) {
    return edge.renderString(view, {'data': json});
}

