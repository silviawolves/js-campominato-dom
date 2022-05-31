'use strict'

//recupero elemento HTML in cui inserire le celle
const containerCampoMinato = document.querySelector('.campo-minato')

//recupero le informazioni del bottone e del select per impostare la difficoltà
const bottonePlay = document.getElementById("bottone-play")

//imposto variabili per il game over e per il punteggio, da aggiornare dopo
let gameOver = false
let punteggio = 0

//gioco base che appare all'apertura della pagina
campoMinato(10, 10)
celleBombe(100)

//creo evento sul bottone play per generare il container
bottonePlay.addEventListener ('click', function() {
    containerCampoMinato.innerHTML = ""
    gameOver = false
    punteggio = 0

    //a seconda dell'opzione selezionata, le caselle generate cambiano
    if (document.getElementById('1').selected) {
        campoMinato(10, 10)
        celleBombe(100)
    } else if (document.getElementById('2').selected) {
        campoMinato(9, 9)
        celleBombe(81)
    } else if (document.getElementById('3').selected) {
        campoMinato(7, 7)
        celleBombe(49)
    }
})

//creo la funzione per generare le sedici bombe, a seconda di quante celle avrò nel campo minato i numeri random si adattano
function celleBombe(max) {
    const bombeCampo = []

    for (let i = 0; i < 16; i++) {
        const indiciBombe = Math.floor((Math.random() * max) + 1)

        if (!bombeCampo.includes(indiciBombe)) {
            bombeCampo.push(indiciBombe)
        } else {
            i--
        }
    }
    return bombeCampo
}

//creo una funzione generica per creare X celle in base al livello di difficolta, che darò dopo
function campoMinato(cellaX, cellaY) {
    //cosa stabilisce la funzione in sé
    const celleRisultanti = cellaX * cellaY

    //riporto qui il dato delle bombe per poterci accedere dopo
    const bombe = celleBombe(celleRisultanti)
    console.log(bombe)

    //assegno una dimensione che aggiusti la quantità di caselle per row, a prescindere da quante celle genero
    containerCampoMinato.style.width = `calc((var(--size) * ${cellaX}) + (2 * var(--border))`

    //creo un ciclo per formare ogni singola cella, che appendo nel container campo-minato
    for (let i = 1; i <= celleRisultanti; i++) {
        const cella = document.createElement('div')
        cella.classList.add('cella')
        containerCampoMinato.append(cella)
        cella.dataset.indice = i

        //aggiungo la funzione eventlistener per accedere a tutti i dati
        onClickEvents(cella, bombe)
    }
}

//creo la funzione per il click sulle celle
function onClickEvents(cella, bombe) {

    cella.addEventListener ('click', function() {

        //creo una costante con l'indice delle caselle, per confrontarla dopo con gli indici delle bombe
        const indiceCella = +this.dataset.indice

        //blocco ulteririori click in queste casistiche
        if (this.classList.contains('bomb-cell') || this.classList.contains('cliccato') || gameOver) {
            return
        }

        //al click, la casella cambia colore ed il punteggio incrementa
        cella.classList.add('cliccato')
        cella.classList.remove('bandierina')
        console.log("hai cliccato sul numero", +cella.dataset.indice)
        punteggio++
        console.log(punteggio)

        //confronto gli indici delle bombe per cambiarci classe al click, se c'è una bomba appare l'alert con il risultato e si blocca tutto
        if (bombe.includes(indiceCella)) {
            cella.classList.remove('cliccato')
            cella.classList.add('bomb-cell')
            gameOver = true
            alert(`'Hai perso! Il tuo punteggio totale è: ${punteggio}'`)
        }
    })

    //aggiungo bandierina al click con il destro
    cella.addEventListener ('contextmenu', function (flag) {
        flag.preventDefault()

        //impedisco di mettere bandierine a gioco finito, o se le caselle sono cliccate
        if (gameOver || this.classList.contains('cliccato')) {
            return
        }

        cella.classList.add('bandierina')
    })
}


/*
x Il computer deve generare 16 numeri casuali compresi nel range della griglia: le bombe. I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella:
x se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
x La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
x Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS:
- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle x
- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
- L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
    con difficoltà 1 => tra 1 e 100 x
    con difficoltà 2 => tra 1 e 81 x
    con difficoltà 3 => tra 1 e 49 x

- al click con il tasto destro su una cella, inseriamo il flag per indicare che la cella potrebbe avere una bomba x
- Il computer deve generare 16 numeri casuali - cioè le bombe - compresi nello stesso range della difficoltà prescelta. x
*/