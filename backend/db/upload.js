import sqlite3 from "sqlite3";
import fs from "fs";
import xml2js from "xml2js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sql3 = sqlite3.verbose();
const parser = new xml2js.Parser();
const db = new sql3.Database(
  path.join(__dirname, "./jbq.db"),
  sqlite3.OPEN_READWRITE,
  connected
);

function connected(err) {
  if (err) {
    console.error(err.message);
    return;
  } else {
    console.log("Connected to the database.");
  }
}

let sql = `CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    clicked TEXT NOT NULL
);`;

let sql2 = `CREATE TABLE IF NOT EXISTS contestants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER NOT NULL
);`;

let sql4 = `CREATE TABLE IF NOT EXISTS currentQuestion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL DEFAULT 'Awaiting for question...',
    answer TEXT NOT NULL DEFAULT 'Awaiting for answer...'
);`;

let sql5 = `INSERT INTO currentQuestion (question, answer)
  SELECT 'Awaiting question', 'Awaiting answer'
  WHERE NOT EXISTS (SELECT 1 FROM currentQuestion);`;


db.run(sql, [], (err) => {
  if (err) {
    console.error(err.message);
    return;
  } else {
    console.log("questions table created.");
  }
});

db.run(sql2, [], (err) => {
  if (err) {
    console.error(err.message);
    return;
  } else {
    console.log("contestants table created.");
  }
});

db.run(sql4, [], (err) => {
  if (err) {
    console.error(err.message);
    return;
  } else {
    console.log("currentQuestion table created.");
  }
});

db.run(sql5, [], (err) => {
  if (err) {
    console.error(err.message);
    return;
  } else {
    console.log("currentQuestion table Initialised.");
  }
});


function query_run(q) {
  return new Promise((resolve, reject) => {
    db.run(q, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
}

fs.readFile(path.join(__dirname, "questions.xml"), "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  parser.parseString(data, async (err, result) => {
    if (err) {
      console.error("Error parsing XML:", err);
      return;
    }

    for (let question of result.root.question) {
      let q = question.text[0].trim().replace(/'/g, "''");
      let a = question.answer[0].trim().replace(/'/g, "''");
      try {
        await query_run(
          `INSERT INTO questions (question, answer, clicked) VALUES ('${q}', '${a}', 'false')`
        );
      } catch (error) {
        console.error("Error inserting question:", error);
      }
      console.log(question.answer[0].trim());
    }
  });
});

fs.readFile(path.join(__dirname, "contestants.xml"), "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  parser.parseString(data, async (err, result) => {
    if (err) {
      console.error("Error parsing XML:", err);
      return;
    }

    for (let contestant of result.root.contestant) {
      let q = contestant.name[0].trim().replace(/'/g, "''");
      let a = contestant.score[0].trim().replace(/'/g, "''");
      try {
        await query_run(
          `INSERT INTO contestants (name, score) VALUES ('${q}', '${a}')`
        );
      } catch (error) {
        console.error("Error inserting question:", error);
      }
      console.log(contestant.name[0].trim());
    }
  });
});
