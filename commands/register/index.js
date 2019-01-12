const fs = require("fs");

const config = JSON.parse(fs.readFileSync(__basedir + "/bot_config.json"));
const helpers = require(__basedir + "/commands/helpers");
const user = require(__basedir + "/userModel");

const errmsg = helpers.error(
  "Sintaxis incorrecta",
  `Uso: **${
    config.prefix
  }register** <**@mención** | **id**> <**osu_user**> <**standard** | **mania**>`
);

function valid(arg) {
  if (arg.length !== 3) {
    console.log("length err");
    return false;
  }
  if (arg[2] !== "standard" && arg[2] !== "mania") {
    console.log("mode err");
    return false;
  }
  return true;
}

module.exports = (arg, msg) => {
  if (!msg.member.roles.has("530454438008061962")) {
    const error = helpers.error(
      "Sin permisos suficientes",
      "Solo los <@&530454438008061962> pueden usar este comando."
    );
    msg.channel.send(error);
    return;
  }

  if (!valid(arg)) {
    msg.channel.send(errmsg);
    return;
  }

  const discordId = helpers.parseMention(arg[0]);
  const osuUser = arg[1];
  const mode =
    arg[2] === "standard" ? "std" : arg[2] === "mania" ? "mania" : "";

  if (discordId === "error") {
    msg.channel.send(errmsg);
    return;
  }

  user
    .create({ discordId, osuUser, mode })
    .then(u => {
      const embed = helpers
        .success(
          "Usuario registrado",
          `El perfil para <@${discordId}> ha sido creado correctamente.`
        )
        .setThumbnail(
          "https://vrtize.com/wp-content/uploads/2016/08/new-account-icon-256x256.png"
        );
      msg.channel.send(embed);
    })
    .catch(err => {
      const embed = helpers.error(
        "Ha ocurrido un error",
        "Por favor contacta con <@173843781748129792> y reporta el bug."
      );
      msg.channel.send(embed);
    });
};
