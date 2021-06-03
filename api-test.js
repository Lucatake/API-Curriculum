
window.onload = () =>{
  let formData = new FormData();
  //doc = document.getElementById('arq').addEventListener('change', onFileChanged, false);

  arq.onchange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    
      State=({
      analyzing: true,
      nome: "",
      email: "",
      periodo: "",
      curso: "",
      telefone: "",
    });
  
    //let formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log(formData);
    return formData;
  }

  btn_pdf.onclick = () => {        
   // mostra();
    //retrurnJson(event);
    //apiForm(formData);
    pdfExtractor(formData);
    //render();
  } 
}

State = {
  analyzing: true,
  nome: "",
  email: "",
  periodo: "",
  curso: "",
  telefone: "",
};

function onFileChanged(event) {
  var files = event.target.files; // event.dataTransfer.files;
  if (!files.length) {
    return;
  }

  var formData = new FormData();

  // Add the File object to the formdata
  if (this.multiple) {
    formData.append("files", files);
  } else {
    formData.append("file", files[0]);
  }
  return formData
  // Add your data...
  //formData.append("data", myData);
}

imageHandler = (e) => {
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  
    State=({
    analyzing: true,
    nome: "",
    email: "",
    periodo: "",
    curso: "",
    telefone: "",
  });

  let formData = new FormData();
  formData.append("file", e.target.files[0]);
  console.log(formData);
  return formData;
}

function apiForm(formData){
  let url = "http://localhost:6890/api/analyze/";
  //let url = "https://doors1.cognitiveservices.azure.com/formrecognizer/v2.1-preview.3/custom/models/808eb101-c6ac-422a-9298-679c47b2a0fc/analyze?";
    
  axios
    .post(url, formData, {
      headers: {
          "Content-Type": "application/pdf",
          "Ocp-Apim-Subscription-Key": "267a6513a34b45bb8c045a7099016532",
      },
    })
    .then((res) => {
      State=({ analyzing: false });
      
      console.log(res);
      let rec = res.data.output[0].fields;

      State=({
        analyzing: false,
        nome: rec.Nome.value + rec.Sobrenome.value,
        email: rec.Email.value,
        periodo: rec.Periodo.value,
        curso: rec.Curso.value,
        telefone: rec.Telefone.value,
      });
    });
}

function render(){
  console.log(`
  <div class="container">
  <div class="d-flex justify-content-center h-100">
      <div class="card">
          <div class="card-header">
              <h3>Register</h3>
              <div class="d-flex justify-content-end social_icon">
                  <span></span>
              </div>
          </div>
          <div class="card-body">
              <form>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-user"></i></span>
                      </div>
                      <input autocomplete="off" type="text" class="form-control" id="username" name="nome" placeholder="Username">

                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-key"></i></span>
                      </div>
                      <input type="password" class="form-control" placeholder="Password" id="senha" name="senha">
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-key"></i></span>
                      </div>
                      <input type="password" class="form-control" placeholder="Retype password" id="senha2" name="senha">
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-key"></i></span>
                      </div>
                      <input type="text" class="form-control" placeholder=${State.nome} id="prenome" name="senha">
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-key"></i></span>
                      </div>
                      <input type="text" class="form-control" placeholder=${State.email} id="email" name="senha">
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-key"></i></span>
                      </div>
                      <input type="text" class="form-control" placeholder="cpf" id="cpf" name="senha">
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-key"></i></span>
                      </div>
                      <input type="text" class="form-control" placeholder=${State.curso} id="curso" name="senha">
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-key"></i></span>
                      </div>
                      <input type="text" class="form-control" placeholder=${State.periodo} id="periodo" name="senha">
                  </div>
                  <div class="input-group form-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-key"></i></span>
                      </div>
                      <input type="text" class="form-control" placeholder=${State.telefone} id="telefone" name="senha">
                  </div>
                  <div class="form-group">
                      <input type="file" accept="application/pdf" id="arq" multiple><br>
                      <input type="button" value="PDF" class="btn float-left pdf_btn" id="btn_pdf">
                  </div>
                  <div class="form-group">
                      <input type="submit" value="Register" class="btn float-right login_btn" id="btn">
                  </div>
              </form>
          </div>
      </div>
  </div>
</div>`);
}


function pdfExtractor(formdata) {
  var params = {
      // Request parameters
      "includeTextDetails": true,//formdata,
  };
  $.ajax({
      post_url:"https://doors1.cognitiveservices.azure.com/formrecognizer/v2.1-preview.3/custom/models/808eb101-c6ac-422a-9298-679c47b2a0fc/analyze?",
      
      url: "https://doors1.cognitiveservices.azure.com/formrecognizer/v2.1-preview.3/custom/models/808eb101-c6ac-422a-9298-679c47b2a0fc/analyze?" + $.param(params),
      beforeSend: function(xhrObj){
          // Request headers
          xhrObj.setRequestHeader("Content-Type","application/pdf");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","267a6513a34b45bb8c045a7099016532");
      },
      type: "POST",
      // Request body
      data: formdata,
  })
  .done(function(data) {
      alert("success");
  })
  .fail(function() {
      alert("error");
  });
}