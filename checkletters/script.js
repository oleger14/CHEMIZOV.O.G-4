function separLetters(str) {

    var str = document.getElementById("texts").value;
    let vowels = "";
    let consonants = "";
    for (let i = 0; i < str.length; i++) {
        let letter = str[i].toLowerCase();
        if ("aeiouy".includes(letter)) {
            vowels += letter;
        } else if (letter >= "a" && letter <= "z") {
            consonants += letter;
        }
    }
    // return { vowels, consonants };
    document.getElementById("vowel").innerHTML = vowels.length
    document.getElementById("consonant").innerHTML = consonants.length
}