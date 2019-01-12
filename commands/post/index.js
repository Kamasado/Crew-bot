const fs = require("fs");

const config = JSON.parse(fs.readFileSync(__basedir + "/bot_config.json"));
const helpers = require(__basedir + "/commands/helpers");
const user = require(__basedir + "/userModel");

const errmsg = helpers.error(
  "Sintaxis incorrecta",
  `Uso: **${config.prefix}post** <**titulo**> <**contenido**>`
);

function valid(arg) {
  if (arg.length !== 2) {
    return false;
  }

  return true;
}

module.exports = (arg, msg) => {
  if (!valid(arg)) {
    msg.channel.send(errmsg);
    return;
  }

  const titulo = arg[0];
  const contenido = arg[1];

  msg.delete();
  const post = helpers.embed().addField(titulo, contenido);
  msg.channel.send(post);
};
