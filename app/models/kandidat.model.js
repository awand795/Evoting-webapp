module.exports = (mongoose, mongoosePaginate) =>{

const schema = new mongoose.Schema({
    name: String,
    name2: String,
    visi: String,
    misi: String,
    photos:String
  })

  schema.method("toJSON",function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
  })

  schema.plugin(mongoosePaginate)

  const Kandidat = mongoose.model(
    "Kandidat",
    schema
  )

  return Kandidat;

}
