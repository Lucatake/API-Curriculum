window.onload = () =>{
    btn.disabled = true;
    let validaForm = () =>{
        if(username.value.length > 0 && senha.value.length > 0){
            btn.disabled = false;
        }else btn.disabled = true;
    };
    username.oninput = validaForm;
    senha.oninput = validaForm;
    /*btn.onclick = (evento) =>{
        registraDadosAJAX();
        evento.preventDefault();
        //var x = evento;
    }*/
    btn_pdf.onclick = function(){
        mostra();
        console.log("teste");
        main();
    }
    
}

function mostra(){
    x=document.getElementById("modal");
    if (x.style.display == 'inline') {
      x.style.display = 'none';
    } else {
      x.style.display = 'inline';
    }
}

function registraDadosAJAX(){
    //executar chamada AJAX para a API do JSONSERVER
    let xhr = new XMLHttpRequest();
    xhr.onload = verificaLogin;
    xhr.open('POST', `http://localhost:6543/estudante/add?username=${username.value}&password=${senha.value}&prenome=${prenome.value}&sobrenome=${sobrenome.value}&email=${email.value}&cpf=${cpf.value}&curso=${curso.value}&periodo=${periodo.value}&endereco=${endereco.value}&telefone=${telefone.value}&linkedin=${linkedin.value}&idiomas=${idiomas.value}&skills=${skills.value}`);
    xhr.send();
}

function verificaLogin(dados){
    dados = JSON.parse(this.responseText);

    for(i = 0; i < dados.length; i++){
        let nomeAluno = dados[i].nome;
        let idAluno = dados[i].id;
        let tipoAluno = dados[i].is_monitor;
        let senhaAluno = dados[i].senha;
        if(nome.value == idAluno){
            i = dados.length;
            
            if(senha.value == senhaAluno){
                login(idAluno, nomeAluno, tipoAluno);
            }else alert("Usuário ou senha incorretos!");
        }
    }
}

function register(id, nomeAluno, type){
    let user = {nome:nomeAluno, userId:id, tipo:type};
    localStorage.setItem('user', JSON.stringify(user));
    window.location.replace("./../html/initialScreen.html");
}

////////////////////////////////////////////////////////////////////////////////////
//------------------------------API PDF extractor---------------------------------
////////////////////////////////////////////////////////////////////////////////////

