module.exports = (mongoose, mongoosePaginate) =>{
const schema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  }],
  status: String,
})

schema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

schema.plugin(mongoosePaginate);

const User = mongoose.model(
  "User",
  schema
);

  return User;
}