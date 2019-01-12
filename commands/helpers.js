const Discord = require("discord.js");
const fs = require("fs");

const levelExp = JSON.parse(fs.readFileSync("commands/level_exp.json"));
const levelName = JSON.parse(fs.readFileSync("commands/level_name.json"));
const levelBadge = JSON.parse(fs.readFileSync("commands/level_badge.json"));

const helpers = {
  parseMention(x) {
    if (/^<@[0-9]+>$/.test(x)) {
      id = x.replace(/<@/, "").replace(/>/, "");
      return id;
    } else if (/^<@![0-9]+>$/.test(x)) {
      id = x.replace(/<@!/, "").replace(/>/, "");
      return id;
    } else if (/[0-9]+/.test(x)) {
      return x;
    } else {
      return "error";
    }
  },

  embed() {
    return new Discord.RichEmbed()
      .setColor(0xff5430)
      .setFooter("© Osu!Crew || 2.0");
  },

  success(title, text) {
    return this.embed()
      .setColor(0x2be56e)
      .addField(title, text);
  },

  error(title, text) {
    return this.embed()
      .setColor(0xffdd30)
      .addField(title, text);
  },

  profile(u, msg) {
    const level = this.calcLevel(u.exp);
    const totalExp = this.getLevelExp(Number(level) + 1);

    return this.embed()
      .setColor(0xff5430)
      .setAuthor(msg.author.username, msg.author.avatarURL)
      .setThumbnail(this.getLevelBadge(level))
      .addField(`**Nivel: 🏅**`, this.getLevelName(level), true)
      .addField(`**Experiencia: ✨**`, `${this.formatNumber(u.exp)}`, true)
      .addField(
        `**Modo de juego:**`,
        `${u.mode === "std" ? "Standard" : "Mania"}`,
        true
      )
      .addField(`**Quests completadas:**`, u.quests, true);
  },

  calcLevel(exp) {
    var level = 0;
    for (let l in levelExp) {
      if (exp >= levelExp[l]) {
        level = l;
      }
    }
    return level;
  },

  getLevelName(level) {
    return levelName[level];
  },

  getLevelExp(level) {
    return levelExp[level];
  },

  getLevelBadge(level) {
    return levelBadge[level];
  },

  formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};

module.exports = helpers;
