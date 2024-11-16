import inquirer from "inquirer";

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

const colorize = (text, color) =>
  console.log(colors[color] + text + colors.reset);

const main = async () => {
  try {
    colorize("Welcome to the project generator!", "cyan");
  } catch (error) {
    colorize(error.message, "red");
  }
};

main();
