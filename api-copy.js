const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const AzureStorageBlob = require("@azure/storage-blob");
const { BlobServiceClient } = require("@azure/storage-blob");
var cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const {
  FormRecognizerClient,
  AzureKeyCredential,
} = require("@azure/ai-form-recognizer");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");
//const { hasSubscribers } = require("diagnostic_channel");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const hostname = "localhost";

const port = process.env.PORT || "6890";
app.set("port", port);
app.set("host", hostname);

const server = http.createServer(app);
server.listen(port);

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use((req, res, next) => {
  console.log("Enter CORS");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});


app.options("*", cors()); // include before other routes

app.use("/api/analyze", (req, res, next) => {
  if (!req) {
    return res.status(400).send("No files were uploaded.");
  } else {
  let file = req.files.file;
  uploadPath = __dirname + "\\uploads\\" + new Date().getTime() + ".jpg";
  file.mv(uploadPath, async () => {
     recognizeForm(uploadPath).then((result) => {
      res.status(200).json({
        output: result,
      });
    });
  });}
});

function verificaArquivo(file){
  var ajax = new XMLHttpRequest();

    ajax.open("GET",file,true);
    ajax.send();
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4){

          if(ajax.status===200) {
              console.log("A imagem " + file + " existe");
              return false;
          } else {
              console.log("A imagem " + file + " NAO existe");
              return true;
          }
      }
  }
}

/*app.post('/apitest', function(req, res){
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  let file = req.files.file;
  uploadPath = __dirname + "\\uploads\\" + new Date().getTime() + ".jpg";
  
  const test = recognizeForm(uploadPath);
  file.mv(uploadPath,  res.status(200).json({output : test}));
});*/

var jsonReturn = [];
async function recognizeForm(file) {
  
  const endpoint = "https://doors1.cognitiveservices.azure.com/";
  const apiKey = "70b2796924584d8da912296e8dea613a";
  const modelId = "808eb101-c6ac-422a-9298-679c47b2a0fc";
  console.log("Entering Forms Recognizer");

  let fileStream = fs.createReadStream(file);

  const client = new FormRecognizerClient(
    endpoint,
    new AzureKeyCredential(apiKey)
  );
  const poller = await client.beginRecognizeCustomForms(modelId, fileStream, {
    contentType: "application/pdf",
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    },
  });
  const forms = await poller.pollUntilDone();

  console.log("Forms:");
  for (const form of forms || []) {
    console.log(`${form.formType}, page range: ${form.pageRange}`);
    console.log("Pages:");
    for (const page of form.pages || []) {
      console.log(`Page number: ${page.pageNumber}`);
      console.log("Tables");
      for (const table of page.tables || []) {
        for (const cell of table.cells) {
          console.log(
            `cell (${cell.rowIndex},${cell.columnIndex}) ${cell.text}`
          );
        }
      }
    }

    //console.log("Fields:");
    for (const fieldName in form.fields) {
      // each field is of type FormField
      const field = form.fields[fieldName];
      var name = field.name;
      var valor = field.value;
      var obj = `{"`+`${name}`+`": "`+`${valor}`+`"}`;
      jsonReturn.push(JSON.parse(obj));
    }
    //console.log(jsonReturn);
  }
  
  fs.unlinkSync(uploadPath);
  retorna(jsonReturn);
  return jsonReturn;
}
function retorna(jsonReturn){
  console.log(jsonReturn);
  return jsonReturn;
}