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
    btn_pdf.onclick = (event) => {        
        mostra();
        //imageHandler(event);
    } 

    /*arq.onchange = (event) => {
        var file = event.srcElement.files[0];
        console.log(file);
        var reader = new FileReader();
        reader.readAsBinaryString(file);
    
        reader.onload = function() {
            //console.log(btoa(reader.result));
            file = btoa(reader.result);
        };
        reader.onerror = function() {
            console.log('there are some problems');
        };
        console.log(file);
        return file;
    }*/

    document.getElementById('arq').addEventListener('change', imageHandler, false);
}
function postData(input) {
    $.ajax({
        type: "POST",
        url: "https://api-curriculum.herokuapp.com/Python/analyze-808e.py?input_file="+{param: input}+"&file_type=application/pdf&output_file=testes.json",
        data: { param: input },
        success: callbackFunc
    });
}
function callbackFunc(response) {
    // do something with the response
    console.log(response);
}

/*function fileSelected(event){
    var file = event.srcElement.files[0];
        console.log(file);
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function() {
            //postData(btoa(reader.result));
            pdfExtractor(btoa(reader.result));
            console.log(btoa(reader.result));
        };
        reader.onerror = function() {
            console.log('there are some problems');
        };
}*/

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
  
    // Add your data...
    //formData.append("data", myData);
  }
  
  function uploadDocument(formData) {
    console.log('data sent');
    console.log(formdata);
    pdfExtractor(Axios.post('/api/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }));
  }

function mostra(){
    x=document.getElementById("arq");
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

function getJson(){
    axios.get('https://doors1.cognitiveservices.azure.com/formrecognizer/v2.1-preview.3/custom/models/808eb101-c6ac-422a-9298-679c47b2a0fc/analyzeResults/{resultId}')
        .then(response => console.log(response)) //caso retorne um sucesso
        .catch(error => console.log(error)) //caso ocorra algum erro
}


//var file = document.getElementsByTagName('input').value();
//var tipo = "application/"+file.split('.').pop();

imageHandler = (e) => {
    const reader = new FileReader();
    
    reader.readAsDataURL(e.target.files[0]);

    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    let url = "https://doors1.cognitiveservices.azure.com/formrecognizer/v2.1-preview.3/custom/models/808eb101-c6ac-422a-9298-679c47b2a0fc/analyze?";
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "application/pdf",
          "Ocp-Apim-Subscription-Key": "267a6513a34b45bb8c045a7099016532",
        },
      })
      .then((res) => {
        console.log(res); 
      });
  };

function pdfExtractor(formdata) {
    var params = {
        // Request parameters
        "includeTextDetails": "",//formdata,
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

function getInformations() {
    var params = {
        // Request parameters
    };
  
    $.ajax({
        url: "https://doors1.cognitiveservices.azure.com/formrecognizer/v2.1-preview.3/custom/models/808eb101-c6ac-422a-9298-679c47b2a0fc/analyzeResults/{resultId}?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","267a6513a34b45bb8c045a7099016532");
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
