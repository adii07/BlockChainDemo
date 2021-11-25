var submit_button=document.getElementById("submit-value");
var blockNumberValue=document.getElementById("block-num-input");
var nonceValue=document.getElementById("nonce-value");
var data=document.getElementById("block-data");
var hash=document.getElementById("hash-function");
var currentHash;
var updatedHash;

window.onload=setDefaultValues();

submit_button.addEventListener("click",(onClickAction)=>{
    //onClickAction.preventDefault()
    var blockNumber=document.getElementById("block-num-input").value;
    var nonce=nonceValue.value;
    var inputData=data.value;
    if(nonce.length==0) {
        nonce=Math.floor(Math.random() * 100000);
        nonceValue.value=nonce;
    }
    sha256(inputData,nonce).then((digestHex) => {
        hash.value=digestHex;
        currentHash=hash.value;
        updatedHash=hash.value;
        checkHashValue();
    });
    
})

nonceValue.addEventListener("input",(clickEventHandler)=>{
    var newNonce=nonceValue.value;
    var inputData=data.value;
    sha256(inputData,newNonce).then((digestHex) => {
        hash.value=digestHex;
        updatedHash=hash.value;
        checkHashValue();
    });
})

data.addEventListener("input",(clickEventHandler)=>{
    var newNonce=nonceValue.value;
    var inputData=data.value;
    sha256(inputData,newNonce).then((digestHex) => {
        hash.value=digestHex;
        updatedHash=hash.value;
        checkHashValue();
    });
})



async function sha256(message,nonce) {
    message+=nonce;
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
  }
 
  
 
function setDefaultValues(){
    var nonce=Math.floor(Math.random() * 100000);
    nonceValue.value=nonce;
    sha256("",nonce).then((digestHex) => {
        hash.value=digestHex;
        currentHash=hash.value;
        updatedHash=hash.value;
        checkHashValue();
    });
}

function checkHashValue(){
    // console.log(currentHash+"->"+updatedHash);
    if(currentHash===updatedHash) {
        document.getElementById("block-area").style.background='#1F6650';
    }
    else {
        document.getElementById("block-area").style.background='#AC0C0C';
    }
}










    // sha256(inputData+(newNonce*Math.floor(Math.random() * 100000)+1)).then(digestHex => hash.value=digestHex);