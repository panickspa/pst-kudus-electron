/* eslint-disable */
const sqlite3 = require('sqlite3'),
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
