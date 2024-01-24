const db = require('../models')
const User = db.user;
const Role = db.role;
const ExcelJS = require('exceljs')
const path = require('path')
const fs = require('fs')

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return {
        limit,
        offset
    };
};

exports.getAllUser = (req, res) => {
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
    User.paginate(condition, { offset, limit }, (err, data) => {
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

exports.getFindUser = (req, res) => {
    const id = req.params.id;
    User.find({
        _id: id
    }, (err, data) => {
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

exports.getFindUserByStatus = (req, res) => {
    const status = req.params.status;
    User.find({
        status: status
    }, (err, data) => {
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

exports.editUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }
        res.send({
            message: "Success",
            data: data
        })
    })
}

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id, (err) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }
        res.send({
            message: "Success"
        })
    })
}

exports.getExcelFile = (req, res) => {
    User.find({}, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        const workbook = new ExcelJS.Workbook()
        workbook.creator = "Awanda-Kun"
        const worksheet = workbook.addWorksheet("New Sheet")
        worksheet.columns = [
            { header: 'Nama', key: 'name' },
            { header: 'email', key: 'email' },
            { header: 'username', key: 'username' },
            { header: 'status', key: 'status' }
        ]
        data.forEach(item => {
            worksheet.addRow({ name: item.name, email: item.email, username: item.username, status: item.status })
        });
        const excelPath = path.join(__dirname, "./User.xlsx")
        workbook.xlsx.writeFile(excelPath).then((data) => {
            res.sendFile(excelPath)
        })
    })
}

exports.userFromExcel = (req, res) => {
    if (req.file) {
        const workbook = new ExcelJS.Workbook();
        const excelfile = req.file.buffer
        const obj = []
        workbook.xlsx.load(excelfile).then(() => {
            const worksheet = workbook.getWorksheet(1)
            worksheet.eachRow(function (row) {
                const name = row.values[1]
                const email = row.values[3]
                const username = row.values[2]
                const password = row.values[4]
                Role.findOne({ name: "user" }, (err, role) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    const roleku = [role._id];
                    const dataku = new User({
                        name: name,
                        username: username,
                        email: email,
                        password: password,
                        status: "Belum Memilih",
                        roles: roleku
                    })
                    dataku.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                    })
                })
            })
        })
        res.send({ message: "successfully!" });
    }
}