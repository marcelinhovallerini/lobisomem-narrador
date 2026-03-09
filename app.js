let howl
let forest


window.onload = () => {
howl = document.getElementById("howlSound")
forest = document.getElementById("forestSound")

}

const selectedRoles = {}

function toggleRole(button, role){

if(selectedRoles[role]){

delete selectedRoles[role]
button.classList.remove("selected")

}else{

selectedRoles[role] = true
button.classList.add("selected")

}

}

function speak(text){

return new Promise(resolve=>{

const speech = new SpeechSynthesisUtterance(text)

speech.lang = "pt-BR"

const voices = speechSynthesis.getVoices()

speech.voice = voices.find(v => v.lang === "pt-BR")

speech.rate = 0.9

speech.onend = resolve

speechSynthesis.speak(speech)

})

}

function wait(ms){

return new Promise(resolve=>setTimeout(resolve,ms))

}

function iniciarTimerVisual(){

let tempo = 300;

const timerEl = document.getElementById("timer");

const intervalo = setInterval(()=>{

let minutos = Math.floor(tempo/60);
let segundos = tempo % 60;

timerEl.innerText =
String(minutos).padStart(2,"0")+":"+
String(segundos).padStart(2,"0");

if(tempo <= 30){
timerEl.classList.add("timer-warning");
}

tempo--;

if(tempo < 0){

clearInterval(intervalo);

narrate("Fim do tempo de discussão");

setTimeout(()=> narrate("Votar em 3"),2000);
setTimeout(()=> narrate("2"),3000);
setTimeout(()=> narrate("1"),4000);

}

},1000);

}

function resetGame(){
location.reload();
}

async function startNight(){

forest.currentTime = 0
forest.volume = 1
forest.play()
    
await speak("Todos fechem os olhos.")
await wait(1000)


if(selectedRoles.doppelganger){

await speak("Dopelguenguer, acorde e olhe a carta de algum jogador, você agora assume este papel.")
await wait(6000)

if(selectedRoles.seer){

await speak("Dopelguenguer, se você viu a vidente, olha a carta de um jogador, ou duas cartas do centro.")
await wait(6000)

}

if(selectedRoles.robber){

await speak("Dopelguenguer, se você viu o ladrão, troque de carta com um jogador e veja sua nova carta.")
await wait(6000)

}

if(selectedRoles.troublemaker){

await speak("Dopelguenguer, se você viu o encrenqueiro, troque a carta de dois jogadores sem olhar nenhuma delas.")
await wait(6000)

}

if(selectedRoles.drunk){

await speak("Dopelguenguer, se você viu o bêbado, troque com uma carta do centro sem olhar para ela.")
await wait(6000)

}

if(selectedRoles.minion){

await speak("Dopelguenguer, se você viu um minion, fique de olhos abertos, caso contrário, feche os olhos agora.")
await wait(2000)
await speak("Lobisomens, façam um joinha para que o Minion Dopelguenguer possa reconhecer vocês.")
await wait(8000)

}

await speak("Dopelguenguer, volte a dormir.")
await wait(2000)

}

if(selectedRoles.werewolf){

howl.currentTime = 0
howl.volume = 1
howl.play()

await wait(2000)
await speak("Lobisomens, acordem e olhem uns para os outros. Se houver apenas um lobisomem, você pode olhar uma carta do centro.")

if(selectedRoles.doppelganger){

await speak("Dopelguanger, se você viu um lobisomem, acorde junto com eles agora.")

}

await wait(8000)

await speak("Lobisomens, voltem a dormir.")
await wait(2000)

}


if(selectedRoles.minion){

await speak("Minion, acorde e veja quem são os lobisomens. Lobisomens, façam um joinha para o Minion ver quem vocês são.")

if(selectedRoles.doppelganger){

await speak("Dopelguenguer, se você viu um lobisomem, lembre de fazer um joinha também.")

}

await wait(8000)

await speak("Minion, volte a dormir e lobisomens, recolham a mão.")
await wait(2000)

}


if(selectedRoles.mason){

await speak("Maçons, acordem e se reconheçam.")

if(selectedRoles.doppelganger){

await speak("Dopelguenguer, se você viu um maçon, lembre de acordar junto.")

}

await wait(8000)

await speak("Maçons, voltem a dormir.")
await wait(2000)

}


if(selectedRoles.seer){

await speak("Vidente, acorde e veja uma carta de algum jogador ou duas cartas do centro.")
await wait(8000)

await speak("Vidente, volte a dormir.")
await wait(2000)

}


if(selectedRoles.robber){

await speak("Ladrão, acorde e troque sua carta com outro jogador e veja sua nova carta.")
await wait(8000)

await speak("Ladrão, volte a dormir.")
await wait(2000)

}


if(selectedRoles.troublemaker){

await speak("Encrenqueiro, acorde e troque as cartas de dois jogadores sem ver nenhuma delas.")
await wait(8000)

await speak("Encrenqueiro, volte a dormir.")
await wait(2000)

}


if(selectedRoles.drunk){

await speak("Bêbado, acorde e troque sua carta com uma do centro sem ver sua nova carta.")
await wait(8000)

await speak("Bêbado, volte a dormir.")
await wait(2000)

}


if(selectedRoles.insomniac){

await speak("Insone, acorde e veja sua carta para ver se continua o Insone.")
await wait(8000)

await speak("Insone, volte a dormir.")
await wait(2000)

}

if(selectedRoles.doppelganger){

await speak("Dopelguenguer, se você viu o insone, acorde e veja qual é sua carta agora.")
await wait(6000)

await speak("Dopelguenguer Insone, volte a dormir.")
await wait(2000)

}


await speak("Todos acordem. A discussão começa agora.")

document.getElementById("roles-container").style.display = "none";
document.getElementById("start-container").style.display = "none";
document.getElementById("roles-title").style.display = "none";
document.getElementById("timer-container").style.display = "block";


iniciarTimerVisual();



}
















