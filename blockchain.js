//Colors
var green="#1F6650"
var red="#AC0C0C"
//Colors

//Block Areas
var block1area=document.getElementById("block1");
var block2area=document.getElementById("block2");
var block3area=document.getElementById("block3");
var block4area=document.getElementById("block4");
var block5area=document.getElementById("block5");
//Block Areas

//Nonce Values
var block1NonceValue=document.getElementById("block1-nonce-value");
var block2NonceValue=document.getElementById("block2-nonce-value");
var block3NonceValue=document.getElementById("block3-nonce-value");
var block4NonceValue=document.getElementById("block4-nonce-value");
var block5NonceValue=document.getElementById("block5-nonce-value");
//Nonce Values

//Hash Values
var block1HashValue=document.getElementById("block1-hash-function");
var block2HashValue=document.getElementById("block2-hash-function");
var block3HashValue=document.getElementById("block3-hash-function");
var block4HashValue=document.getElementById("block4-hash-function");
var block5HashValue=document.getElementById("block5-hash-function");
//Hash Values

//Prev Hash Values
var block1PrevHashValue=document.getElementById("block1-prev-hash-function");
var block2PrevHashValue=document.getElementById("block2-prev-hash-function");
var block3PrevHashValue=document.getElementById("block3-prev-hash-function");
var block4PrevHashValue=document.getElementById("block4-prev-hash-function");
var block5PrevHashValue=document.getElementById("block5-prev-hash-function");
//Prev Hash Values

//Block Data
var block1Data=document.getElementById("block1-data");
var block2Data=document.getElementById("block2-data");
var block3Data=document.getElementById("block3-data");
var block4Data=document.getElementById("block4-data");
var block5Data=document.getElementById("block5-data");
//Block Data

//Mine Buttons
var mineBlock1=document.getElementById("block1-mineBTN");
var mineBlock2=document.getElementById("block2-mineBTN");
var mineBlock3=document.getElementById("block3-mineBTN");
var mineBlock4=document.getElementById("block4-mineBTN");
var mineBlock5=document.getElementById("block5-mineBTN");
//Mine Buttons

//Hash Variables
prevHashBlock1='f7c312c82c30a3528204c9b5e8d8ef9b373965f8955099741c8c362a1fc0f8fe';
block1PrevHashValue.value=prevHashBlock1;

var currentHashBlock1,updatedHashBlock1;
var prevHashBlock2,currentHashBlock2,updatedHashBlock2;
var prevHashBlock3,currentHashBlock3,updatedHashBlock3;
var prevHashBlock4,currentHashBlock4,updatedHashBlock4;
var prevHashBlock5,currentHashBlock5,updatedHashBlock5;
//Hash Values

window.onload=setDefaultValues();

function setDefaultValues(){
    for(var i=0;i<5;i++){
        var nonce=Math.floor(Math.random() * 100000);
        setNonceValue(i,nonce);
        setHashValues(i,nonce);
    }
    checkHashValue();
}

function setNonceValue(i,nonce){
    switch(i){
        case 0:
            block1NonceValue.value=nonce;
        break;
        case 1:
            block2NonceValue.value=nonce;
        break;
        case 2:
            block3NonceValue.value=nonce;
        break;
        case 3:
            block4NonceValue.value=nonce;
        break;
        case 4:
            block5NonceValue.value=nonce;
        break;
    }
}

