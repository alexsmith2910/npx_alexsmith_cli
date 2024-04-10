#!/usr/bin/env node

"use strict";

import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";
import clear from "clear";
import open from "open";
// import fs from "fs";
// import request from "request";
// import path from "path";
// import ora from "ora";
// import cliSpinners from "cli-spinners";
clear();

const questions = [
  {
    type: "list",
    name: "action",
    message: "What you want to do?",
    choices: [
      {
        name: `Send me an ${chalk.green.bold("email")}?`,
        value: () => {
          open("mailto:ajs@alexandersmith.dev");
          console.log("\nSending you to your emails...\n");
        },
      },
      {
        name: `Download my ${chalk.magentaBright.bold("Resume")}? ${chalk.gray(
          "(under development)"
        )}`,
        value: () => {
          console.log("\nThis feature is still under development... sorry.\n");
          // // cliSpinners.dots;
          // const loader = ora({
          //   text: " Downloading Resume",
          //   spinner: cliSpinners.material,
          // }).start();
          // let pipe = request("https://alexandersmith.dev/api/resume").pipe(
          //   fs.createWriteStream("./alexsmith-resume.html")
          // );
          // pipe.on("finish", function () {
          //   let downloadPath = path.join(process.cwd(), "alexsmith-resume.html");
          //   console.log(`\nResume Downloaded at ${downloadPath} \n`);
          //   open(downloadPath);
          //   loader.stop();
          // });
        },
      },
      {
        name: "Close",
        value: () => {
          console.log("Goodbye! See you again soon.\n");
          return 1;
        },
      },
    ],
  },
];

const data = {
  name: chalk.bold.red("              Alexander James Smith"),
  handle: chalk.white("@alexsmith2910"),
  work: `${chalk.white("Currently, ") + chalk.blueBright("looking for work.")}`,
  github:
    chalk.gray("https://github.com/") + chalk.blue.italic("alexsmith2910"),
  linkedin:
    chalk.gray("https://linkedin.com/in/") +
    chalk.cyan.italic("alex-smith-dev"),
  web: chalk.yellowBright.italic("https://www.alexandersmith.dev/"),
  npx: chalk.redBright("npx") + " " + chalk.white("alexsmith"),

  labelWork: chalk.white.bold("Work:"),
  labelGitHub: chalk.white.bold("GitHub    :"),
  labelLinkedIn: chalk.white.bold("LinkedIn  :"),
  labelWeb: chalk.white.bold("Website   :"),
  labelCard: chalk.white.bold("Card:"),
};

const me = boxen(
  [
    `${data.name}`,
    ``,
    `${data.labelWork}  ${data.work}`,
    ``,
    `${data.labelGitHub}  ${data.github}`,
    `${data.labelLinkedIn}  ${data.linkedin}`,
    `${data.labelWeb}  ${data.web}`,
    ``,
    `${data.labelCard}  ${data.npx}`,
    ``,
    `${chalk.italic("I am currently looking for new opportunities,")}`,
    `${chalk.italic("my inbox is always open. Whether you have a")}`,
    `${chalk.italic("question or just want to say hi, I will get")}`,
    `${chalk.italic("back to you soon!")}`,
  ].join("\n"),
  {
    margin: 1,
    float: "center",
    padding: 2,
    borderStyle: "round",
    borderColor: "red",
  }
);

console.log(me);
const tip = [
  `Tip: Try ${chalk.cyanBright.bold("cmd/ctrl + click")} on the links above`,
  "",
].join("\n");
console.log(tip);

function prompt_inquirer() {
  inquirer
    .prompt(questions)
    .then((answer) => {
      try {
        let ans = answer.action();
        if (ans == 1) return;
        prompt_inquirer();
      } catch (error) {
        console.log("");
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log(
          "This feature does not work in the current terminal enviroment!"
        );
      } else {
        console.log("\n");
      }
    });
}

prompt_inquirer();
