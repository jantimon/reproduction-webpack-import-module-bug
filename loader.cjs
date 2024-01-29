module.exports = function (source) {
    const callback = this.async();
    this.importModule('./banner.ts', {
        layer: "banner-loader"
    }, function (err, result) {

        if (err) return callback(err);

        console.log({
            result
        })

        callback(null, (result?.banner || "") + source);
    });

}