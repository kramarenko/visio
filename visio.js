export default class Visio {
	antsCount = 1000;

	constructor({ rootEl, width, height }) {

		this.canvas = document.querySelector(rootEl ?? 'canvas');
		this.context = this.canvas.getContext('2d');

		this.canvas.width = width ?? window.innerWidth;
		this.canvas.height = height ?? window.innerHeight;

		this.speed = this.getRandomBetween(3, 20);
		this.ants = [];

		for (let i = 0; i < this.antsCount; i++) {
			this.ants.push({
				x: this.getRandomBetween(0, this.canvas.width),
				y: this.getRandomBetween(0, this.canvas.height),
				color: this.getRandomColor(),
			});
		}

		requestAnimationFrame((x) => this.tick(x));
	}

	getRandomBetween(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	}

	getRandomColor() {
		return `rgb(
			${this.getRandomBetween(0, 255)},
			${this.getRandomBetween(0, 255)},
			${this.getRandomBetween(0, 255)})`;
	}

	getRandomFrom(...array) {
		return array[this.getRandomBetween(0, array.length - 1)];
	}

	tick() {
		requestAnimationFrame((x) => this.tick(x));

		for (const ant of this.ants) {
			this.getRandomFrom(
				() => (ant.x += this.speed),
				() => (ant.x -= this.speed),
				() => (ant.y += this.speed),
				() => (ant.y -= this.speed)
			)();

			if (ant.x < 0) {
				ant.x = 0;
			}
			if (ant.y < 0) {
				ant.y = 0;
			}

			if (ant.x > this.canvas.width) {
				ant.x = this.canvas.width;
			}

			if (ant.y > this.canvas.height) {
				ant.y = this.canvas.height;
			}
		}

		for (const ant of this.ants) {
			this.context.beginPath();
			this.context.fillStyle = ant.color;
			this.context.arc(
				ant.x,
				ant.y,
				this.getRandomBetween(1, 10) / this.speed,
				0,
				2 * Math.PI
			);
			this.context.fill();
		}
	}
}