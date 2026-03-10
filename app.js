let howl
let forest
let owl
let seer
let troublemaker
let insomniac
let minion
let robber
let drunk

let begin
let doppelWakeUp
let doppelSeer
let doppelRobber
let doppelTroublemaker
let doppelDrunk
let doppelMinion
let doppelOut
let doppelWerewolf
let doppelWerewolfMinion
let doppelMason
let doppelInsomniac
let doppelInsomniacOut

let werewolfWakeUp
let werewolfJustOne
let werewolfOut

let minionWakeUp
let minionOut

let masonsWakeUp
let masonsOut

let seerWakeUp
let seerOut

let robberWakeUp
let robberOut

let troublemakerWakeUp
let troublemakerOut

let drunkWakeUp
let drunkOut

let insomniacWakeUp
let insomniacOut

let everyoneWakeUp
let discussionEnd
let vote

window.onload = () => {

	seer = document.getElementById("seerSound")
	howl = document.getElementById("howlSound")
	forest = document.getElementById("forestSound")
	owl = document.getElementById("owlSound")
	troublemaker = document.getElementById("gigglesSound")
	insomniac = document.getElementById("yawnSound")
	minion = document.getElementById("whispersSound")
	robber = document.getElementById("bladeSound")
	drunk = document.getElementById("bottleSound")

	begin = document.getElementById("begin")

	doppelWakeUp = document.getElementById("doppelWakeUp")
	doppelSeer = document.getElementById("doppelSeer")
	doppelRobber = document.getElementById("doppelRobber")
	doppelTroublemaker = document.getElementById("doppelTroublemaker")
	doppelDrunk = document.getElementById("doppelDrunk")
	doppelMinion = document.getElementById("doppelMinion")
	doppelOut = document.getElementById("doppelOut")
	doppelWerewolf = document.getElementById("doppelWerewolf")
	doppelWerewolfMinion = document.getElementById("doppelWerewolfMinion")
	doppelMason = document.getElementById("doppelMason")
	doppelInsomniac = document.getElementById("doppelInsomniac")
	doppelInsomniacOut = document.getElementById("doppelInsomniacOut")

	werewolfWakeUp = document.getElementById("werewolfWakeUp")
	werewolfJustOne = document.getElementById("werewolfJustOne")
	werewolfOut = document.getElementById("werewolfOut")

	minionWakeUp = document.getElementById("minionWakeUp")
	minionOut = document.getElementById("minionOut")

	masonsWakeUp = document.getElementById("masonsWakeUp")
	masonsOut = document.getElementById("masonsOut")

	seerWakeUp = document.getElementById("seerWakeUp")
	seerOut = document.getElementById("seerOut")

	robberWakeUp = document.getElementById("robberWakeUp")
	robberOut = document.getElementById("robberOut")

	troublemakerWakeUp = document.getElementById("troublemakerWakeUp")
	troublemakerOut = document.getElementById("troublemakerOut")

	drunkWakeUp = document.getElementById("drunkWakeUp")
	drunkOut = document.getElementById("drunkOut")

	insomniacWakeUp = document.getElementById("insomniacWakeUp")
	insomniacOut = document.getElementById("insomniacOut")

	everyoneWakeUp = document.getElementById("everyoneWakeUp")
	discussionEnd = document.getElementById("discussionEnd")
	vote = document.getElementById("vote")

}

const selectedRoles = {}

const roleLimits = {
	werewolf: 2,
	mason: 2,
	villager: 3,
	seer: 1,
	robber: 1,
	troublemaker: 1,
	drunk: 1,
	insomniac: 1,
	tanner: 1,
	hunter: 1,
	minion: 1,
	doppelganger: 1
}

function updateCount(button, count){

	let span = button.querySelector(".count")

	if(!span){
		span = document.createElement("span")
		span.className = "count"
		button.appendChild(span)
	}

	span.textContent = " x" + count

}

