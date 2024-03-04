
class CustomContextMenu {
	private menu: HTMLElement;
	private isOpen: boolean;
	private tool: 'pen' | 'scissor';
	constructor() {
		this.menu = document.createElement('div');
		this.menu.classList.add('context-menu');
		this.isOpen = false;
		this.tool = 'pen';

		this.init();
	}

	private init() {
		// Create menu options
		const penOption = this.createOption('Pen', () => {
			this.tool = 'pen';
			this.close();
		});
		const scissorOption = this.createOption('Scissor', () => {
			this.tool = 'scissor';
			this.close();
		});

		// Append options to menu
		this.menu.appendChild(penOption);
		this.menu.appendChild(scissorOption);

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

	public getTool(): 'pen' | 'scissor' {
		return this.tool;
	}
}

export default CustomContextMenu;