document.getElementById('fetchData').addEventListener('click', function() {
    const type = document.getElementById('typeSelect').value;
    const language = document.getElementById('languageSelect').value;
    const inputData = document.getElementById('inputField').value;
    const loading=document.getElementById("loadingdata");
    let obj={
        text:inputData,
        type:type,
        langauge:language
      }
      loading.innerText="please wait.... I am generating data it takes some time... 🔃 "
    const apiUrl = `http://localhost:8080/getdata`;

    fetch(apiUrl,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(obj)
    })
        .then(response => response.json())
        .then(data => {
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = data.data;
            loading.innerText=null;
        })
        .catch(error => console.error('Error:', error));
});

const copybtn=document.getElementById("copy");

copybtn.addEventListener("click",()=>{
    const outputDiv = document.getElementById('output');
    const data = outputDiv.innerText;
    copyToClipboard(data);

    // Provide visual feedback (optional)
    const feedbackElement = document.getElementById('copyFeedback');
    feedbackElement.style.display = 'block';
    setTimeout(function() {
        feedbackElement.style.display = 'none';
    }, 3000);
})

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    const selected =
        document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
}
