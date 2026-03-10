let howl
let forest1
let forest2
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

	await forest.play()

	setInterval(() => {
  		owl.currentTime = 0;
  		owl.play().catch(()=>{});
	}, 30000);
    
	await begin.play()
	await wait(7000)


	if(selectedRoles.doppelganger){

		await doppelWakeUp.play();
		await wait(16000)

		if(selectedRoles.seer){

			seer.currentTime = 0
			seer.volume = 0.3
			seer.play()

			await doppelSeer.play();
			await wait(15000)

		}

		if(selectedRoles.robber){

			robber.currentTime = 0
			robber.volume = 0.5
			robber.play()

			await doppelRobber.play();
			await wait(16000)

		}

		if(selectedRoles.troublemaker){

			troublemaker.currentTime = 0
			troublemaker.volume = 0.4
			troublemaker.play()

			await doppelTroublemaker.play();
			await wait(16000)

		}

		if(selectedRoles.drunk){

			drunk.currentTime = 0
			drunk.volume = 0.5
			drunk.play()

			await doppelDrunk.play();
			await wait(16000)

		}

		if(selectedRoles.minion){

			minion.currentTime = 0
			minion.volume = 0.1
			minion.play()

		await doppelMinion.play();
		await wait(23000)

		}
	
	await doppelOut.play();
	await wait(6000)

	}

	if(selectedRoles.werewolf){

		howl.currentTime = 0
		howl.volume = 1
		howl.play()

		await werewolfWakeUp.play();
		await wait(6000)

		if(selectedRoles.doppelganger){

			await doppelWerewolf.play()
			await wait(7000)

		}

		await werewolfJustOne.play()
		await wait(13000)

		await werewolfOut.play()
		await wait(5000)

	}


	if(selectedRoles.minion){

		minion.currentTime = 0
		minion.volume = 0.1
		minion.play()

		await minionWakeUp.play()
		await wait(12000)

		if(selectedRoles.doppelganger){

			await doppelWerewolfMinion.play()

		}

		await wait(10000)

		await minionOut.play()
		await wait(9000)

	}


	if(selectedRoles.mason){

		await masonsWakeUp.play()
		await wait(5000)

		if(selectedRoles.doppelganger){

			await doppelMason.play()

		}

		await wait(15000)
	
		await masonsOut.play()
		await wait(7000)

	}


	if(selectedRoles.seer){

		seer.currentTime = 0
		seer.volume = 0.3
		seer.play()

		await seerWakeUp.play()
		await wait(15000)

		await seerOut.play()
		await wait(5000)

	}


	if(selectedRoles.robber){

		robber.currentTime = 0
		robber.volume = 0.5
		robber.play()

		await robberWakeUp.play()
		await wait(18000)

		await robberOut.play()
		await wait(5000)

	}


	if(selectedRoles.troublemaker){

		troublemaker.currentTime = 0
		troublemaker.volume = 0.4
		troublemaker.play()

		await troublemakerWakeUp.play()
		await wait(15000)

		await troublemakerOut.play()
		await wait(5000)

	}


	if(selectedRoles.drunk){

		drunk.currentTime = 0
		drunk.volume = 0.5
		drunk.play()

		await drunkWakeUp.play()
		await wait(15000)

		await drunkOut.play()
		await wait(5000)

	}


	if(selectedRoles.insomniac){

		insomniac.currentTime = 0
		insomniac.volume = 0.3
		insomniac.play()

		await insomniacWakeUp.play()
		await wait(15000)

		await insomniacOut.play()
		await wait(5000)

		if(selectedRoles.doppelganger){

			await doppelInsomniac.play()
			await wait(14000)
			
			await doppelInsomniacOut.play()
			await wait(7000)

		}

	}


	await everyoneWakeUp.play()
	await wait(6000)

	document.getElementById("roles-container").style.display = "none";
	document.getElementById("start-container").style.display = "none";
	document.getElementById("roles-title").style.display = "none";
	document.getElementById("timer-container").style.display = "block";


	iniciarTimerVisual();

	await wait(300000)
	await discussionEnd.play();
	await wait(4000)
	await vote.play()

}



















