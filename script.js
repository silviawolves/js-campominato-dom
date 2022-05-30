'use strict'

//recupero elemento HTML in cui inserire le celle
const containerCampoMinato = document.querySelector('.campo-minato')

//creo la funzione per generare le bombe, a seconda di quante celle avrò nel campo minato
function celleBombe(max) {
    const bombeCampo = []

    for (let i = 1; i <= 16; i++) {
        const indiciBombe = Math.floor(Math.random() * max + 1)

        if (!bombeCampo.includes(indiciBombe)) {
            bombeCampo.push(indiciBombe)
        }
    }
    return bombeCampo
}

console.log(celleBombe(49))

//creo una funzione generica per creare X celle in base al livello di difficolta
//ora settata a 1 = 100 celle
function campoMinato(cellaX, cellaY) {
    //cosa stabilisce la funzione in sé
    const celleRisultanti = cellaX * cellaY

    //assegno una dimensione che aggiusti la quantità di caselle per row, a prescindere da quante celle genero
    containerCampoMinato.style.width = `calc((var(--size) * ${cellaX}) + (2 * var(--border))`

    //creo un ciclo per formare ogni singola cella
    for (let i = 1; i <= celleRisultanti; i++) {
        const cella = document.createElement('div')
        cella.classList.add('cella')
        containerCampoMinato.append(cella)
        cella.dataset.indice = i

        //aggiunto un eventListener per cambiare colore alla cella quando clicco
        cella.addEventListener ('click', function(){
            this.classList.toggle('on-click')
            console.log("hai cliccato sul numero", i)
        })
    }
}

//creo la sezione per settare la difficoltà del gioco
//recupero le informazioni del bottone e del select
const bottonePlay = document.getElementById("bottone-play")

//creo evento sul bottone play per generare il container
bottonePlay.addEventListener ('click', function() {
    containerCampoMinato.innerHTML = ""

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


/*
Il computer deve generare 16 numeri casuali compresi nel range della griglia: le bombe. I numeri nella lista delle bombe non possono essere duplicati.

In seguito l’utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS:
- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
- L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
    con difficoltà 1 => tra 1 e 100
    con difficoltà 2 => tra 1 e 81
    con difficoltà 3 => tra 1 e 49

    - al click con il tasto destro su una cella, inseriamo il flag per indicare che la cella potrebbe avere una bomba
    - Il computer deve generare 16 numeri casuali - cioè le bombe - compresi nello stesso range della difficoltà prescelta.
*/