const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();

const movieScheme = new Schema({ title: String, video: String }, { versionKey: false });
const albumScheme = new Schema({ title: String, audio: String, cover: String }, { versionKey: false });
const Movie = mongoose.model("Movie", movieScheme);
const Album = mongoose.model("Album", albumScheme);

app.use(express.static(__dirname));

mongoose.connect("mongodb://127.0.0.1/mediadb",
    { useUnifiedTopology: true, useNewUrlParser: true }, function (err) {
        if (err) return console.log(err);
        app.listen(5501, function () {
            console.log("Сервер ожидает подключения...");
        });
    });

app.get("/albums/:cover", function (req, res) {
    const cover = req.params.cover;
    Album.find({ cover: cover }, function (err, songs) {

        if (err) return console.log(err);
        res.send(songs);
    });
});

app.get("/movies/:video", function (req, res) {

    const video = req.params.video;
    Movie.findOne({ video: video }, function (err, movie) {

        if (err) return console.log(err);
        res.send(movie);
    });
});