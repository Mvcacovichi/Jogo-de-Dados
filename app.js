let randomnumber1 = Math.floor(Math.random () *6) +1

let randomDadoImage = 'Dado' + randomnumber1 + '.png' //dice2.png

let randomImageSource = 'img/' + randomDadoImage // img/dado2.png

let image1 = document.querySelectorAll ('img') [0] 

image1.setAttribute ('src', randomImageSource)



let randomNumber2 = Math.floor ( Math.random ()* 6) +1

let randomImageSource2 = 'img/Dado' + randomNumber2  + '.png'

document.querySelectorAll ('img') [1].setAttribute ('src', randomImageSource2)

if ( randomnumber1 > randomNumber2) {
   document.querySelector ('h1').innerHTML = '🏆 Jogador 1 ganhou'
} else if ( randomNumber2 > randomnumber1) { 
   document.querySelector ('h1').innerHTML = '🏆 Jogador 2 ganhou'

} else { document.querySelector ('h1').innerHTML = '⚔ Empate ⚔ '
}