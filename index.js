import express from "express";
import bodyParser from "body-parser";

const APP = express();
const WEIRD_NOUNS =
    "Epiphany Limerence Petrichor Serendipity Cynosure Quixotry Susurrus Raconteur Agog Reverie Zephyr Euphoria Soliloquy Seraphine Luminary Vesper Mirage Panacea Zenith Nebula";
const WEIRD_ADJECTIVES =
    "Ephemeral Luminous Serene Mellifluous Effervescent Verdant Ethereal Ineffable Winsome Radiant Nostalgic Vivid Sublime Feral Buoyant Lucid Placid Jovial Pristine Vibrant";
const NOUNS = WEIRD_NOUNS.split(" ");
const ADJECTIVES = WEIRD_ADJECTIVES.split(" ");
APP.use(bodyParser.urlencoded({ extended: true }));
APP.use(express.static("public"));

APP.get("/", (request, response) => {
    response.render("index.ejs");
});
APP.get("/name", (request, response) => {
    response.render("index.ejs", {BAND_NAME: createBandName()});
});

function createBandName() {
    const NAME_LENGTH = Math.floor(Math.random() * 2 + 2);
    const NAME = [];
    const INITIALS = [];
    for (let i = 0; i < NAME_LENGTH; i++) {
        if (i === NAME_LENGTH - 1) {
            NAME.push(NOUNS[Math.floor(Math.random() * NOUNS.length)]);
        } else {
            NAME.push(
                ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
            );
        }
    }

    for (let i = 0; i < NAME_LENGTH; i++) {
        INITIALS.push(NAME[i][0]);
    }
    const BAND_NAME = NAME.join(" ");
    let initials = `(${INITIALS.join(".")})`;
    return `${BAND_NAME} ${initials}`;
}
console.log(createBandName());

APP.listen(1510, () => {
    console.log("Server is currently listening at http://localhost:1510");
});
