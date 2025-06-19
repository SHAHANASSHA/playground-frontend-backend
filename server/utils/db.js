import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class JSONDB {
 constructor(name) {
  this.dbname = name;
  this.dbpath = `/db/${name}.json`
  if (!fs.existsSync(this.dbpath)) {
   fs.writeFileSync(this.dbpath, "[]");
  }
  this.db = JSON.parse(fs.readFileSync(this.dbpath, "utf-8"));
 }

 write(obj) {
  const id = uuidv4();
  this.db.push({ _id: id, createdAt: Date.now().toString(), ...obj });
  fs.writeFileSync(this.dbpath, JSON.stringify(this.db));
  return { msg: "Write success", id }
 }

 writeMany(objs) {
  const result = objs.map(obj => {
   const id = uuidv4();
   this.db.push({ _id: id, createdAt: Date.now().toString(), ...obj });
   fs.writeFileSync(this.dbpath, JSON.stringify(this.db));
   return id;
  });
  return { msg: "Write success", ids: [...result] }
 }

 read(id) {
  return this.db.find(e => e._id === id);
 }

 find(filter) {
  return this.db.find(e => Object.entries(filter).reduce((a, b) => a && e[b[0]] === b[1], true));
 }

 findMany(filter) {
  return this.db.filter(e => Object.entries(filter).reduce((a, b) => a && e[b[0]] === b[1], true));
 }

 readAll() {
  return this.db;
 }

 deleteOne(id) {
  this.db = this.db.filter(e => e._id != id);
  fs.writeFileSync(this.dbpath, JSON.stringify(this.db));
 }

 deleteByField(key, value) {
  this.db = this.db.filter(e => e[key] != value);
  fs.writeFileSync(this.dbpath, JSON.stringify(this.db));
 }

 update(id, data) {
  this.db = this.db.map(e => e._id === id ? { ...e, ...data, _id: e._id } : e)
  fs.writeFileSync(this.dbpath, JSON.stringify(this.db));
  return { msg: "Update success", id }
 }
}

export default JSONDB;