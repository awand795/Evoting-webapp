const db = require('../models')
const Vote = db.vote;
const ExcelJS = require('exceljs')
const path = require('path')
const User = db.user;
const Kandidat = db.kandidat

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return {
        limit,
        offset
    };
};

exports.getAllVote = (req, res) => {
    const {
        page,
        size,
        name
    } = req.query;
    var condition = name ?
        {
            name: {
                $regex: new RegExp(name),
                $options: "i"
            }
        } :
        {};

    const {
        limit,
        offset
    } = getPagination(page, size);

    Vote.paginate(condition, { offset, limit }, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }
        res.send({
            data: data
        })
    })
}

exports.getVoteByKandidat = (req, res) => {
    Vote.find({ kandidat: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ data: data })
    })
}

exports.createVote = (req, res) => {
    const vote = new Vote({
        user: req.body.user,
        kandidat: req.body.kandidat
    });

    vote.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "successfully!" });
    })
}

exports.getExcelFile = (req, res) => {
    Vote.find({}, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }
        data.forEach(dataVote => {
            const tanggalpilih = []
            tanggalpilih.push(dataVote.createdAt)
            User.find({ _id: dataVote.user }, (err, dataUser) => {
                if (err) {
                    res.status(500).send({ message: err })
                    return
                }
                const namaUser = []
                namaUser.push(dataUser[0].name)
                Kandidat.find({ _id: dataVote.kandidat }, (err, dataKandidat) => {
                    if (err) {
                        res.status(500).send({ message: err })
                        return
                    }
                    const namaKandidat1 = []
                    namaKandidat1.push(dataKandidat[0].name)
                    const namaKandidat2 = []
                    namaKandidat2.push(dataKandidat[0].name2)
                    const workbook = new ExcelJS.Workbook()
                    workbook.creator = "Awanda-Kun"
                    const worksheet = workbook.addWorksheet("New Sheet")
                    worksheet.columns = [
                        { header: 'Nama Pemilih', key: 'name' },
                        { header: 'Kandidat 1', key: 'kandidat1' },
                        { header: 'Kandidat 2', key: 'kandidat2' },
                        { header: 'tanggal pilih', key: 'tanggal' }
                    ]
                    const dataku = []
                    dataku.push({name:namaUser, namaKandidat1:namaKandidat1, namaKandidat2:namaKandidat2, tanggalpilih:tanggalpilih})
                    dataku.forEach(item => {
                        worksheet.addRow({ name: item.name, kandidat1: item.namaKandidat1, kandidat2: item.namaKandidat2, tanggal: item.tanggalpilih })
                    });
                    const excelPath = path.join(__dirname, "./Kandidat.xlsx")
                    workbook.xlsx.writeFile(excelPath).then((data) => {
                        res.sendFile(excelPath)
                    })
                })
            })
        });
    })
}