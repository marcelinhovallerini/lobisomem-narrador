let howl
let owl
let voicePlayer

window.onload = () => {

    howl = document.getElementById("howlSound")
    owl = document.getElementById("owlSound")

    voicePlayer = document.getElementById("voicePlayer")

}

const audioFiles = {

begin:"narrator_begin.mp3",

sentinelWakeUp:"narrator_sentinel_wakeup.mp3",
sentinelOut:"narrator_sentinel_out.mp3",

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

alphaWakeUp:"narrator_alpha_wakeup.mp3",
alphaOut:"narrator_alpha_out.mp3",

mysticWakeUp:"narrator_mystic_wakeup.mp3",
mysticOut:"narrator_mystic_out.mp3",

minionWakeUp:"narrator_minion_wakeup.mp3",
minionOut:"narrator_minion_out.mp3",

masonsWakeUp:"narrator_masons_wakeup.mp3",
masonsOut:"narrator_masons_out.mp3",

seerWakeUp:"narrator_seer_wakeup.mp3",
seerOut:"narrator_seer_out.mp3",

apprenticeWakeUp:"narrator_apprentice_wakeup.mp3",
apprenticeOut:"narrator_apprentice_out.mp3",

piWakeUp:"narrator_pi_wakeup.mp3",
piOut:"narrator_pi_out.mp3",

robberWakeUp:"narrator_robber_wakeup.mp3",
robberOut:"narrator_robber_out.mp3",

witchWakeUp:"narrator_witch_wakeup.mp3",
witchOut:"narrator_witch_out.mp3",

idiotWakeUp:"narrator_idiot_wakeup.mp3",
idiotOut:"narrator_idiot_out.mp3",

troublemakerWakeUp:"narrator_troublemaker_wakeup.mp3",
troublemakerOut:"narrator_troublemaker_out.mp3",

drunkWakeUp:"narrator_drunk_wakeup.mp3",
drunkOut:"narrator_drunk_out.mp3",

insomniacWakeUp:"narrator_insomniac_wakeup.mp3",
insomniacOut:"narrator_insomniac_out.mp3",

revealerWakeUp:"narrator_revealer_wakeup.mp3",
revealerOut:"narrator_revealer_out.mp3",

curatorWakeUp:"narrator_curator_wakeup.mp3",
curatorOut:"narrator_curator_out.mp3",

everyoneWakeUp:"narrator_everyone_wakeup.mp3",
discussionEnd:"narrator_discussion_end.mp3",
vote:"narrator_vote.mp3"

}

const selectedRoles = {}

function toggleRole(element, role, max){

	if(!selectedRoles[role]){
	selectedRoles[role] = 0
	}

	selectedRoles[role]++

	if(selectedRoles[role] > max){
	selectedRoles[role] = 0
	}

	const count = selectedRoles[role]

	document.getElementById(role+"Count").textContent = count

	if(count === 0){
	element.classList.remove("selected")
	}else{
	element.classList.add("selected")
	}

	updatePlayerCount()

}

function spawnEyes(){

const layer = document.querySelector(".eyes-layer")

const eyes = document.createElement("div")
eyes.className = "eyes"

const left = document.createElement("div")
left.className = "eye"

const right = document.createElement("div")
right.className = "eye"

eyes.appendChild(left)
eyes.appendChild(right)

eyes.style.left = Math.random()*80 + "%"
eyes.style.top = Math.random()*80 + "%"

layer.appendChild(eyes)

setTimeout(()=>{
eyes.remove()
},4000)

}

setInterval(spawnEyes,8000)

function updatePlayerCount(){

let total = 0

for(const role in selectedRoles){
total += selectedRoles[role]
}

document.getElementById("playerCount").textContent = total

}

function showRole(roleName, image){

const container = document.getElementById("activeRole")
const img = document.getElementById("activeRoleImage")
const name = document.getElementById("activeRoleName")

img.src = image
name.textContent = roleName

container.style.display = "block"

}

function hideRole(){

document.getElementById("activeRole").style.display = "none"

}

let forestA = new Audio("floresta.mp3")
let forestB = new Audio("floresta.mp3")

