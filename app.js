let howl
let forest
let owl
let seer
let troublemaker
let insomniac
let minion
let robber
let drunk

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
	return new Promise(resolve=>{

		audio.pause()
		audio.currentTime = 0

		const endedHandler = () => {
			audio.removeEventListener("ended", endedHandler)
			resolve()
		}

		audio.addEventListener("ended", endedHandler)

		audio.play().catch(()=>{
			resolve()
		})

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

	clearInterval(window.owlInterval)
	
	forest.loop = true
	forest.volume = 0.6
	forest.play().catch(()=>{})

	window.owlInterval = setInterval(() => {

	if(owl.paused){
		owl.currentTime = 0
		owl.volume = 0.5
		owl.play().catch(()=>{})
	}

	},30000)
    
	await play(begin)
	await wait(7000)


	if(selectedRoles.doppelganger){

		await play(doppelWakeUp)
		await wait(16000)

		if(selectedRoles.seer){

			seer.currentTime = 0
			seer.volume = 0.3
			await play(seer)

			await play(doppelSeer)
			await wait(15000)

		}

		if(selectedRoles.robber){

			robber.currentTime = 0
			robber.volume = 0.5
			await play(robber)

			await play(doppelRobber)
			await wait(16000)

		}

		if(selectedRoles.troublemaker){

			troublemaker.currentTime = 0
			troublemaker.volume = 0.4
			await play(troublemaker)

			await play(doppelTroublemaker)
			await wait(16000)

		}

		if(selectedRoles.drunk){

			drunk.currentTime = 0
			drunk.volume = 0.5
			await play(drunk)

			await play(doppelDrunk)
			await wait(16000)

		}

		if(selectedRoles.minion){

			minion.currentTime = 0
			minion.volume = 0.1
			await play(minion)

		await play(doppelMinion)
		await wait(23000)

		}
	
	await play(doppelOut)
	await wait(6000)

	}

	if(selectedRoles.werewolf){

		howl.currentTime = 0
		howl.volume = 1
		await play(howl)

		await play(werewolfWakeUp)
		await wait(6000)

		if(selectedRoles.doppelganger){

			await play(doppelWerewolf)
			await wait(7000)

		}

		await play(werewolfJustOne)
		await wait(13000)

		await play(werewolfOut)
		await wait(5000)

	}


	if(selectedRoles.minion){

		minion.currentTime = 0
		minion.volume = 0.1
		await play(minion)

		await play(minionWakeUp)
		await wait(12000)

		if(selectedRoles.doppelganger){

			await play(doppelWerewolfMinion)

		}

		await wait(10000)

		await play(minionOut)
		await wait(9000)

	}


	if(selectedRoles.mason){

		await play(masonsWakeUp)
		await wait(5000)

		if(selectedRoles.doppelganger){

			await play(doppelMason)

		}

		await wait(15000)
	
		await play(masonsOut)
		await wait(7000)

	}


	if(selectedRoles.seer){

		seer.currentTime = 0
		seer.volume = 0.3
		await play(seer)

		await play(seerWakeUp)
		await wait(15000)

		await play(seerOut)
		await wait(5000)

	}


	if(selectedRoles.robber){

		robber.currentTime = 0
		robber.volume = 0.5
		await play(robber)

		await play(robberWakeUp)
		await wait(18000)

		await play(robberOut)
		await wait(5000)

	}


	if(selectedRoles.troublemaker){

		troublemaker.currentTime = 0
		troublemaker.volume = 0.4
		await play(troublemaker)

		await play(troublemakerWakeUp)
		await wait(15000)

		await play(troublemakerOut)
		await wait(5000)

	}


	if(selectedRoles.drunk){

		drunk.currentTime = 0
		drunk.volume = 0.5
		await play(drunk)

		await play(drunkWakeUp)
		await wait(15000)

		await play(drunkOut)
		await wait(5000)

	}


	if(selectedRoles.insomniac){

		insomniac.currentTime = 0
		insomniac.volume = 0.3
		await play(insomniac)

		await play(insomniacWakeUp)
		await wait(15000)

		await play(insomniacOut)
		await wait(5000)

		if(selectedRoles.doppelganger){

			await play(doppelInsomniac)
			await wait(14000)
			
			await play(doppelInsomniacOut)
			await wait(7000)

		}

	}


	await play(everyoneWakeUp)
	await wait(6000)

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































