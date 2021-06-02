

window.onload = () =>{
    document.getElementById('arq').addEventListener('change', imageHandler, false);
}

imageHandler = (e) => {
    const reader = new FileReader();
    
    reader.readAsDataURL(e.target.files[0]);

    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    let url = "http://localhost:3002/api/analyze/";
    axios
      .post(url, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        let rec = res.data.output[0].fields;
        
      });
  };