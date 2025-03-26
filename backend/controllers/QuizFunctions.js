import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import path from "path";

const sql3 = sqlite3.verbose();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = new sql3.Database(path.join(__dirname, "./jbq.db"), sql3.OPEN_READWRITE);

export const query = (query) => {
  return new Promise((resolve, reject) => {
    db.all(query, (err, resp) => {
      if (err) {
        reject(err);
      }
      resolve(resp);
    });
  });
};

export const query_one = (query) => {
    return new Promise((resolve, reject) => {
        db.get(query, (err, resp) => {
        if (err) {
            reject(err);
        }
        resolve(resp);
        });
    });
};

export const query_run = (query) => {
    return new Promise((resolve, reject) => {
        db.run(query, (err, resp) => {
        if (err) {
            reject(err);
        }
        resolve(resp);
        });
    });
}

export const get_qids = (list = []) => {
    return list.map((item) => item.qid);
}