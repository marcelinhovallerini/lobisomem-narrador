let howl
let forest
let owl

let begin

let sentinelRole

let doppelWakeUp
let doppelSentinel
let doppelAlpha
let doppelMystic
let doppelMinion
let doppelSeer
let doppelApprentice
let doppelPi
let doppelRobber
let doppelWitch
let doppelIdiot
let doppelTroublemaker
let doppelDrunk
let doppelOut
let doppelWerewolf
let doppelDream
let doppelWerewolfMinion
let doppelMason
let doppelInsomniac
let doppelInsomniacOut
let doppelRevealer
let doppelRevealerOut
let doppelCurator
let doppelCuratorOut

let werewolfWakeUp
let werewolfDream
let werewolfJustOne
let werewolfOut
let alphaRole
let mysticRole

let minionWakeUp
let minionOut

let masonsWakeUp
let masonsOut

let seerWakeUp
let seerOut

let apprenticeRole

let piRole

let robberWakeUp
let robberOut

let witchRole

let idiotRole

let troublemakerWakeUp
let troublemakerOut

let drunkWakeUp
let drunkOut

let insomniacWakeUp
let insomniacOut

let revealerRole

let curatorRole

let everyoneWakeUp
let discussionEnd
let vote

window.onload = () => {

	howl = document.getElementById("howlSound")
	forest = document.getElementById("forestSound")
	owl = document.getElementById("owlSound")

	begin = document.getElementById("begin")

	sentinelRole = document.getElementById("sentinelRole")

	doppelWakeUp = document.getElementById("doppelWakeUp")
	doppelSentinel = document.getElementById("doppelSentinel")
	doppelSeer = document.getElementById("doppelSeer")
	doppelApprentice = document.getElementById("doppelApprentice")
	doppelPi = document.getElementById("doppelPi")
	doppelRobber = document.getElementById("doppelRobber")
	doppelWitch = document.getElementById("doppelWitch")
	doppelIdiot = document.getElementById("doppelIdiot")
	doppelTroublemaker = document.getElementById("doppelTroublemaker")
	doppelDrunk = document.getElementById("doppelDrunk")
	doppelMinion = document.getElementById("doppelMinion")
	doppelOut = document.getElementById("doppelOut")
	doppelWerewolf = document.getElementById("doppelWerewolf")
	doppelDream = document.getElementById("doppelDream")
	doppelAlpha = document.getElementById("doppelAlpha")
	doppelMystic = document.getElementById("doppelMystic")
	doppelWerewolfMinion = document.getElementById("doppelWerewolfMinion")
	doppelMason = document.getElementById("doppelMason")
	doppelInsomniac = document.getElementById("doppelInsomniac")
	doppelInsomniacOut = document.getElementById("doppelInsomniacOut")
	doppelRevealer = document.getElementById("doppelRevealer")
	doppelRevealerOut = document.getElementById("doppelRevealerOut")
	doppelCurator = document.getElementById("doppelCurator")
	doppelCuratorOut = document.getElementById("doppelCuratorOut")

	werewolfWakeUp = document.getElementById("werewolfWakeUp")
	werewolfDream = document.getElementById("werewolfDream")
	werewolfJustOne = document.getElementById("werewolfJustOne")
	werewolfOut = document.getElementById("werewolfOut")
	alphaRole = document.getElementById("alphaRole")
	mysticRole = document.getElementById("mysticRole")

	minionWakeUp = document.getElementById("minionWakeUp")
	minionOut = document.getElementById("minionOut")

	masonsWakeUp = document.getElementById("masonsWakeUp")
	masonsOut = document.getElementById("masonsOut")

	seerWakeUp = document.getElementById("seerWakeUp")
	seerOut = document.getElementById("seerOut")

	apprenticeRole = document.getElementById("apprenticeRole")

	piRole = document.getElementById("piRole")

	robberWakeUp = document.getElementById("robberWakeUp")
	robberOut = document.getElementById("robberOut")

	witchRole = document.getElementById("witchRole")

	idiotRole = document.getElementById("idiotRole")

	troublemakerWakeUp = document.getElementById("troublemakerWakeUp")
	troublemakerOut = document.getElementById("troublemakerOut")

	drunkWakeUp = document.getElementById("drunkWakeUp")
	drunkOut = document.getElementById("drunkOut")

	insomniacWakeUp = document.getElementById("insomniacWakeUp")
	insomniacOut = document.getElementById("insomniacOut")

	revealerRole = document.getElementById("revealerRole")

	curatorRole = document.getElementById("curatorRole")

	everyoneWakeUp = document.getElementById("everyoneWakeUp")
	discussionEnd = document.getElementById("discussionEnd")
	vote = document.getElementById("vote")

	document.querySelectorAll("audio").forEach(a=>{
	a.preload = "metadata"
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
	doppelganger: 1,
	alpha: 1,
	mystic: 1,
	dream: 1,
	sentinel: 1,
	pi: 1,
	witch: 1,
	apprentice: 1,
	idiot: 1,
	revealer: 1,
	curator: 1
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

		audio.muted = true

		audio.play().then(()=>{
			audio.pause()
			audio.currentTime = 0
			audio.muted = false
		}).catch(()=>{})

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
					setTimeout(resolve, (audio.duration || 1) * 1000)
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

	if(owl && owl.paused){
		owl.currentTime = 0
		owl.volume = 0.5
		owl.play().catch(()=>{})
	}

	},30000)

	await wait(2000)
	await play(begin)
	await wait(2000)

	if(selectedRoles.sentinel){

	await play(sentinelRole)
	await wait(2000)

	}

	if(selectedRoles.doppelganger){

		await play(doppelWakeUp)
		await wait(5000)

		if(selectedRoles.sentinel){

		await play(doppelSentinel)
		await wait(5000)
			
		}

		if(selectedRoles.alpha){

		await play(doppelAlpha)
		await wait(5000)
			
		}

		if(selectedRoles.mystic){

		await play(doppelMystic)
		await wait(5000)
			
		}

		if(selectedRoles.minion){

		await play(doppelMinion)
		await wait(5000)

		}

		if(selectedRoles.seer){

		await play(doppelSeer)
		await wait(5000)

		}

		if(selectedRoles.apprentice){

		await play(doppelApprentice)
		await wait(5000)

		}

		if(selectedRoles.pi){

		await play(doppelPi)
		await wait(5000)

		}

		if(selectedRoles.robber){

		await play(doppelRobber)
		await wait(5000)

		}

		if(selectedRoles.witch){

		await play(doppelWitch)
		await wait(5000)

		}

		if(selectedRoles.idiot){

		await play(doppelIdiot)
		await wait(7000)

		}

		if(selectedRoles.troublemaker){

		await play(doppelTroublemaker)
		await wait(5000)

		}

		if(selectedRoles.drunk){

		await play(doppelDrunk)
		await wait(5000)

		}
	
	await play(doppelOut)
	await wait(2000)

	}

	if(
 (selectedRoles.werewolf || selectedRoles.alpha || selectedRoles.mystic) &&
 !selectedRoles.dream
){

		howl.currentTime = 0
		howl.volume = 1
		howl.play().catch(()=>{})

		await play(werewolfWakeUp)

		if(selectedRoles.doppelganger){

			await play(doppelWerewolf)

		}

		await play(werewolfJustOne)
		await wait(5000)

		await play(werewolfOut)
		await wait(2000)

	}

	if(
 (selectedRoles.werewolf || selectedRoles.alpha || selectedRoles.mystic) &&
 selectedRoles.dream
){

		howl.currentTime = 0
		howl.volume = 1
		howl.play().catch(()=>{})

		await play(werewolfDream)

		if(selectedRoles.doppelganger){

			await play(doppelWerewolf)
			await play(doppelDream)

		}

		await play(werewolfJustOne)
		await wait(5000)

		await play(werewolfOut)
		await wait(2000)

	}

	if(selectedRoles.alpha){

	await play(alphaRole)
	await wait(2000)

	}

	if(selectedRoles.mystic){

	await play(mysticRole)
	await wait(2000)

	}

	if(selectedRoles.minion){

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

		await play(seerWakeUp)
		await wait(5000)

		await play(seerOut)
		await wait(2000)

	}

	if(selectedRoles.apprentice){

	await play(apprenticeRole)
	await wait(2000)

	}

	if(selectedRoles.pi){

	await play(piRole)
	await wait(2000)

	}


	if(selectedRoles.robber){

		await play(robberWakeUp)
		await wait(5000)

		await play(robberOut)
		await wait(2000)

	}

	if(selectedRoles.witch){

	await play(witchRole)
	await wait(2000)

	}

	if(selectedRoles.idiot){

	await play(idiotRole)
	await wait(2000)

	}

	if(selectedRoles.troublemaker){

		await play(troublemakerWakeUp)
		await wait(5000)

		await play(troublemakerOut)
		await wait(2000)

	}


	if(selectedRoles.drunk){

		await play(drunkWakeUp)
		await wait(5000)

		await play(drunkOut)
		await wait(2000)

	}


	if(selectedRoles.insomniac){

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

		if(selectedRoles.revealer){

		await play(revealerRole)
		await wait(2000)

		if(selectedRoles.doppelganger){

			await play(doppelRevealer)
			await wait(5000)
			
			await play(doppelRevealerOut)
			await wait(2000)

		}

		}

		if(selectedRoles.curator){

		await play(curatorRole)
		await wait(2000)

		if(selectedRoles.doppelganger){

			await play(doppelCurator)
			await wait(5000)
			
			await play(doppelCuratorOut)
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

















































