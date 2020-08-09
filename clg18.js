const readline = require('readline');
const sqlite3 = require('sqlite3').verbose();
const Table = require('cli-table')
const dbfile = "./university.db"
const db = new sqlite3.Database(dbfile);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class mahasiswa {
    constructor() {
        this.access = ""
        this.name = ""
        this.level = ""
    }
    logIn() {
        let that = this
        console.log('==================================================================================================')
        rl.question("username :", (user) => {
            rl.question("password :", function (pass) {
                let username = user.trim()
                let trimedpass = pass.trim()
                console.log(typeof trimedpass)
                db.serialize(function () {
                    let query = `SELECT * FROM user WHERE nama_user = ?`

                    db.get(query, [username], (err, rows) => {
                        if (err) {
                            throw err
                        }
                        if (!rows) {
                            console.log('username tidak ditemukan')
                            that.logIn()
                        } else if (rows.pasword === Number(trimedpass)) {
                            that.nama = username
                            that.level = rows
                            that.mainmenu()
                        } else {
                            console.log("pasword yang anda masukkan salah")
                            that.logIn()
                        }
                    });
                });
            })
        })
    }
    mainmenu(){
        let that = this
        console.log('==================================================================')
        console.log(`welcome ${that.nama}, your access level is Admin`)
        console.log('silahkan pilih opsi dibawah ini \n[1]mahasiswa\n[2]jurusan\n[3]dosen\n[4]matakuliah\n[5]kontrak\n[6]keluar')
        console.log('======================================================================================================')
        rl.question('masukkan salah satu dari opsi  diatas :', (answer) =>{
            let choice = answer.trim()
            if (choice === '1'){
            that.access = 'mahasiswa'
            that.universityAccess()
            }
            else if (choice === '2'){
                that.access = 'jurusan'
                that.universityAccess()
            }
            else if (choice === '3'){
                that.access = 'dosen'
                that.universityAccess()
            }
            else if (choice ==='4'){
                that.access = 'matakuliah'
                that.universityAccess()
            }
            else if ( choice === '5'){
                console.log('yay')
                that.access = 'kontrak'
                that.universityAccess()
            }
            else {
                console.log('============================================================')
                console.log('kamu telah keluar')
                rl.close()
            }
        })
    }
    fiturmahasiswa(){
        console.log('silahkan pilih opsi dibawah ini \n[1]daftar murid\n[2]cari murid\n[3]tambah murid\n[4]hapus murid\n[5]kembali')
        console.log('===============================================================================================================')

    }
    fiturdosen(){
        console.log('silahkan pilih opsi dibawah ini\n[1]daftar dosen\n[2]cari dosen\n[3]tambah dosen\n[4]hapus dosen\n[5]kembali')
        console.log('=============================================================================================================')

    }
    fiturjurusan(){
        console.log('silahkan pilih opsi dibawah ini\n[1]daftar jurusan\n[2]cari jurusan\n[3]tambah jurusan\n[4]hapus jurusan\n[5]kembali')
        console.log('==============================================================================================================')

    }
    fiturmatakuliah(){
        console.log('silahkan pilih opsi dibawah ini\n[1]daftar matakuliah\n[2]cari matakuliah\n[3]tambah matakuliah\n[4]hapus matakuliah\n[5]kembali')
        console.log('=============================================================================================================')

    }
    fiturkontrak(){
        console.log('silahkan pilih opsi diawah ini\n[1]daftar krs\n[2]cari krs\n[3]tambah krs\n[4]hapus krs\n[5]kembali')
        console.log('=====================================================================================================')

    }
    universityAccess(){
        let that = this

        if (that.access === 'mahasiswa') this.fiturmahasiswa()
        if (that.access === 'dosen') this.fiturdosen()
        if (that.access === 'jurusan') this.fiturjurusan()
        if (that.access === 'matakuliah') this.fiturmatakuliah()
        if (that.access === 'kontrak') this.fiturkontrak()

        rl.question('masukkan salah satu dari opsi  diatas :', (answer) =>{
            let choice = answer.trim()
            if (choice === '1'){
                that.getAll()
            }
            else if (choice === '2'){
                that.search()
            }
            else if (choice === '3'){
                that.insertData()
            }
            else if (choice === '4'){
                that.deleteData()
            }
            else if (choice === '5'){
                that.mainMenu()
            }
        });
    }
    getAll(){
        let that = this
        if (that.access === 'mahasiswa'){
            db.serialize(function (){
                let sql = 'SELECT * FROM mahasiswa'
                var table = new Table({
                    head: ['nim', 'nama', 'alamat', 'jurusan']
                  , colWidths: [20, 20, 30, 20]
                });
                db.all(sql, (err, rows) =>{

                    if (err) throw err
                    if (rows){
                        rows.forEach(row => {
                            table.push([row.nim, row.nama_mhs, row.alamat, row.jurusan])
                        })
                        console.log('===========================================================================')
                        console.log(table.toString())
                        that.universityAccess()
                    }else{
                        console.log('tidak ada hasil')
                    }
                })
            })
        } if (that.access === 'dosen'){
            db.serialize(function (){
                let sql = 'SELECT * FROM dosen'
                var table = new Table({
                    head: ['no.id', ' nama dosen']
                  , colWidths: [10, 20]
                });
                db.all(sql, (err, rows) =>{

                    if (err) throw err
                    if (rows){
                        rows.forEach(row => {
                            table.push([row.id_dosen, row.nama_dosen])
                        })
                        console.log('===========================================================================')
                        console.log(table.toString())
                        that.universityAccess()
                    }else{
                        console.log('tidak ada hasil')
                    }
                })
            })
        } if (that.access === 'jurusan'){
            db.serialize(function (){
                let sql = 'SELECT * FROM jurusan'
                var table = new Table({
                    head: ['id.jurusan', 'nama jurusan']
                  , colWidths: [15, 20]
                });
                db.all(sql, (err, rows) =>{

                    if (err) throw err
                    if (rows){
                        rows.forEach(row => {
                            table.push([row.id_jurusan, row.nama_jurusan])
                        })
                        console.log('===========================================================================')
                        console.log(table.toString())
                        that.universityAccess()
                    }else{
                        console.log('tidak ada hasil')
                    }
                })
            })
        } if (that.access === 'matakuliah'){
            db.serialize(function (){
                let sql = 'SELECT * FROM matakuliah'
                var table = new Table({
                    head: ['id.matakuliah', 'nama mata kuliah', 'sks']
                  , colWidths: [15, 20, 10]
                });
                db.all(sql, (err, rows) =>{

                    if (err) throw err
                    if (rows){
                        rows.forEach(row => {
                            table.push([row.id_mk, row.nama_mk, row.sks])
                        })
                        console.log('===========================================================================')
                        console.log(table.toString())
                        that.universityAccess()
                    }else{
                        console.log('tidak ada hasil')
                    }
                })
            })
        }  if (that.access === 'kontrak'){
            db.serialize(function (){
                let sql = 'SELECT * FROM krs'
                var table = new Table({
                    head: ['no.krs', 'nilai', 'id.mahasiswa', 'id.dosen', 'id.matakuliah']
                  , colWidths: [10, 10, 10, 10, 10]
                });
                db.all(sql, (err, rows) =>{

                    if (err) throw err
                    if (rows){
                        rows.forEach(row => {
                            table.push([row.no_krs, row.nilai, row.mahasiswa, row.dosen, row.matakuliah])
                        })
                        console.log('===========================================================================')
                        console.log(table.toString())
                        that.universityAccess()
                    }else{
                        console.log('tidak ada hasil')
                    }
                })
            })
        }
    }
    
   
    
   
    search(){
        let that = this
        if (that.access === 'mahasiswa'){
            console.log('=============================================================================================')
            rl.question('masukkan nim :', (answer) =>{
                db.serialize(function () {
                    let query = 'SELECT * FROM mahasiswa WHERE nim = ?'
                    db.get(query, [answer.trim()], (err, rows) => {
                        if (err) throw err
                        if (rows){
                            console.log(rows)
                            const {nim, nama_mhs, alamat, jurusan} = rows
                            console.log('=====================================================================')
                            console.log('student details')
                            console.log('==========================================================================')
                            console.log(`id       :${nim}         nama mahasiswa      :${nama_mhs}        alamat         :${alamat}        jurusan       :${jurusan}`)
                            console.log('===================================================================================')
                            that.universityAccess()
                        }else{
                            console.log(`mahasiswa dengan nim ${answer} tidak ditemukan`)
                            that.search()
                        }

                    })
             
               })
            })
        }if (that.access === 'jurusan'){
            console.log('=============================================================================================')
            rl.question('masukkan id.jurusan :', (answer) =>{
                db.serialize(function () {
                    let query = 'SELECT * FROM jurusan WHERE id_jurusan = ?'
                    db.get(query, [answer.trim()], (err, rows) => {
                        if (err) throw err
                        if (rows){
                            console.log(rows)
                            const {id_jurusan, nama_jurusan} = rows
                            console.log('=====================================================================')
                            console.log('jurusan details')
                            console.log('==========================================================================')
                            console.log(`id.jurusan      :${id_jurusan}         jurusan       :${nama_jurusan}`)
                            console.log('===================================================================================')
                            that.universityAccess()
                        }else{
                            console.log(`jurusan dengan id.${answer} tidak ditemukan`)
                            that.search()
                        }

                    })
             
               })
            })
        }if (that.access === 'dosen'){
            console.log('=============================================================================================')
            rl.question('masukkan id.dosen :', (answer) =>{
                db.serialize(function () {
                    let query = 'SELECT * FROM dosen WHERE id_dosen = ?'
                    db.get(query, [answer.trim()], (err, rows) => {
                        if (err) throw err
                        if (rows){
                            console.log(rows)
                            const {nama_dosen, id_dosen} = rows
                            console.log('=====================================================================')
                            console.log('dosen details')
                            console.log('==========================================================================')
                            console.log(`id       :${id_dosen}         nama mahasiswa      :${nama_dosen}`)
                            console.log('===================================================================================')
                            that.universityAccess()
                        }else{
                            console.log(`dosen dengan id.${answer} tidak ditemukan`)
                            that.search()
                        }

                    })
             
               })
            })
        }if (that.access === 'matakuliah'){
            console.log('=============================================================================================')
            rl.question('masukkan id.matakuliah :', (answer) =>{
                db.serialize(function () {
                    let query = 'SELECT * FROM matakuliah WHERE id_mk = ?'
                    db.get(query, [answer.trim()], (err, rows) => {
                        if (err) throw err
                        if (rows){
                            console.log(rows)
                            const {id_mk, nama_mk, sks} = rows
                            console.log('=====================================================================')
                            console.log('student details')
                            console.log('==========================================================================')
                            console.log(`id       :${id_mk}         nama matakuliah      :${nama_mk}     sks     :${sks}  `)
                            console.log('===================================================================================')
                            that.universityAccess()
                        }else{
                            console.log(`matakuliah dengan id.${answer} tidak ditemukan`)
                            that.search()
                        }

                    })
             
               })
            })
        } if (that.access === 'kontrak'){
            console.log('=============================================================================================')
            rl.question('masukkan no.krs :', (answer) =>{
                db.serialize(function () {
                    let query = 'SELECT * FROM krs WHERE no_krs = ?'
                    db.get(query, [answer.trim()], (err, rows) => {
                        if (err) throw err
                        if (rows){
                            console.log(rows)
                            const {no_krs, nilai, mahasiswa, dosen, matakuliah} = rows
                            console.log('=====================================================================')
                            console.log('student details')
                            console.log('==========================================================================')
                            console.log(`no.krs     :${no_krs}        nilai       :${nilai}       mahasiswa      :${mahasiswa}         dosen     :${dosen}          matakuliah        :${matakuliah}`)
                            console.log('===================================================================================')
                            that.universityAccess()
                        }else{
                            console.log(`kontrak dengan no.${answer} tidak ditemukan`)
                            that.search()
                        }

                    })
             
               })
            })
        }
    }

    insertData(){
        let that = this
        if (that.access === 'mahasiswa'){
            console.log('=============================================================================================')
            console.log('lengkapi data dibawah ini:')
            rl.question('NIM:', (answer1) =>{
                rl.question('Nama:', (answer2) =>{
                    rl.question('Alamat:', (answer3) =>{
                        rl.question('Jurusan:', (answer4) =>{
                            rl.question('umur:', (answer5) =>{

                            db.serialize(function (){
                                let sql = 'INSERT INTO mahasiswa (nim, nama_mhs, alamat, jurusan, umur) values (?,?,?,?,?)';
                                db.run(sql,[answer1, answer2, answer3, answer4, answer5], (err) => {
                                    if (err) throw err;
                                });
                            })
                            that.getAll()
                           });
                        });
                    });
                });
           });
        }if (that.access === 'jurusan'){
            console.log('=============================================================================================')
            console.log('lengkapi data dibawah ini:')
            rl.question('id.jurusan:', (answer1) =>{
                rl.question('Nama jurusan:', (answer2) =>{
                  
                            db.serialize(function (){
                                let sql = 'INSERT INTO jurusan (id_jurusan, nama_jurusan) values (?,?)';
                                db.run(sql,[answer1, answer2], (err) => {
                                    if (err) throw err;
                                });
                            })
                            that.getAll()
                       
                });
           });
        }if (that.access === 'dosen'){
            console.log('=============================================================================================')
            console.log('lengkapi data dibawah ini:')
            rl.question('Nama dosen:', (answer1) =>{
                rl.question('id.dosen:', (answer2) =>{
                   
                            db.serialize(function (){
                                let sql = 'INSERT INTO dosen (nama_dosen, id_dosen) values (?,?)';
                                db.run(sql,[answer1, answer2], (err) => {
                                    if (err) throw err;
                                });
                            })
                            that.getAll()
                  
                });
           });
        }if (that.access === 'matakuliah'){
            console.log('=============================================================================================')
            console.log('lengkapi data dibawah ini:')
            rl.question('id.mahasiswa:', (answer1) =>{
                rl.question('matakuliah:', (answer2) =>{
                    rl.question('jumlah sks:', (answer3) =>{
                        
                            db.serialize(function (){
                                let sql = 'INSERT INTO matakuliah (id_mk, nama_mk, sks) values (?,?,?)';
                                db.run(sql,[answer1, answer2, answer3], (err) => {
                                    if (err) throw err;
                                });
                            })
                            that.getAll()
                       
                    });
                });
           });
        }if (that.access === 'kontrak'){
            console.log('=============================================================================================')
            console.log('lengkapi data dibawah ini:')
            rl.question('no.krs:', (answer1) =>{
                rl.question('nilai:', (answer2) =>{
                    rl.question('id.mahasiswa:', (answer3) =>{
                        rl.question('id.dosen:', (answer4) =>{
                            rl.question('id.matakuliah:', (answer5) =>{

                            db.serialize(function (){
                                let sql = 'INSERT INTO krs (no_krs, nilai, mahasiswa, dosen, matakuliah) values (?,?,?,?,?)';
                                db.run(sql,[answer1, answer2, answer3, answer4, answer5], (err) => {
                                    if (err) throw err;
                                });
                            })
                            that.getAll()
                           });
                        });
                    });
                });
           });
        }
    }

    deleteData(){
        let that = this
        if (that.access === 'mahasiswa'){
            console.log('=====================================================================')
            rl.question('masukan nim mahasiswa yang akan dihapus:', (answer) =>{
                db.serialize(function(){
                    let sql = 'DELETE FROM mahasiswa WHERE nim = ?'
                    db.run(sql, [answer.trim()], (err)=> {
                        if(!err){
                            console.log(`mahasiswa dengan nim ${answer} telah di hapus`)
                        }else if (err){
                            console.log(`mahasiswa denan nim.${answer} tidak ditemukan`)
                            throw err
                        }
                        that.getAll()
                    })
                })
            })
        }
        if (that.access === 'jurusan'){
            console.log('=====================================================================')
            rl.question('masukan id jurusan yang akan dihapus:', (answer) =>{
                db.serialize(function(){
                    let sql = 'DELETE FROM jurusan WHERE id_jurusan = ?'
                    db.run(sql, [answer.trim()], (err)=> {
                        if(!err){
                            console.log(`jurusan dengan id.${answer} telah di hapus`)
                        }else if (err){
                            throw err
                        }
                    })
                    that.getAll()
                })
            })
        }
        if (that.access === 'dosen'){
            console.log('=====================================================================')
            rl.question('masukan id dosen yang akan dihapus:', (answer) =>{
                db.serialize(function(){
                    let sql = 'DELETE FROM dosen WHERE id_dosen = ?'
                    db.run(sql, [answer.trim()], (err)=> {
                        if(!err){
                            console.log(`dosen dengan id.${answer} telah di hapus`)
                        }else if (err){
                            throw err
                        }
                    })
                    that.getAll()
                })
            })
        }
        if (that.access === 'matakuliah'){
            console.log('=====================================================================')
            rl.question('masukan id matakuliah yang akan dihapus:', (answer) =>{
                db.serialize(function(){
                    let sql = 'DELETE FROM matakuliah WHERE id_mk = ?'
                    db.run(sql, [answer.trim()], (err)=> {
                        if(!err){
                            console.log(`matakuliah dengan id.${answer} telah di hapus`)
                        }else if (err){
                            throw err
                        }
                    })
                    that.getAll()
                })
            })
        }
        if (that.access === 'kontrak'){
            console.log('=====================================================================')
            rl.question('masukan id kontrak yang akan dihapus:', (answer) =>{
                db.serialize(function(){
                    let sql = 'DELETE FROM krs WHERE no_krs = ?'
                    db.run(sql, [answer.trim()], (err)=> {
                        if(!err){
                            console.log(`kontrak dengan no.${answer} telah di hapus`)
                        }else if (err){
                            throw err
                        }
                    })
                    that.getAll()
                })
            })
        }
        
    }

    mainMenu(){
        let that = this
        if (that.access === 'mahasiswa'){
            console.log('===========================================================')
        }
        if (that.access === 'jurusan'){
            console.log('===========================================================')
        }
        if (that.access === 'matakuliah'){
            console.log('===========================================================')
        }
        if (that.access === 'dosen'){
            console.log('===========================================================')
        }
        if (that.access === 'kontrak'){
            console.log('===========================================================')
        }
       that.mainmenu()
    }
    

   
}


const campus =new mahasiswa()

campus.logIn()