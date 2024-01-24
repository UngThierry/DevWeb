function litSync(filepath, minlength){
    var filepath = new XMLHttpRequest();
    filepath.open("GET", fichier, false);
    filepath.onreadystatechange = function(){
        if(filepath.readyState === 4){
            if(filepath.status === 200 || filepath.status == 0){
                var texte = filepath.responseText;
                alert(texte);
            }
        }
    }
    filepath.send(null);
}

const assert = require("assert")
const dico = require("../src/dico.js")
const path = require('path')
const dicopath = path.join(path.dirname(__dirname), "dico.txt")

describe("Lire un dictionnaire", () => {
    it("sync", () => {
        let words = dico.litSync(dicopath, 5)
        assert.strictEqual(words[0], "ANGLE")
        assert.strictEqual(words[20], "MEUBLE")
    })
})