function setHashValues(i,nonce){
    switch(i){
        case 0:
            sha256("",nonce).then((digestHex) => {
                block1HashValue.value=digestHex;
                currentHashBlock1=block1HashValue.value;
                updatedHashBlock1=block1HashValue.value;
                block2PrevHashValue.value=block1HashValue.value;
            });
        break;
        case 1:
            sha256("",nonce).then((digestHex) => {
                block2HashValue.value=digestHex;
                currentHashBlock2=block2HashValue.value;
                updatedHashBlock2=block2HashValue.value;
                block3PrevHashValue.value=block2HashValue.value;
            });
        break;
        case 2:
            sha256("",nonce).then((digestHex) => {
                block3HashValue.value=digestHex;
                currentHashBlock3=block3HashValue.value;
                updatedHashBlock3=block3HashValue.value;
                block4PrevHashValue.value=block3HashValue.value;
            });
        break;
        case 3:
            sha256("",nonce).then((digestHex) => {
                block4HashValue.value=digestHex;
                currentHashBlock4=block4HashValue.value;
                updatedHashBlock4=block4HashValue.value;
                block5PrevHashValue.value=block4HashValue.value;
            });
        break;
        case 4:
            sha256("",nonce).then((digestHex) => {
                block5HashValue.value=digestHex;
                currentHashBlock5=block5HashValue.value;
                updatedHashBlock5=block5HashValue.value;
            });
        break;

    }
}

async function sha256(message,nonce,prev="") {
    message+=nonce+prev;
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}

function checkHashValue(){
    var ans1=currentHashBlock1==updatedHashBlock1 && prevHashBlock1=="f7c312c82c30a3528204c9b5e8d8ef9b373965f8955099741c8c362a1fc0f8fe";
    if(ans1){
        block1area.style.background=green;
    }else{
        block1area.style.background=red;
    }

    var ans2=ans1 && currentHashBlock2==updatedHashBlock2 && prevHashBlock2==currentHashBlock1;
    if(ans2){
        block2area.style.background=green;
    }else{
        block2area.style.background=red;
    }

    var ans3=ans2 && currentHashBlock3==updatedHashBlock3 && prevHashBlock3==currentHashBlock2;
    if(ans3){
        block3area.style.background=green;
    }else{
        block3area.style.background=red;
    }

    var ans4=ans3 && currentHashBlock4==updatedHashBlock4 && prevHashBlock4==currentHashBlock3;
    if(ans4){
        block4area.style.background=green;
    }else{
        block4area.style.background=red;
    }

    var ans5=ans4 && currentHashBlock5==updatedHashBlock5 && prevHashBlock5==currentHashBlock4;
    if(ans5){
        block5area.style.background=green;
    }else{
        block5area.style.background=red;
    }
}


//All Possible actions For block 1
/*1. Clicking on mine button*/
mineBlock1.addEventListener("click",event=>{
    var nonce=block1NonceValue.value;
    var inputData=block1Data.value;
    if(nonce.length==0) {
        nonce=Math.floor(Math.random() * 100000);
        block1NonceValue.value=nonce;
    }
    sha256(inputData,nonce).then((digestHex) => {
        block1HashValue.value=digestHex;
        currentHashBlock1=digestHex;
        updatedHashBlock1=digestHex;
        prevHashBlock1='f7c312c82c30a3528204c9b5e8d8ef9b373965f8955099741c8c362a1fc0f8fe';
        block1PrevHashValue.value=prevHashBlock1;
        checkHashValue();
    });
})

/*2. Clicking on Nonce */
block1NonceValue.addEventListener("input",(clickEventHandler)=>{
    var newNonce=block1NonceValue.value;
    var inputData=block1Data.value;
    sha256(inputData,newNonce).then((digestHex) => {
        block1HashValue.value=digestHex;
        updatedHashBlock1=digestHex;    
        checkHashValue();
    });
})

/*3. Clicking on Data */
block1Data.addEventListener("input",(clickEventHandler)=>{
    var newNonce=block1NonceValue.value;
    var inputData=block1Data.value;
    sha256(inputData,newNonce).then((digestHex) => {
        block1HashValue.value=digestHex;
        updatedHashBlock1=digestHex;
        checkHashValue();
    });
})

/*4. Clicking on Prev Hash */
block1PrevHashValue.addEventListener("input",(clickEventHandler)=>{
    var prev=block1PrevHashValue.value;
    prevHashBlock1=prev;
    checkHashValue();
})

