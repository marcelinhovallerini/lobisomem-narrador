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

let tempo = 300; // 5 minutos em segundos

const timerEl = document.getElementById("timer");

const intervalo = setInterval(()=>{

let minutos = Math.floor(tempo/60);
let segundos = tempo % 60;

timerEl.innerText =
String(minutos).padStart(2,"0") + ":" +
String(segundos).padStart(2,"0");

tempo--;

if(tempo < 0){

clearInterval(intervalo);

speak("Fim do tempo de discussão.");

setTimeout(()=> speak("Votar em 3"),2000);
setTimeout(()=> speak("2"),3000);
setTimeout(()=> speak("1"),4000);

}

},1000);

}

async function startNight(){

forest.currentTime = 0
forest.volume = 1
forest.play()
    
await speak("Todos fechem os olhos.")
await wait(1000)


if(selectedRoles.werewolf){

howl.currentTime = 0
howl.volume = 1
howl.play()

await wait(2000)
await speak("Lobisomens, acordem e olhem uns para os outros. Se houver apenas um lobisomem, você pode olhar uma carta do centro.")
await wait(10000)

await speak("Lobisomens, voltem a dormir.")
await wait(3000)

}


if(selectedRoles.minion){

await speak("Minion, acorde e veja quem são os lobisomens. Lobisomens, façam um joinha para o Minion ver quem vocês são.")
await wait(10000)

await speak("Minion, volte a dormir e lobisomens, recolham a mão.")
await wait(3000)

}


if(selectedRoles.mason){

await speak("Maçons, acordem e se reconheçam.")
await wait(10000)

await speak("Maçons, voltem a dormir.")
await wait(3000)

}


if(selectedRoles.seer){

await speak("Vidente, acorde e veja uma carta de algum jogador ou duas cartas do centro.")
await wait(10000)

await speak("Vidente, volte a dormir.")
await wait(3000)

}


if(selectedRoles.robber){

await speak("Ladrão, acorde e troque sua carta com outro jogador e veja sua nova carta.")
await wait(10000)

await speak("Ladrão, volte a dormir.")
await wait(3000)

}


if(selectedRoles.troublemaker){

await speak("Encrenqueiro, acorde e troque as cartas de dois jogadores sem ver nenhuma delas.")
await wait(10000)

await speak("Encrenqueiro, volte a dormir.")
await wait(3000)

}


if(selectedRoles.drunk){

await speak("Bêbado, acorde e troque sua carta com uma do centro sem ver sua nova carta.")
await wait(10000)

await speak("Bêbado, volte a dormir.")
await wait(3000)

}


if(selectedRoles.insomniac){

await speak("Insone, acorde e veja sua carta para ver se continua o Insone.")
await wait(10000)

await speak("Insone, volte a dormir.")
await wait(3000)

}


await speak("Todos acordem. A discussão começa agora.")

iniciarTimerVisual();



}
















