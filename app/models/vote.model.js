module.exports = (mongoose, mongoosePaginate) =>{
const schema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, Ref:"User"
    },
    kandidat:{
        type:mongoose.Schema.Types.ObjectId,Ref:"Kandidat"
    }
  },{timestamps:true})

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  
  schema.plugin(mongoosePaginate);
  
  const Vote = mongoose.model(
    "Vote",
    schema
  );
  
    return Vote;

}