/*5. Clicking on Hash Function */
block1HashValue.addEventListener("input",(clickEventHandler)=>{
    updatedHashBlock1=block1HashValue.value;
    checkHashValue();
})
//All Possible actions For block 1


//All Possible actions For block 2
/*1. Clicking on mine button*/
mineBlock2.addEventListener("click",event=>{
    var nonce=block2NonceValue.value;
    var inputData=block2Data.value;
    if(nonce.length==0) {
        nonce=Math.floor(Math.random() * 100000);
        block2NonceValue.value=nonce;
    }
    sha256(inputData,nonce,prevHashBlock2).then((digestHex) => {
        block2HashValue.value=digestHex;
        currentHashBlock2=digestHex;
        updatedHashBlock2=digestHex;
        prevHashBlock2=block1HashValue.value;
        block2PrevHashValue.value=prevHashBlock2;
        checkHashValue();
    });
})

/*2. Clicking on Nonce */
block2NonceValue.addEventListener("input",(clickEventHandler)=>{
    var newNonce=block2NonceValue.value;
    var inputData=block2Data.value;
    sha256(inputData,newNonce,prevHashBlock2).then((digestHex) => {
        block2HashValue.value=digestHex;
        updatedHashBlock2=digestHex;
        checkHashValue();
    });
})

/*3. Clicking on Data */
block2Data.addEventListener("input",(clickEventHandler)=>{
    var newNonce=block2NonceValue.value;
    var inputData=block2Data.value;
    sha256(inputData,newNonce,prevHashBlock2).then((digestHex) => {
        block2HashValue.value=digestHex;
        updatedHashBlock2=digestHex;
        checkHashValue();
    });
})

/*4. Clicking on Prev Hash */
block2PrevHashValue.addEventListener("input",(clickEventHandler)=>{
    var prev=block2PrevHashValue.value;
    prevHashBlock2=prev;
    checkHashValue();
})

/*5. Clicking on Hash Function */
block2HashValue.addEventListener("input",(clickEventHandler)=>{
    updatedHashBlock2=block2HashValue.value;
    checkHashValue();
})
//All Possible actions For block 2


//All Possible actions For block 3
/*1. Clicking on mine button*/
mineBlock3.addEventListener("click",event=>{
    var nonce=block3NonceValue.value;
    var inputData=block3Data.value;
    if(nonce.length==0) {
        nonce=Math.floor(Math.random() * 100000);
        block3NonceValue.value=nonce;
    }
    sha256(inputData,nonce,prevHashBlock3).then((digestHex) => {
        block3HashValue.value=digestHex;
        currentHashBlock3=digestHex;
        updatedHashBlock3=digestHex;
        prevHashBlock3=block2HashValue.value;
        block3PrevHashValue.value=prevHashBlock3;
        checkHashValue();
    });
})

/*2. Clicking on Nonce */
block3NonceValue.addEventListener("input",(clickEventHandler)=>{
    var newNonce=block3NonceValue.value;
    var inputData=block3Data.value;
    sha256(inputData,newNonce,prevHashBlock3).then((digestHex) => {
        block3HashValue.value=digestHex;
        updatedHashBlock3=digestHex;
        checkHashValue();
    });
})

/*3. Clicking on Data */
block3Data.addEventListener("input",(clickEventHandler)=>{
    var newNonce=block3NonceValue.value;
    var inputData=block3Data.value;
    sha256(inputData,newNonce,prevHashBlock3).then((digestHex) => {
        block3HashValue.value=digestHex;
        updatedHashBlock3=digestHex;
        checkHashValue();
    });
})

/*4. Clicking on Prev Hash */
block3PrevHashValue.addEventListener("input",(clickEventHandler)=>{
    var prev=block3PrevHashValue.value;
    prevHashBlock3=prev;
    checkHashValue();
})

/*5. Clicking on Hash Function */
block3HashValue.addEventListener("input",(clickEventHandler)=>{
    updatedHashBlock3=block3HashValue.value;
    checkHashValue();
})
//All Possible actions For block 3

