
window.onload = () =>{
    document.getElementById('arq').addEventListener('change', imageHandler, false);
    document.getElementById('btn_pdf').addEventListener('click', retrurnJson, false);

}

imageHandler = (e) => {
    const reader = new FileReader();
    
    reader.readAsDataURL(e.target.files[0]);

    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    let url = "http://127.0.0.1:3002/api/analyze/";
    //let url = "http://127.0.0.1:3002/apitest";
    axios
      .post(url, formData, {
        headers: {
          "content-type": "application/pdf",
          "Ocp-Apim-Subscription-Key": "267a6513a34b45bb8c045a7099016532",
        },
      })
      .then((res) => {
        console.log(res);
        let rec = res.data.output[0].fields;
      });
      alert("Obtendo informações! Espere um momento e depois clique em PDF para preencher os campos.");
  };


retrurnJson = () => {
  console.log("teste");
    let url = "http://127.0.0.1:3002/api/json/";
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        let rec = res.data;
        render(rec);
    });
  };
 
  function render(rec){
    var nome = "";
    var sobrenome = "";
    var email = "";
    var periodo = "";
    var curso = "";
    var telefone = "";

    for(var i in rec.output){
      if (rec.output[i].Nome){
        nome = rec.output[i].Nome;
      }if (rec.output[i].Sobrenome){
        sobrenome = rec.output[i].Sobrenome;
      }if (rec.output[i].Email){
        email = rec.output[i].Email;
      }if (rec.output[i].Periodo){
        periodo = rec.output[i].Periodo;
      }if (rec.output[i].Curso){
        curso = rec.output[i].Curso;
      }if (rec.output[i].Telefone){
        telefone = rec.output[i].Telefone;
      }
    }
    //rec.output[5].Nome
    $("#prenome").val(nome + " " + sobrenome);
    $("#email").val(email);
    $("#periodo").val(periodo);
    $("#curso").val(curso);
    $("#telefone").val(telefone);

  }