/*
// You will need to set these environment variables or edit the following values
const endpoint = "https://doors1.cognitiveservices.azure.com/";
const apiKey = "70b2796924584d8da912296e8dea613a";

async function recognizeCustom() {
    // Model ID from when you trained your model.
    const modelId = "808eb101-c6ac-422a-9298-679c47b2a0fc";
    const formUrl = "https://github.com/Lucatake/API-Curriculum/blob/main/Python/Luana1.pdf";

    const poller = await client.beginRecognizeCustomForms(modelId, formUrl, {
        onProgress: (state) => { console.log(`status: ${state.status}`); }
    });
    const forms = await poller.pollUntilDone();

    console.log("Curriculum:");
    for (const form of forms || []) {
        console.log(`${form.formType}, page range: ${form.pageRange}`);
        console.log("Pages:");
        for (const page of form.pages || []) {
            console.log(`Page number: ${page.pageNumber}`);
            console.log("Tables");
            for (const table of page.tables || []) {
                for (const cell of table.cells) {
                    console.log(`cell (${cell.rowIndex},${cell.columnIndex}) ${cell.text}`);
                }
            }
        }

        console.log("Fields:");
        for (const fieldName in form.fields) {
            // each field is of type FormField
            const field = form.fields[fieldName];
            console.log(
                `Field ${fieldName} has value '${field.value}' with a confidence score of ${field.confidence}`
            );
        }
    }
}

recognizeCustom().catch((err) => {
    console.error("The sample encountered an error:", err);
});



function pdfExtractor() {
    var params = {
        // Request parameters
        "includeTextDetails": "{boolean}",
    };
    $.ajax({
        endpoint: "https://doors1.cognitiveservices.azure.com/",
        apim_key: "70b2796924584d8da912296e8dea613a",
        model_id: "808eb101-c6ac-422a-9298-679c47b2a0fc",
        API_version: "v2.1-preview.3",
        post_url: endpoint + "/formrecognizer/%s/custom/models/%s/analyze" % (API_version, model_id),
        
        url: "https://doors1.cognitiveservices.azure.com/formrecognizer/v2.1-preview.3/custom/models/808eb101-c6ac-422a-9298-679c47b2a0fc/analyze?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}");
        },
        type: "POST",
        // Request body
        data: "{body}",
    })
    .done(function(data) {
        alert("success");
    })
    .fail(function() {
        alert("error");
    });
}

function getInformations() {
    var params = {
        // Request parameters
    };
  
    $.ajax({
        url: "https://doors1.cognitiveservices.azure.com/formrecognizer/v2.1-preview.3/custom/models/808eb101-c6ac-422a-9298-679c47b2a0fc/analyzeResults/{resultId}?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}");
        },
        type: "GET",
        // Request body
        data: "{body}",
    })
    .done(function(data) {
        alert("success");
    })
    .fail(function() {
        alert("error");
    });
}


//var file = document.getElementsByTagName('input').value();
//var tipo = "application/"+file.split('.').pop();

function boundingBoxToString(box) {
    let out = "[";
    for (const { x, y } of box) {
      out += `(${x}, ${y}),`;
    }
    // Remove the last comma and add the closing bracket
    return out.slice(0, -1) + "]";
  }*/
 
  const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");
  const fs = require("fs");
  
  async function main() {
    // You will need to set these environment variables or edit the following values
    // const endpoint = process.env["FORM_RECOGNIZER_ENDPOINT"] ?? "https://doors1.cognitiveservices.azure.com/";
    // const apiKey = process.env["FORM_RECOGNIZER_API_KEY"] ?? "70b2796924584d8da912296e8dea613a";
    // const modelId = process.env["CUSTOM_MODEL_ID"] ?? "808eb101-c6ac-422a-9298-679c47b2a0fc";
    const endpoint = "https://doors1.cognitiveservices.azure.com/";
    const apiKey = "70b2796924584d8da912296e8dea613a";
    const modelId = "808eb101-c6ac-422a-9298-679c47b2a0fc";
  
    // The form you are recognizing must be of the same type as the forms the custom model was trained on
    const fileName = "Luana1.pdf";
    //var fileName = document.getElementsByTagName('input').value();
    //var tipo = "application/"+file.split('.').pop();
 
    if (!existsSync(fileName)) {
      throw new Error(`Expected file "${fileName}" to exist.`);
    }
  
    const readStream = createReadStream(fileName);
  
    const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
    const poller = await client.beginRecognizeCustomForms(modelId, readStream, {
      onProgress: (state) => {
        console.log(`status: ${state.status}`);
      }
    });
    const forms = await poller.pollUntilDone();
  
    if (forms.length === 0) {
      throw new Error("Failed to extract data from at least one form.");
    }
  
    console.log("Forms:");
    for (const form of forms ?? []) {
      console.log(`- ${form.formType}, page range: ${form.pageRange}`);
      console.log("  Pages:");
      for (const page of form.pages ?? []) {
        console.log(`  - Page number: ${page.pageNumber}`);
        console.log("    Tables:");
        for (const table of page.tables ?? []) {
          console.log(`    - (${table.rowCount} x ${table.columnCount}`);
          for (const cell of table.cells) {
            console.log(`      cell (${cell.rowIndex},${cell.columnIndex}) ${cell.text}`);
          }
        }
        console.log("    Selection Marks:");
        for (const mark of page.selectionMarks ?? []) {
          const box = boundingBoxToString(mark.boundingBox);
          console.log(`    - ${mark.state} @(${box}) (${mark.confidence} confidence)`);
        }
      }
  
      console.log("  Fields:");
      for (const [fieldName, field] of Object.entries(form.fields)) {
        // Each field is of type FormField.
        console.log(
          `  - ${fieldName} (${field.valueType}): '${field.value ?? "<missing>"}' with confidence ${
            field.confidence
          }`
        );
      }
    }
  }
  
  main().catch((err) => {
    console.error("The sample encountered an error:", err);
  });