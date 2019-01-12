const shell = require("shelljs");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync(__basedir + "/bot_config.json"));
const helpers = require(__basedir + "/commands/helpers");

const errmsg = helpers.error(
  "Sintaxis incorrecta",
  `Uso: **${config.prefix}system update**`
);

function valid(arg) {
  if (arg.length !== 0) {
    return false;
  }
  return true;
}

module.exports = (arg, msg) => {
  if (!valid(arg)) {
    msg.channel.send(errmsg);
    return;
  }

  success = helpers.success("Sistema", "Actualizando archivos...");

  shell.exec("git pull");
  msg.channel.send(success).then(() => process.exit());
};
