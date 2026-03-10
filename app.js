let howl
let forest
let owl
let voicePlayer

window.onload = () => {

    howl = document.getElementById("howlSound")
    forest = document.getElementById("forestSound")
    owl = document.getElementById("owlSound")

    voicePlayer = document.getElementById("voicePlayer")

}

const audioFiles = {

begin:"narrator_begin.mp3",

sentinelRole:"narrator_sentinel_wakeup.mp3",

doppelWakeUp:"narrator_doppel_wakeup.mp3",
doppelSentinel:"narrator_doppel_sentinel.mp3",
doppelAlpha:"narrator_doppel_alpha.mp3",
doppelMystic:"narrator_doppel_mystic.mp3",
doppelMinion:"narrator_doppel_minion.mp3",
doppelSeer:"narrator_doppel_seer.mp3",
doppelApprentice:"narrator_doppel_apprentice.mp3",
doppelPi:"narrator_doppel_pi.mp3",
doppelRobber:"narrator_doppel_robber.mp3",
doppelWitch:"narrator_doppel_witch.mp3",
doppelIdiot:"narrator_doppel_idiot.mp3",
doppelTroublemaker:"narrator_doppel_troublemaker.mp3",
doppelDrunk:"narrator_doppel_drunk.mp3",
doppelOut:"narrator_doppel_out.mp3",
doppelWerewolf:"narrator_doppel_werewolf.mp3",
doppelDream:"narrator_doppel_dream.mp3",
doppelWerewolfMinion:"narrator_doppel_werewolf_minion.mp3",
doppelMason:"narrator_doppel_mason.mp3",
doppelInsomniac:"narrator_doppel_insomniac.mp3",
doppelInsomniacOut:"narrator_doppel_insomniac_out.mp3",
doppelRevealer:"narrator_doppel_revealer.mp3",
doppelRevealerOut:"narrator_doppel_revealer_out.mp3",
doppelCurator:"narrator_doppel_curator.mp3",
doppelCuratorOut:"narrator_doppel_curator_out.mp3",

werewolfWakeUp:"narrator_werewolf_wakeup.mp3",
werewolfDream:"narrator_werewolf_dream.mp3",
werewolfJustOne:"narrator_werewolf_justone.mp3",
werewolfOut:"narrator_werewolf_out.mp3",

alphaRole:"narrator_alpha_wakeup.mp3",
mysticRole:"narrator_mystic_wakeup.mp3",

minionWakeUp:"narrator_minion_wakeup.mp3",
minionOut:"narrator_minion_out.mp3",

masonsWakeUp:"narrator_masons_wakeup.mp3",
masonsOut:"narrator_masons_out.mp3",

seerWakeUp:"narrator_seer_wakeup.mp3",
seerOut:"narrator_seer_out.mp3",

apprenticeRole:"narrator_apprentice_wakeup.mp3",

piRole:"narrator_pi_wakeup.mp3",

robberWakeUp:"narrator_robber_wakeup.mp3",
robberOut:"narrator_robber_out.mp3",

witchRole:"narrator_witch_wakeup.mp3",

idiotRole:"narrator_idiot_wakeup.mp3",

troublemakerWakeUp:"narrator_troublemaker_wakeup.mp3",
troublemakerOut:"narrator_troublemaker_out.mp3",

drunkWakeUp:"narrator_drunk_wakeup.mp3",
drunkOut:"narrator_drunk_out.mp3",

insomniacWakeUp:"narrator_insomniac_wakeup.mp3",
insomniacOut:"narrator_insomniac_out.mp3",

revealerRole:"narrator_revealer_wakeup.mp3",

curatorRole:"narrator_curator_wakeup.mp3",

everyoneWakeUp:"narrator_everyone_wakeup.mp3",
discussionEnd:"narrator_discussion_end.mp3",
vote:"narrator_vote.mp3"

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

function play(sound){

	const file = audioFiles[sound]

	if(!file) return Promise.resolve()

	audioQueue = audioQueue.then(()=>{

		return new Promise(resolve=>{

			voicePlayer.pause()
			voicePlayer.currentTime = 0
			voicePlayer.src = file

			const endHandler = () => {
				voicePlayer.removeEventListener("ended", endHandler)
				resolve()
			}

			voicePlayer.addEventListener("ended", endHandler)

			const p = voicePlayer.play()

			if(p){
				p.catch(()=>resolve())
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
	await play("begin")
	await wait(2000)

	if(selectedRoles.sentinel){

	await play("sentinelRole")
	await wait(2000)

	}

	if(selectedRoles.doppelganger){

		await play("doppelWakeUp")
		await wait(5000)

		if(selectedRoles.sentinel){

		await play("doppelSentinel")
		await wait(5000)
			
		}

		if(selectedRoles.alpha){

		await play("doppelAlpha")
		await wait(5000)
			
		}

		if(selectedRoles.mystic){

		await play("doppelMystic")
		await wait(5000)
			
		}

		if(selectedRoles.minion){

		await play("doppelMinion")
		await wait(5000)

		}

		if(selectedRoles.seer){

		await play("doppelSeer")
		await wait(5000)

		}

		if(selectedRoles.apprentice){

		await play("doppelApprentice")
		await wait(5000)

		}

		if(selectedRoles.pi){

		await play("doppelPi")
		await wait(5000)

		}

		if(selectedRoles.robber){

		await play("doppelRobber")
		await wait(5000)

		}

		if(selectedRoles.witch){

		await play("doppelWitch")
		await wait(5000)

		}

		if(selectedRoles.idiot){

		await play("doppelIdiot")
		await wait(7000)

		}

		if(selectedRoles.troublemaker){

		await play("doppelTroublemaker")
		await wait(5000)

		}

		if(selectedRoles.drunk){

		await play("doppelDrunk")
		await wait(5000)

		}
	
	await play("doppelOut")
	await wait(2000)

	}

	if(
 (selectedRoles.werewolf || selectedRoles.alpha || selectedRoles.mystic) &&
 !selectedRoles.dream
){

		howl.currentTime = 0
		howl.volume = 1
		howl.play().catch(()=>{})

		await play("werewolfWakeUp")

		if(selectedRoles.doppelganger){

			await play("doppelWerewolf")

		}

		await play("werewolfJustOne")
		await wait(5000)

		await play("werewolfOut")
		await wait(2000)

	}

	if(
 (selectedRoles.werewolf || selectedRoles.alpha || selectedRoles.mystic) &&
 selectedRoles.dream
){

		howl.currentTime = 0
		howl.volume = 1
		howl.play().catch(()=>{})

		await play("werewolfDream")

		if(selectedRoles.doppelganger){

			await play("doppelWerewolf")
			await play("doppelDream")

		}

		await play("werewolfJustOne")
		await wait(5000)

		await play("werewolfOut")
		await wait(2000)

	}

	if(selectedRoles.alpha){

	await play("alphaRole")
	await wait(2000)

	}

	if(selectedRoles.mystic){

	await play("mysticRole")
	await wait(2000)

	}

	if(selectedRoles.minion){

		await play("minionWakeUp")

		if(selectedRoles.doppelganger){

		await play("doppelWerewolfMinion")

		}
		
        await wait(5000)

		await play("minionOut")
		await wait(2000)

	}


	if(selectedRoles.mason){

		await play("masonsWakeUp")

		if(selectedRoles.doppelganger){

			await play("doppelMason")

		}

    	await wait(5000)
		await play("masonsOut")
		await wait(2000)

	}


	if(selectedRoles.seer){

		await play("seerWakeUp")
		await wait(5000)

		await play("seerOut")
		await wait(2000)

	}

	if(selectedRoles.apprentice){

	await play("apprenticeRole")
	await wait(2000)

	}

	if(selectedRoles.pi){

	await play("piRole")
	await wait(2000)

	}


	if(selectedRoles.robber){

		await play("robberWakeUp")
		await wait(5000)

		await play("robberOut")
		await wait(2000)

	}

	if(selectedRoles.witch){

	await play("witchRole")
	await wait(2000)

	}

	if(selectedRoles.idiot){

	await play("idiotRole")
	await wait(2000)

	}

	if(selectedRoles.troublemaker){

		await play("troublemakerWakeUp")
		await wait(5000)

		await play("troublemakerOut")
		await wait(2000)

	}


	if(selectedRoles.drunk){

		await play("drunkWakeUp")
		await wait(5000)

		await play("drunkOut")
		await wait(2000)

	}


	if(selectedRoles.insomniac){

		await play("insomniacWakeUp")
		await wait(5000)

		await play("insomniacOut")
		await wait(2000)

		if(selectedRoles.doppelganger){

			await play("doppelInsomniac")
			await wait(5000)
			
			await play("doppelInsomniacOut")
			await wait(2000)

		}

	}

		if(selectedRoles.revealer){

		await play("revealerRole")
		await wait(2000)

		if(selectedRoles.doppelganger){

			await play("doppelRevealer")
			await wait(5000)
			
			await play("doppelRevealerOut")
			await wait(2000)

		}

		}

		if(selectedRoles.curator){

		await play("curatorRole")
		await wait(2000)

		if(selectedRoles.doppelganger){

			await play("doppelCurator")
			await wait(5000)
			
			await play("doppelCuratorOut")
			await wait(2000)

		}

		}


	await play("everyoneWakeUp")

	document.getElementById("roles-container").style.display = "none";
	document.getElementById("start-container").style.display = "none";
	document.getElementById("roles-title").style.display = "none";
	document.getElementById("timer-container").style.display = "block";


	await iniciarTimerVisual();

	await play("discussionEnd")
	await wait(2000)
	await play("vote")

}




















































