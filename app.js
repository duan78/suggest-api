var express = require('express');
var request = require('request');
var iconv = require('iconv');
var app = express();
app.listen(1337);
console.log('Serveur : OK');

app.get('/sug', function (req, res) {
    console.time("Délai");
    var arrsortie = {};
    var KW = req.query.KW ;
    var SRC = req.query.SRC ;
    if (!KW) {
        res.send('Aucun mot clé');
        return;
    }

    var TYPE = req.query.TYPE;
    var numberOfDone = 0;

    if ( TYPE == 'abc' ) {
        var numberToDo = 26;
        for(var i=97; i<123; i++) {
            var abc = String.fromCharCode(i);
            var myKW = KW + ' ' + abc;
            var tempI = i - 97;
            querySuggest(myKW, SRC, tempI, function(sortie, indice){
                if ( sortie.length > 0 ) { arrsortie[indice] = sortie; /*console.log(arrsortie);*/ }
                numberOfDone++;
            });
        }
    }

    if ( TYPE == 'aab' ) {
        //var numberToDo = 676;
        var a = "abcdefghijklmnopqrstuvwxyz";
        var numberToDo = a.length * a.length;
        for (var i = 0; i < a.length; i++) {
            for (var j = 0; j < a.length; j++) {
                var myKW = KW + ' ' + a[i] + a[j];
                var tempI = a[i] + a[j];
                querySuggest(myKW, SRC, tempI, function (sortie, indice) {
                    if (sortie.length > 0) {
                        arrsortie[indice] = sortie;
                        //console.log(arrsortie);
                    }
                    numberOfDone++;
                });
            }
        }
    }

    if ( TYPE == 'num' ) {
        var numberToDo = 101;
        for ( var i = 0; i < 101; i++ ) {
            var myKW = KW + ' ' + i;
            querySuggest(myKW, SRC, i, function(sortie, indice){ // function() => Fonction anonyme callback de la fonction querySuggest, est appelee lorsqu'une query est termineee
                if ( sortie.length > 0 ) { arrsortie[indice] = sortie; /*console.log(arrsortie);*/ }
                numberOfDone++;
            });
        }
    }

    if ( !TYPE ) {
        numberToDo = 1;
        var myKW = KW;
        querySuggest(myKW, SRC, 0, function(sortie, indice){
            if ( sortie.length > 0 ) { arrsortie[indice] = sortie; /*console.log(arrsortie);*/ }
            numberOfDone++;
        });
    }

    if ( TYPE == 'pre' ) {
        numberToDo = 1;
        var myKW = "_" + KW + "_";
        querySuggest(myKW, SRC, 0, function(sortie, indice){
            if ( sortie.length > 0 ) { arrsortie[indice] = sortie; /*console.log(arrsortie);*/ }
            numberOfDone++;
        });
    }

    // On attend que tout soit terminé pour passer à la suite
    var checkInterval = setInterval(function(){
        if ( numberOfDone == numberToDo ) {
            var stringSortie = '';
            res.set({ 'content-type': 'text/html; charset=utf-8' });
            //res.end(testsortie);
            //console.timeEnd("Délai");
            var arrlength = Object.keys(arrsortie).length;

            // Si le tableau n'est pas vide on construit la sortie
            var compteurSortie = 1;
            if ( arrlength !== 0 ) {
                for (var key in arrsortie) {
                    if ( arrsortie.hasOwnProperty(key) ) {
                        stringSortie += arrsortie[key];
                        if ( compteurSortie < arrlength ) stringSortie += ',';
                        compteurSortie++;
                    }
                }
            } else {
                // Le tableau est vide, on remplit la string de sortie avec un message d'erreur
                stringSortie = 'Aucun résultat trouvé';
            }
            res.end(stringSortie);
            clearInterval(checkInterval);
        }
    }, 10);
});

function querySuggest(KW, SRC, indice, callback) {
    var url = "http://clients1.google.fr/complete/search?hl=fr&q=" + KW + "&json=t&client=hp&ds=" + SRC;
    var options = {
        url: url,
        encoding: null
    };
    var ic = new iconv.Iconv('iso-8859-1', 'utf-8');
    request(options, function (err, resp, body) {
        body = ic.convert(body).toString('utf-8');
        body = JSON.parse(body);
        var sortie = '';
        var total = body[1].length - 1;
        for (var i = 0; i < body[1].length; i++) {
            sortie += body[1][i];
            if ( i < total ) sortie += ',';
        }
        callback(sortie, indice);
    });
}