const maxVolume = 0.6
const fadeTime = 2000

forestA.volume = maxVolume
forestB.volume = 0

forestA.play().catch(()=>{})

let current = forestA
let next = forestB

function startCrossfade(){

    next.currentTime = 0
    next.volume = 0
    next.play()

    let step = 0
    let steps = 20

    let fade = setInterval(()=>{

        step++

        current.volume = maxVolume * (1 - step/steps)
        next.volume = maxVolume * (step/steps)

        if(step >= steps){

            clearInterval(fade)

            current.pause()

            let temp = current
            current = next
            next = temp

        }

    }, fadeTime/steps)

}


let audioQueue = Promise.resolve()

function unlockAudios(){

	const audios = [forestA, forestB, owl, howl]

	audios.forEach(audio=>{

		if(!audio) return

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

			const endHandler = () => {
				voicePlayer.removeEventListener("ended", endHandler)
				resolve()
			}

			voicePlayer.addEventListener("ended", endHandler, {once:true})

			voicePlayer.src = file

			voicePlayer.play()
				.then(()=>{})
				.catch(()=>resolve())

		})

	})

	return audioQueue

}

function wait(ms){

	return new Promise(resolve=>setTimeout(resolve,ms))

}

let timerInterval

function startTimer(duration){

	let time = duration
	const timer = document.getElementById("timer")

	timerInterval = setInterval(()=>{

		let minutes = Math.floor(time / 60)
		let seconds = time % 60

		timer.textContent =
		String(minutes).padStart(2,"0") + ":" +
		String(seconds).padStart(2,"0")

		time--

		if(time < 0){

		clearInterval(timerInterval)

		discussionFinished()

		}

	},1000)

}

function resetGame(){
	location.reload();
}

