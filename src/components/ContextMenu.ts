
class CustomContextMenu {
	private menu: HTMLElement;
	private isOpen: boolean;

	constructor() {
		this.menu = document.createElement('div');
		this.menu.classList.add('context-menu');
		this.isOpen = false;

		this.init();
	}

	private init() {
		// Create menu options
		const option1 = this.createOption('Option 1', () => {
			console.log('Option 1 selected');
			this.close();
		});
		const option2 = this.createOption('Option 2', () => {
			console.log('Option 2 selected');
			this.close();
		});

		// Append options to menu
		this.menu.appendChild(option1);
		this.menu.appendChild(option2);

		// Append menu to body
		document.body.appendChild(this.menu);

		// Close the menu if clicked anywhere outside of it
		document.addEventListener('click', () => this.close());
	}

	private createOption(label: string, action: () => void): HTMLElement {
		const option = document.createElement('div');
		option.classList.add('context-menu-option');
		option.textContent = label;
		option.addEventListener('click', action);
		return option;
	}

	public showMenu(x: number, y: number) {
		this.isOpen = true;
		this.menu.style.top = `${y}px`;
		this.menu.style.left = `${x}px`;
		this.menu.style.display = 'block';
	}

	private close() {
		if (this.isOpen) {
			this.isOpen = false;
			this.menu.style.display = 'none';
		}
	}
}

export default CustomContextMenu;