//All Possible actions For block 4
/*1. Clicking on mine button*/
mineBlock4.addEventListener("click",event=>{
    var nonce=block4NonceValue.value;
    var inputData=block4Data.value;
    if(nonce.length==0) {
        nonce=Math.floor(Math.random() * 100000);
        block4NonceValue.value=nonce;
    }
    sha256(inputData,nonce,prevHashBlock4).then((digestHex) => {
        block4HashValue.value=digestHex;
        currentHashBlock4=digestHex;
        updatedHashBlock4=digestHex;
        prevHashBlock4=block3HashValue.value;
        block4PrevHashValue.value=prevHashBlock4;
        checkHashValue();
    });
})

/*2. Clicking on Nonce */
block4NonceValue.addEventListener("input",(clickEventHandler)=>{
    var newNonce=block4NonceValue.value;
    var inputData=block4Data.value;
    sha256(inputData,newNonce,prevHashBlock4).then((digestHex) => {
        block4HashValue.value=digestHex;
        updatedHashBlock4=digestHex;
        checkHashValue();
    });
})

/*3. Clicking on Data */
block4Data.addEventListener("input",(clickEventHandler)=>{
    var newNonce=block4NonceValue.value;
    var inputData=block4Data.value;
    sha256(inputData,newNonce,prevHashBlock4).then((digestHex) => {
        block4HashValue.value=digestHex;
        updatedHashBlock4=digestHex;
        checkHashValue();
    });
})

/*4. Clicking on Prev Hash */
block4PrevHashValue.addEventListener("input",(clickEventHandler)=>{
    var prev=block4PrevHashValue.value;
    prevHashBlock4=prev;
    checkHashValue();
})

/*5. Clicking on Hash Function */
block4HashValue.addEventListener("input",(clickEventHandler)=>{
    updatedHashBlock4=block4HashValue.value;
    checkHashValue();
})
//All Possible actions For block 4


//All Possible actions For block 5
/*1. Clicking on mine button*/
mineBlock5.addEventListener("click",event=>{
    var nonce=block5NonceValue.value;
    var inputData=block5Data.value;
    if(nonce.length==0) {
        nonce=Math.floor(Math.random() * 100000);
        block5NonceValue.value=nonce;
    }
    sha256(inputData,nonce,prevHashBlock5).then((digestHex) => {
        block5HashValue.value=digestHex;
        currentHashBlock5=digestHex;
        updatedHashBlock5=digestHex;
        prevHashBlock5=block4HashValue.value;
        block5PrevHashValue.value=prevHashBlock5;
        checkHashValue();
    });
})

/*2. Clicking on Nonce */
block5NonceValue.addEventListener("input",(clickEventHandler)=>{
    var newNonce=block5NonceValue.value;
    var inputData=block5Data.value;
    sha256(inputData,newNonce,prevHashBlock5).then((digestHex) => {
        block5HashValue.value=digestHex;
        updatedHashBlock5=digestHex;
        checkHashValue();
    });
})

/*3. Clicking on Data */
block5Data.addEventListener("input",(clickEventHandler)=>{
    var newNonce=block5NonceValue.value;
    var inputData=block5Data.value;
    sha256(inputData,newNonce,prevHashBlock5).then((digestHex) => {
        block5HashValue.value=digestHex;
        updatedHashBlock5=digestHex;
        checkHashValue();
    });
})

/*4. Clicking on Prev Hash */
block5PrevHashValue.addEventListener("input",(clickEventHandler)=>{
    var prev=block5PrevHashValue.value;
    prevHashBlock5=prev;
    checkHashValue();
})

/*5. Clicking on Hash Function */
block5HashValue.addEventListener("input",(clickEventHandler)=>{
    updatedHashBlock5=block5HashValue.value;
    checkHashValue();
})
//All Possible actions For block 4