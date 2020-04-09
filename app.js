class DrumKit {
	constructor() {
		this.playBtn = document.querySelector('.play');
		this.muteBtns = document.querySelectorAll('.mute');
		this.pads = document.querySelectorAll('.pad');
		this.kickAudio = document.querySelector('.kick-sound');
		this.snareAudio = document.querySelector('.snare-sound');
		this.hihatAudio = document.querySelector('.hihat-sound');

		this.currentKick = './sounds/kick-classic.wav';
		this.currentSnare = './sounds/snare-acoustic01.wav';
		this.currentHihat = './sounds/hihat-acoustic01.wav';
		this.selects = document.querySelectorAll('select');
		this.tempoSlider = document.querySelector('.tempo__slider');

		this.index = 0;
		this.bpm = 150; //beat per minute
		this.isPlaying = null;
	}

	repeat() {
		let step = this.index % 8;

		const activePads = document.querySelectorAll(`.b${step}`);

		activePads.forEach((pad) => {
			pad.style.animation = `playTrack .3s alternate ease-in-out 2`;

			// CHECK IF PAD ACTIVE
			if (pad.classList.contains('active')) {
				// CHECK EACH SOUND
				if (pad.classList.contains('kick-pad')) {
					this.kickAudio.currentTime = 0;
					this.kickAudio.play();
				}
				if (pad.classList.contains('snare-pad')) {
					this.snareAudio.currentTime = 0;
					this.snareAudio.play();
				}
				if (pad.classList.contains('hihat-pad')) {
					this.hihatAudio.currentTime = 0;
					this.hihatAudio.play();
				}
			}
		});
		this.index++;
	}

	start() {
		const interval = 60 / this.bpm * 1000;
		if (!this.isPlaying) {
			this.isPlaying = setInterval(() => {
				this.repeat();
			}, interval);
		} else {
			// REMOVE INTERVAL
			clearInterval(this.isPlaying);
			this.isPlaying = null;
		}
	}

	activePad() {
		console.log();
		this.classList.toggle('active');
	}

	updateBtn() {
		if (!this.isPlaying) {
			this.playBtn.innerText = 'Stop';
			this.playBtn.classList.add('active');
		} else {
			this.playBtn.innerText = 'Play';
			this.playBtn.classList.remove('active');
		}
	}

	changeSound(event) {
		const selectionName = event.target.name;
		const selectionValue = event.target.value;

		switch (selectionName) {
			case 'kick-track__select':
				this.kickAudio.src = selectionValue;
				break;
			case 'snare-track__select':
				this.snareAudio.src = selectionValue;
				break;
			case 'hihat-track__select':
				this.hihatAudio.src = selectionValue;
				break;
		}
	}

	mute(event) {
		console.log(event);
		const muteIndex = event.target.getAttribute('data-track');
		event.target.classList.toggle('active');
		if (event.target.classList.contains('active')) {
			switch (muteIndex) {
				case '0':
					this.kickAudio.volume = 0;
					break;
				case '1':
					this.snareAudio.volume = 0;
					break;
				case '2':
					this.hihatAudio.volume = 0;
					break;
			}
		} else {
			switch (muteIndex) {
				case '0':
					this.kickAudio.volume = 1;
					break;
				case '1':
					this.snareAudio.volume = 1;
					break;
				case '2':
					this.hihatAudio.volume = 1;
					break;
			}
		}
	}

	changeTempo(event) {
		console.log(event);
		const tempoSpan = document.querySelector('.tempo__span');
		this.bpm = event.target.value;
		tempoSpan.innerText = event.target.value;
	}

	updateTempo(event) {
		clearInterval(this.isPlaying);
		this.isPlaying = null;
		if (this.playBtn.classList.contains('active')) {
			this.start();
		}
	}
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
	pad.addEventListener('click', drumKit.activePad);
	pad.addEventListener('animationend', function() {
		this.style.animation = '';
	});
});

drumKit.playBtn.addEventListener('click', () => {
	drumKit.updateBtn();
	drumKit.start();
});

drumKit.selects.forEach((select) => {
	select.addEventListener('change', (event) => {
		drumKit.changeSound(event);
	});
});

drumKit.muteBtns.forEach((btn) => {
	btn.addEventListener('click', (event) => {
		drumKit.mute(event);
	});
});

drumKit.tempoSlider.addEventListener('input', (event) => {
	drumKit.changeTempo(event);
});

drumKit.tempoSlider.addEventListener('change', (event) => {
	drumKit.updateTempo(event);
});
