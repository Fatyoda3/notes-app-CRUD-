import { express, url, path, __dirpath, app, mongoose } from "./exports.js";

await mongoose.connect(process.env.uri);

const notesSchema = new mongoose.Schema({
  heading: {
    requried: true,
    type: String,
    unique: true,
  },
  content: {
    required: true,
    type: String,
  },
});

const notesModel = mongoose.model("note", notesSchema);

// const t =  await notesModel.create({heading:"HELLO WORLD" , content : "HI THIS IS FAT YODA "});


app.post("/api/create", async (req, res) => {
  try {
    if (req.body) {
      if (req.body.heading && req.body.content) {
        const { heading, content } = req.body;

        /* const t =  */ await notesModel.create({
          heading: heading,
          content: content,
        });
      }

      return res.status(201).send("OK CREATED");
    } else {
      return res.status(418).send("<h1> what are you trying ?</h1>");
    }
  } catch (ex) {
    res.status(500).send("oops something went wrong");
  }
});

app.get("/api/get", async (req, res) => {
  console.log("notes are being collected and prepared ");
  try {
    let t = await notesModel.find({});

    // console.log(t.json());
    // t.forEach((el) => console.log(el.heading));
    res.send(t);
    // res.send("hi");
  } catch (error) {
    res.status(500).send("oops something went wrong ");
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  let id = req.params.id;
  console.log(req.params.id);

  let result = notesModel.findOneAndDelete({ _id: id });

  console.log(await result);

  return res.status(200).send("DELETED content ");
});

app.put("/api/modify/:id", async (req, res) => {
  let id = req.params.id;
  console.log(req.params.id);

  console.log(req.body);
  const content = req.body.mC;
  const heading = req.body.mT;
  //  notesModel.findOneAndUpdate(
  //   { _id: id },
  //   { $set: { heading: heading ,/* }, $set: { */ content: content } }
  // );
  const changedNote = await notesModel.findOneAndUpdate(
    { _id: id },
    { $set: { heading: heading, content: content } },
    { new: true } // new: true returns the updated doc
  );

  // console.log(changedNote);
  res.send(changedNote);
});

//created all the basic routes like create a new note , get all previous notes , delete a note
//now added way to modify existing notes
