/* eslint-disable */
const sqlite3 = require('sqlite3'),
    Parser= require('json2csv'),
    userDB = new sqlite3.Database("./user1.db", 
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, 
    (err) => { 
        // do your thing 
    });

function SurveyData(){
    this.db = userDB
}

SurveyData.prototype.init = function(){
    this.db.serialize(() => {
        this.db.run(`CREATE TABLE IF NOT EXISTS survey (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nama TEXT,
            email TEXT,
            layanan TEXT,
            kepuasan INTEGER,
            saran TEXT
        )`)
        this.db.run(`CREATE TABLE IF NOT EXISTS homescreen (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            path
        )`)  
    })
}

SurveyData.prototype.insertWallpaper = function(path){
    this.db.serialize(()=>{
        let sql = `
            INSERT INTO homescreen (
                path
            )
            VALUES (
                "${path}"
            )
        `
        this.db.run(sql)
    })
}

SurveyData.prototype.deleteWallpaper = function(id){
    this.db.serialize(()=> {
        let sql = `
            DELETE FROM homescreen WHERE id = ${id}
        `
        this.db.run(sql)
    })
}

SurveyData.prototype.insertSurvey = function(survey){
    this.db.serialize(()=>{
        let sql = `
            INSERT INTO survey (
                nama,
                email,
                layanan,
                kepuasan,
                saran
            )
            VALUES (
                "${survey.nama}",
                "${survey.email}",
                "${survey.layanan}",
                ${survey.kepuasan},
                "${survey.saran}"
            )
        `
        this.db.run(sql)
    })
}

exports.survey = new SurveyData()
