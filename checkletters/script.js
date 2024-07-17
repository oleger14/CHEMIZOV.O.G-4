function separLetters(str) {

    var str = document.getElementById("texts").value;
    let gls = "";
    let sog = "";
    for (let i = 0; i < str.length; i++) {
        let letter = str[i].toLowerCase();
        if ("aeiouy".includes(letter)) {
            gls += letter;
        } else if (letter >= "a" && letter <= "z") {
            sog += letter;
        }
    }
    // return { vowels, consonants };
    document.getElementById("vowel").innerHTML = gls.length
    document.getElementById("consonant").innerHTML = sog.length
}