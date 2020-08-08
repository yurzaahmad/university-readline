
CREATE TABLE mahasiswa (
    nim INT PRIMARY KEY NOT NULL,
    nama_mhs TEXT NOT NULL,
    alamat text NOT NULL,
    jurusan int  NOT NULL,
    umur INT NOT NULL,
    FOREIGN KEY (jurusan) REFERENCES jurusan(id_jurusan)
);
INSERT INTO mahasiswa (nim, nama_mhs, alamat, jurusan, umur ) values (1231, "bambang", "bogor", 1021, 19 ), (1232, "arie", "medan", 1023, 22), (1233, "hasbi", "jogja", 0022, 19), (1234, "fasya", "cianjur", 1024, 23);

CREATE TABLE jurusan (
    id_jurusan INT PRIMARY KEY NOT NULL,
    nama_jurusan TEXT NOT NULL
);
INSERT INTO jurusan (nama_jurusan, id_jurusan) values ("pertanian", 0021), ("ilkom", 0022), ("perkebunan", 0023), ("perikanan", 0024);

CREATE TABLE dosen (
    nama_dosen TEXT NOT NULL,
    id_dosen INT PRIMARY KEY NOT NULL
);
INSERT INTO dosen (nama_dosen, id_dosen) 
values ("subagja", "0123"), ("imam", "0124"), ("eko", "0125"), ("dimas", "0126");

CREATE TABLE matakuliah (
    id_mk INT PRIMARY KEY NOT NULL,
    nama_mk TEXT NOT NULL,
    sks  VARCHAR(50) NOT NULL
);

INSERT INTO matakuliah (id_mk, nama_mk, sks) values (51097, "biologi", "4"), (51098, "psikologi", "3"),
(51095, "datamining", "3"), (51096, "matematika", "3"), (51099, "fisika", "3");

CREATE TABLE krs (
    no_krs INT PRIMARY KEY NOT NULL,
    nilai CHAR(2) NOT NULL,
    mahasiswa INT NOT NULL,
    dosen INT NOT NULL,
    matakuliah INT NOT NULL,
    FOREIGN KEY (mahasiswa) REFERENCES mahasiswa(nim),
    FOREIGN KEY (dosen) REFERENCES dosen(id_dosen),
    FOREIGN KEY (matakuliah) REFERENCES matakuliah(id_mk)
);

INSERT INTO krs (no_krs, nilai, mahasiswa, dosen, matakuliah) values (1, "B", "0231", "0123", "5196"), (2, "D", "0232", "0124", "5197"), (3, "A", "0233", "0125", "5198"), (4, "D", "0234", "0126", "5198"), (5, "C", "0231", "0126", "5198"), (6, "D", "0232", "0125", "5198"), (7, "B", "0231", "0123", "5195"), (8, "D", "0232", "0123", "5195"), (9, "A", "0231", "0123", "5195")


CREATE TABLE user (
   pasword INT PRIMARY KEY NOT NULL,
   nama_user TEXT NOT NULL
);

INSERT INTO user (pasword, nama_user) values (12345, 'yurza')
sqlite> SELECT mahasiswa.nama_mhs, jurusan.nama_jurusan
   ...> from mahasiswa join jurusan on mahasiswa.jurusan = jurusan.id_jurusan;
nama_mhs    nama_jurusan
----------  ------------
bambang     pertanian   
arie        perkebunan  
hasbi       ilkom       
fasya       perikanan   


sqlite> select * from mahasiswa
   ...> where umur < 20;
nim         nama_mhs    alamat      jurusan     umur      
----------  ----------  ----------  ----------  ----------
231         bambang     bogor       21          19        
233         hasbi       jogja       22          19     


sqlite> select * from krs
   ...> where nilai = "A";
no_krs      nilai       mahasiswa   dosen       matakuliah
----------  ----------  ----------  ----------  ----------
3           A           233         125         5198      
9           A           231         123         5195   


sqlite> select mahasiswa.nama_mhs, SUM(matakuliah.sks) AS total_sks
   ...> FROM((mahasiswa JOIN krs ON mahasiswa.nim = krs.mahasiswa)
   ...> JOIN matakuliah ON krs.matakuliah = matakuliah.id_mk)
   ...> GROUP BY mahasiswa.nama_mhs
   ...> HAVING total_sks > 10;
nama_mhs    total_sks 
----------  ----------
bambang     12        


sqlite> SELECT mahasiswa.nama_mhs AS mahasiswa_datamining, mahasiswa.nim, krs.nilai
   ...> FROM ((mahasiswa JOIN krs ON mahasiswa.nim = krs.mahasiswa)
   ...> JOIN matakuliah ON krs.matakuliah = matakuliah.id_mk)
   ...> WHERE matakuliah.nama_mk = "datamining";
mahasiswa_datamining  nim         nilai     
--------------------  ----------  ----------
bambang               231         B         
arie                  232         D         
bambang               231         A         


sqlite> SELECT dosen.nama_dosen, COUNT(krs.mahasiswa) AS jumlah_mahasiswa
   ...> FROM dosen JOIN krs ON dosen.id_dosen = krs.dosen
   ...> GROUP BY dosen.nama_dosen;
nama_dosen  jumlah_mahasiswa
----------  ----------------
dimas       2               
eko         2               
imam        1               
subagja     4           


sqlite> select * from mahasiswa
   ...> ORDER BY umur;
nim         nama_mhs    alamat      jurusan     umur      
----------  ----------  ----------  ----------  ----------
231         bambang     bogor       21          19        
233         hasbi       jogja       22          19        
232         arie        medan       23          22        
234         fasya       cianjur     24          23  


sqlite> SELECT mahasiswa.nama_mhs AS mengulang, krs.nilai, dosen.nama_dosen, matakuliah.nama_mk, jurusan.nama_jurusan
   ...> FROM(mahasiswa JOIN krs on mahasiswa.nim = krs.mahasiswa)
   ...> JOIN dosen ON krs.dosen = id_dosen
   ...> JOIN matakuliah ON krs.matakuliah = matakuliah.id_mk
   ...> JOIN jurusan ON mahasiswa.jurusan = jurusan.id_jurusan
   ...> WHERE krs.nilai = "D" OR krs.nilai = "C";
mengulang   nilai       nama_dosen  nama_mk     nama_jurusan
----------  ----------  ----------  ----------  ------------
arie        D           imam        biologi     perkebunan  
fasya       D           dimas       psikologi   perikanan   
bambang     C           dimas       psikologi   pertanian   
arie        D           eko         psikologi   perkebunan  
arie        D           subagja     datamining  perkebunan  