async function startNight(){
	
	document.querySelector(".roles").style.display = "none"
	document.getElementById("roles-title").style.display = "none"

	document.getElementById("startButton").disabled = true

	audioQueue = Promise.resolve()

	unlockAudios()

	await wait(100)

	clearInterval(window.owlInterval)
	
	setInterval(()=>{

    startCrossfade()

}, (forestA.duration*1000) - fadeTime)

	window.owlInterval = setInterval(() => {

	if(owl && owl.paused){
		owl.currentTime = 0
		owl.volume = 0.5
		owl.play()
	}

	},30000)

	await wait(2000)
	await play("begin")
	await wait(2000)

	if(selectedRoles.sentinel){

	showRole("Sentinela","sentinel.jpg")

	await play("sentinelWakeUp")
	await wait(5000)
	await play("sentinelOut")
	hideRole()
	await wait(2000)

	}

	if(selectedRoles.doppelganger){

		showRole("Doppelganger","doppelganger.jpg")

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
	hideRole()
	await wait(2000)

	}

	if(
 (selectedRoles.werewolf || selectedRoles.alpha || selectedRoles.mystic) &&
 !selectedRoles.dream
){

		howl.currentTime = 0
		howl.volume = 1
		howl.play()

		showRole("Lobisomens","werewolf.jpg")

		await play("werewolfWakeUp")

		if(selectedRoles.doppelganger){

			await play("doppelWerewolf")

		}

		await play("werewolfJustOne")
		await wait(5000)

		await play("werewolfOut")
		hideRole()
		await wait(2000)

	}

	if(
 (selectedRoles.werewolf || selectedRoles.alpha || selectedRoles.mystic) &&
 selectedRoles.dream
){

		howl.currentTime = 0
		howl.volume = 1
		howl.play()

		showRole("Lobisomens","werewolf.jpg")

		await play("werewolfDream")

		if(selectedRoles.doppelganger){

			await play("doppelWerewolf")
			await play("doppelDream")

		}

		await play("werewolfJustOne")
		await wait(5000)

		await play("werewolfOut")
		hideRole()
		await wait(2000)

	}

	if(selectedRoles.alpha){

	showRole("Lobisomem Alfa","alpha.jpg")
	await play("alphaWakeUp")
	await wait(5000)
	await play("alphaOut")
	hideRole()
	await wait(2000)

	}

	if(selectedRoles.mystic){

	showRole("Lobisomem Místico","mystic.jpg")
	await play("mysticWakeUp")
	await wait(5000)
	await play("mysticOut")
	hideRole()
	await wait(2000)

	}

	if(selectedRoles.minion){

		showRole("Minion","minion.jpg")

		await play("minionWakeUp")

		if(selectedRoles.doppelganger){

		await play("doppelWerewolfMinion")

		}
		
        await wait(5000)

		await play("minionOut")
		hideRole()
		await wait(2000)

	}


	if(selectedRoles.mason){

		showRole("Mason","mason.jpg")

		await play("masonsWakeUp")

		if(selectedRoles.doppelganger){

			await play("doppelMason")

		}

    	await wait(5000)
		await play("masonsOut")
		hideRole()
		await wait(2000)

	}


	if(selectedRoles.seer){

		showRole("Vidente","seer.jpg")

		await play("seerWakeUp")
		await wait(5000)

		await play("seerOut")
		hideRole()
		await wait(2000)

	}

	if(selectedRoles.apprentice){

	showRole("Aprendiz de Vidente","apprentice.jpg")

	await play("apprenticeWakeUp")
	await wait(5000)
	await play("apprenticeOut")
	hideRole()
	await wait(2000)

	}

	if(selectedRoles.pi){

	showRole("Investigador Paranormal","pi.jpg")

	await play("piWakeUp")
	await wait(5000)
	await play("piOut")
	hideRole()
	await wait(2000)

	}


	if(selectedRoles.robber){
		
		showRole("Ladrão","robber.jpg")

		await play("robberWakeUp")
		await wait(5000)

		await play("robberOut")
		hideRole()
		await wait(2000)

	}

	if(selectedRoles.witch){

	showRole("Bruxa","witch.jpg")

	await play("witchWakeUp")
	await wait(5000)
	await play("witchOut")
	hideRole()
	await wait(2000)

	}

	if(selectedRoles.idiot){

	showRole("Idiota","idiot.jpg")

	await play("idiotWakeUp")
	await wait(5000)
	await play("idiotOut")
	hideRole()
	await wait(2000)

	}

	if(selectedRoles.troublemaker){
	
		showRole("Encrenqueira","troublemaker.jpg")

		await play("troublemakerWakeUp")
		await wait(5000)

		await play("troublemakerOut")
		hideRole()
		await wait(2000)

	}


	if(selectedRoles.drunk){

		showRole("Bêbado","drunk.jpg")

		await play("drunkWakeUp")
		await wait(5000)

		await play("drunkOut")
		hideRole()
		await wait(2000)

	}


	if(selectedRoles.insomniac){

		showRole("Insone","insomniac.jpg")

		await play("insomniacWakeUp")
		await wait(5000)

		await play("insomniacOut")
		hideRole()
		await wait(2000)

		if(selectedRoles.doppelganger){

			await play("doppelInsomniac")
			await wait(5000)
			
			await play("doppelInsomniacOut")
			await wait(2000)

		}

	}

		if(selectedRoles.revealer){

		showRole("Revelador","revealer.jpg")

		await play("revealerWakeUp")
		await wait(5000)
		await play("revealerOut")
		hideRole()
		await wait(2000)

		if(selectedRoles.doppelganger){

			await play("doppelRevealer")
			await wait(5000)
			
			await play("doppelRevealerOut")
			await wait(2000)

		}

		}

		if(selectedRoles.curator){

		showRole("Curador","curator.jpg")

		await play("curatorWakeUp")
		await wait(5000)
		await play("curatorOut")
		hideRole()
		await wait(2000)

		if(selectedRoles.doppelganger){

			await play("doppelCurator")
			await wait(5000)
			
			await play("doppelCuratorOut")
			await wait(2000)

		}

		}


	await play("everyoneWakeUp")

	document.querySelector(".roles").style.display = "none"

	document.getElementById("roles-title").style.display = "none"

	document.getElementById("startButton").style.display = "none"

	document.getElementById("timer").style.display = "block"


	await startTimer(300);


	async function discussionFinished(){

	await play("discussionEnd")
	await wait(2000)
	await play("vote")

	}

}
