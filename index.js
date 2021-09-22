//Chama para o arquivo
let TextInit = document.getElementById ("textInit") //chama o texto inicial
let TextEnd = document.getElementById ("textEnd") //chama o texto final
let Seletor = document.getElementById ("select") //chama o seletor
let Codif = document.getElementById ("codi") //chama o codificador
let Decodif = document.getElementById ("decodi") //chama o decodificador
let Shift = document.getElementById ("Shift") //chama o shift, quando selecionado cifra de césar

// Codificar de vez
    let msgOriginal = TextInit.value;
    TextInit.addEventListener ("input", function () {
        if (Seletor.value == "Cifra de César") {
            letraDig (TextInit)
        }
        else {
            if (Codif.checked){ 
                codBase64 ()
            }
            else {
                decBase64 ()
            }
        }
    }, false);
// Caixa Shift aparece/desaparece
    Seletor.addEventListener ("change", function (){
        if (Seletor.value == "Cifra de César"){
            Shift.style.display = "flex"
        }
        else {
            Shift.style.display = "none"
        }
    })

    function letraDig (e) {
        msgOriginal = e.value;
        msgOriginal = msgOriginal.toUpperCase();
        msgOriginal = msgOriginal.replace (/[a-z]/,'');

        e.value = msgOriginal;

        initEncrip ();
    }

    function initEncrip (){
        let msgEncrip = "";
        let shift = Shift.value ? Number(Shift.value): 0;
        console.log (shift)
        for (letra of msgOriginal){
            msgEncrip += letraShift (letra, shift);
        }
        console.log (msgEncrip);
        TextEnd.value = msgEncrip;
    }
    initEncrip();

    function letraShift (letra, shift){
        let novaLetra = "";

        let letraCod = letra.charCodeAt (0);
        let novaLetraCod = letraCod + (shift % 26);

        if (novaLetraCod <= 65){
            novaLetraCod += 26;
        }
        else if (novaLetraCod >= 90){
            novaLetraCod -=26;
        }
        novaLetra = String.fromCharCode(novaLetraCod);
        return novaLetra
    }
    Shift.addEventListener ("click", function (){
        if (Codif.checked){
            Shift.min = "0";
            Shift.max = "";
        }
        else {
            Shift.min = "";
            Shift.max = "0";
        }
    })
                            //Base64
function codBase64 (){
    let result = ""
    result += btoa (TextInit.value)
    TextEnd.value = result
    
}
function decBase64 (){
    let result = ""
    result += atob (TextInit.value)
    TextEnd.value = result
    
}

