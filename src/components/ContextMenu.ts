
class CustomContextMenu {
	private menu: HTMLElement;
	private isOpen: boolean;
	private tool: string;
	private color: string;
	private size: number;
	constructor() {
		this.menu = document.createElement('div');
		this.menu.classList.add('context-menu');
		this.isOpen = false;
		this.tool = 'pen';
		this.color = '#000';
		this.size = 5;

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

		const colorOption = this.createOption('Color', () => {
			this.tool = 'color';
			this.close();
			const colorPicker = document.createElement('input');
			colorPicker.classList.add('color-picker');
			colorPicker.style.position = 'absolute';
			colorPicker.style.left = this.menu.style.left;
			colorPicker.style.top = this.menu.style.top;
			colorPicker.type = 'color';
			colorPicker.click();
			colorPicker.addEventListener('input', (e) => {
				this.tool = 'color';
				this.close();
				this.color = (e.target as HTMLInputElement).value;
			});
		})

		const sizeOption = this.createOption('Size', () => {
			this.tool = 'size';
			this.close();
			const sizePicker = document.createElement('input');
			sizePicker.classList.add('size-picker');
			sizePicker.style.position = 'absolute';
			sizePicker.style.left = this.menu.style.left;
			sizePicker.style.top = this.menu.style.top;
			sizePicker.type = 'range';
			sizePicker.min = '1';
			sizePicker.max = '100';
			sizePicker.value = this.size.toString();
			sizePicker.addEventListener('input', (e) => {
				this.tool = 'size';
				this.close();
				this.size = parseInt((e.target as HTMLInputElement).value);
			});
			// after input event, close the menu
			sizePicker.addEventListener('change', () => {
				sizePicker.remove();
				// remove event listener
				sizePicker.removeEventListener('input', () => {});
				sizePicker.removeEventListener('change', () => {});
			});
			// append size picker to body
			document.body.appendChild(sizePicker);
		})

		// Append options to menu
		this.menu.appendChild(penOption);
		this.menu.appendChild(scissorOption);
		this.menu.appendChild(colorOption);
		this.menu.appendChild(sizeOption);

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

	public getTool(): string {
		return this.tool;
	}

	public getColor(): string {
		return this.color;
	}

	public getSize(): number {
		return this.size;
	}

	public setTool(tool: string) {
		this.tool = tool;
	}
}

export default CustomContextMenu;