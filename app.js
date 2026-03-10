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

	document.querySelectorAll("audio").forEach(a=>{
	a.load()
})

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

let audioQueue = Promise.resolve()
function unlockAudios(){
	const audios = document.querySelectorAll("audio")
	audios.forEach(audio=>{
	audio.load()
	})
	
}


function play(audio){

	if(!audio) return Promise.resolve()

	audioQueue = audioQueue.then(()=>{

		return new Promise(resolve=>{

			audio.pause()
			audio.currentTime = 0

			const endHandler = () => {
				audio.removeEventListener("ended", endHandler)
				resolve()
			}

			audio.addEventListener("ended", endHandler)

			const p = audio.play()

			if(p !== undefined){
				p.catch(()=>{
					resolve()
				})
			}

			if(audio.readyState < 2){
				audio.onloadedmetadata = ()=>{
					setTimeout(resolve, audio.duration * 1000)
				}
			}

		})

	})

	return audioQueue

}

function wait(ms){

	return new Promise(resolve=>setTimeout(resolve,ms))

}

function iniciarTimerVisual(){

	return new Promise(resolve=>{

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

			if(tempo <= 0){
				clearInterval(intervalo)
				resolve() 
			}

			tempo--

		},1000)

	})

}

function resetGame(){
	location.reload();
}

async function startNight(){

	unlockAudios()

	await wait(100)

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

	await wait(2000)
	await play(begin)
	await wait(2000)

	if(selectedRoles.doppelganger){

		await play(doppelWakeUp)
		await wait(5000)

		if(selectedRoles.seer){

			seer.currentTime = 0
			seer.volume = 0.3
			seer.play()

			await play(doppelSeer)
			await wait(5000)

		}

		if(selectedRoles.robber){

			robber.currentTime = 0
			robber.volume = 0.5
			robber.play()

			await play(doppelRobber)
			await wait(5000)

		}

		if(selectedRoles.troublemaker){

			troublemaker.currentTime = 0
			troublemaker.volume = 0.4
			troublemaker.play()

			await play(doppelTroublemaker)
			await wait(5000)

		}

		if(selectedRoles.drunk){

			drunk.currentTime = 0
			drunk.volume = 0.5
			drunk.play()

			await play(doppelDrunk)
			await wait(5000)

		}

		if(selectedRoles.minion){

			minion.currentTime = 0
			minion.volume = 0.1
			minion.play()

		await play(doppelMinion)
		await wait(5000)

		}
	
	await play(doppelOut)
	await wait(2000)

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
		await wait(5000)

		await play(werewolfOut)
		await wait(2000)

	}


	if(selectedRoles.minion){

		minion.currentTime = 0
		minion.volume = 0.1
		minion.play()

		await play(minionWakeUp)

		if(selectedRoles.doppelganger){

			await play(doppelWerewolfMinion)

		}
		
        await wait(5000)

		await play(minionOut)
		await wait(2000)

	}


	if(selectedRoles.mason){

		await play(masonsWakeUp)

		if(selectedRoles.doppelganger){

			await play(doppelMason)

		}

    	await wait(5000)
		await play(masonsOut)
		await wait(2000)

	}


	if(selectedRoles.seer){

		seer.currentTime = 0
		seer.volume = 0.3
		seer.play()

		await play(seerWakeUp)
		await wait(5000)

		await play(seerOut)
		await wait(2000)

	}


	if(selectedRoles.robber){

		robber.currentTime = 0
		robber.volume = 0.5
		robber.play()

		await play(robberWakeUp)
		await wait(5000)

		await play(robberOut)
		await wait(2000)

	}


	if(selectedRoles.troublemaker){

		troublemaker.currentTime = 0
		troublemaker.volume = 0.4
		troublemaker.play()

		await play(troublemakerWakeUp)
		await wait(5000)

		await play(troublemakerOut)
		await wait(2000)

	}


	if(selectedRoles.drunk){

		drunk.currentTime = 0
		drunk.volume = 0.5
		drunk.play()

		await play(drunkWakeUp)
		await wait(5000)

		await play(drunkOut)
		await wait(2000)

	}


	if(selectedRoles.insomniac){

		insomniac.currentTime = 0
		insomniac.volume = 0.3
		insomniac.play()

		await play(insomniacWakeUp)
		await wait(5000)

		await play(insomniacOut)
		await wait(2000)

		if(selectedRoles.doppelganger){

			await play(doppelInsomniac)
			await wait(5000)
			
			await play(doppelInsomniacOut)
			await wait(2000)

		}

	}


	await play(everyoneWakeUp)

	document.getElementById("roles-container").style.display = "none";
	document.getElementById("start-container").style.display = "none";
	document.getElementById("roles-title").style.display = "none";
	document.getElementById("timer-container").style.display = "block";


	iniciarTimerVisual();

	await play(discussionEnd)
	await wait(2000)
	await play(vote)

}











