function toggleRole(button, role){

	const limit = roleLimits[role] || 1

	if(!selectedRoles[role]){
		selectedRoles[role] = 1
		button.classList.add("selected")

	}else{

	if(selectedRoles[role] >= limit){

		delete selectedRoles[role]
		button.classList.remove("selected")
		button.querySelector(".count")?.remove()
		return

	}

	selectedRoles[role]++

	}

	updateCount(button, selectedRoles[role])

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

function unlockAudios(){

	const audios = document.querySelectorAll("audio")

	audios.forEach(audio=>{
		audio.play().then(()=>{
			audio.pause()
			audio.currentTime = 0
		}).catch(()=>{})
	})

}

function play(audio){
	return new Promise(resolve => {

		if(!audio){
			resolve()
			return
		}

		audio.pause()
		audio.currentTime = 0

		const end = () => {
			audio.removeEventListener("ended", end)
			resolve()
		}

		audio.addEventListener("ended", end)

		audio.play().catch(resolve)

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

		}

	},1000);

}

function resetGame(){
	location.reload();
}

async function startNight(){

	unlockAudios()

	clearInterval(window.owlInterval)
	
	if(forest){
	forest.loop = true
	forest.volume = 0.6
	forest.play().catch(()=>{})
	}

	window.owlInterval = setInterval(() => {

	if(owl.paused){
		owl.currentTime = 0
		owl.volume = 0.5
		owl.play().catch(()=>{})
	}

	},30000)
    
	await play(begin)

	if(selectedRoles.doppelganger){

		await play(doppelWakeUp)

		if(selectedRoles.seer){

			seer.currentTime = 0
			seer.volume = 0.3
			seer.play()

			await play(doppelSeer)

		}

		if(selectedRoles.robber){

			robber.currentTime = 0
			robber.volume = 0.5
			robber.play()

			await play(doppelRobber)

		}

		if(selectedRoles.troublemaker){

			troublemaker.currentTime = 0
			troublemaker.volume = 0.4
			troublemaker.play()

			await play(doppelTroublemaker)

		}

		if(selectedRoles.drunk){

			drunk.currentTime = 0
			drunk.volume = 0.5
			drunk.play()

			await play(doppelDrunk)

		}

		if(selectedRoles.minion){

			minion.currentTime = 0
			minion.volume = 0.1
			minion.play()

		await play(doppelMinion)

		}
	
	await play(doppelOut)

	}

	if(selectedRoles.werewolf){

		howl.currentTime = 0
		howl.volume = 1
		howl.play()

		await play(werewolfWakeUp)

		if(selectedRoles.doppelganger){

			await play(doppelWerewolf)

		}

		await play(werewolfJustOne)

		await play(werewolfOut)

	}


	if(selectedRoles.minion){

		minion.currentTime = 0
		minion.volume = 0.1
		minion.play()

		await play(minionWakeUp)

		if(selectedRoles.doppelganger){

			await play(doppelWerewolfMinion)

		}


		await play(minionOut)

	}


	if(selectedRoles.mason){

		await play(masonsWakeUp)

		if(selectedRoles.doppelganger){

			await play(doppelMason)

		}
	
		await play(masonsOut)

	}


	if(selectedRoles.seer){

		seer.currentTime = 0
		seer.volume = 0.3
		seer.play()

		await play(seerWakeUp)

		await play(seerOut)

	}


	if(selectedRoles.robber){

		robber.currentTime = 0
		robber.volume = 0.5
		robber.play()

		await play(robberWakeUp)

		await play(robberOut)

	}


	if(selectedRoles.troublemaker){

		troublemaker.currentTime = 0
		troublemaker.volume = 0.4
		troublemaker.play()

		await play(troublemakerWakeUp)

		await play(troublemakerOut)

	}


	if(selectedRoles.drunk){

		drunk.currentTime = 0
		drunk.volume = 0.5
		drunk.play()

		await play(drunkWakeUp)

		await play(drunkOut)

	}


	if(selectedRoles.insomniac){

		insomniac.currentTime = 0
		insomniac.volume = 0.3
		insomniac.play()

		await play(insomniacWakeUp)

		await play(insomniacOut)

		if(selectedRoles.doppelganger){

			await play(doppelInsomniac)
			
			await play(doppelInsomniacOut)

		}

	}


	await play(everyoneWakeUp)

	document.getElementById("roles-container").style.display = "none";
	document.getElementById("start-container").style.display = "none";
	document.getElementById("roles-title").style.display = "none";
	document.getElementById("timer-container").style.display = "block";


	iniciarTimerVisual();

	await wait(300000)
	await play(discussionEnd)
	await wait(4000)
	await play(vote)

}







































