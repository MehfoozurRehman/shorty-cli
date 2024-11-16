import axios from "axios";
import inquirer from "inquirer";
import ora from "ora";

const api = axios.create({
  baseURL: "https://shortyurl.up.railway.app",
});

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
    const questions = await inquirer.prompt([
      {
        type: "list",
        name: "option",
        choices: ["Shorten a url", "Find a url"],
      },
    ]);

    const { option } = questions;

    if (option === "Shorten a url") {
      colorize("Shortening a url", "green");

      const questions = await inquirer.prompt([
        {
          type: "input",
          name: "url",
          message: "Enter the url to shorten?",
        },
      ]);

      const { url } = questions;

      colorize(`The url to shorten is: ${url}`, "cyan");

      const spinner = ora("Shortening the url").start();

      const response = await api.post("/?url=" + url, {});

      if (response.data.error) {
        spinner.stop();
        colorize(response.data.error, "red");
        return;
      }

      spinner.stop();

      colorize(`The shortened url is: ${response.data.shortUrl}`, "yellow");
    }

    if (option === "Find a url") {
      colorize("Finding a url", "green");

      const questions = await inquirer.prompt([
        {
          type: "input",
          name: "url",
          message: "Enter the url to find",
        },
      ]);

      const { url } = questions;

      colorize(`The url to find is: ${url}`, "cyan");

      if (!url.includes("shortyurl.up.railway.app")) {
        colorize("The url you entered is not a shortened url", "red");
        return;
      }

      const spinner = ora("Finding the url").start();

      const response = await api.get(url + "?cli=true");

      console.log(response.data);

      if (response.data.error) {
        spinner.stop();
        colorize(response.data.error, "red");
        return;
      }

      spinner.stop();

      colorize(`The original url is: ${response.data.url}`, "yellow");
    }
  } catch (error) {
    colorize(error.message, "red");
  }
};

main();
