const {promisify} = require('util');
const {glob} = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');
const { Client, Collection } = require("discord.js");
const client = new Client({intents:32767});
const config = require("./config.js");

client.commands = new Collection();

const {DisTube} = require('distube')
const {SpotifyPlugin} = require('@distube/spotify')

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    youtubeDL: false,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
})
module.exports = client

require('../Systems/giveawaySys')(client);

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.login(config.token);