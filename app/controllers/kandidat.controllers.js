const db = require('../models')
const Kandidat = db.kandidat;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return {
        limit,
        offset
    };
};

exports.createKandidat = (req, res) => {
    const kandidat = new Kandidat({
        name:req.body.name,
        name2:req.body.name2,
        visi:req.body.visi,
        misi:req.body.misi,
        photos:req.body.photos
    })

    kandidat.save((err)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "successfully!" });
    })
}

exports.getAllKandidat = (req,res) =>{
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
    Kandidat.paginate(condition,{offset,limit}, (err, data) => {
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

exports.getFindKandidat = (req,res) =>{
    const id = req.params.id;
    Kandidat.find({_id:id},(err,data)=>{
        if(err){
            res.status(500).send({ message: err });
            return;
        }
        res.send({data:data})
    })
}

exports.editKandidat = (req,res) => {
    const id = req.params.id;
    Kandidat.findByIdAndUpdate(id,req.body,(err,data) => {
        if(err){
            res.status(500).send({ message: err });
            return;
        }
        res.send({message:"Success",data:data})
    })
}

exports.deleteKandidat = (req,res) => {
    const id = req.params.id;
    Kandidat.findByIdAndDelete(id,(err) => {
        if(err){
            res.status(500).send({ message: err });
            return;
        }
        res.send({message:"Success"})
    })
}