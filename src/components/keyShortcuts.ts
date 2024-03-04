
class KeyShortcuts {
	private shortcuts: { [key: string]: () => void };
	constructor() {
		this.shortcuts = {};
		this.init();
	}

	private init() {
		document.addEventListener('keydown', (e) => {
			const key = e.key;
			if (this.shortcuts[key]) {
				this.shortcuts[key]();
			}
		});
	}

	public addShortcut(key: string, action: () => void) {
		this.shortcuts[key] = action;
	}
}

export default KeyShortcuts;