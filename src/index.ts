class Tool {
    private name: string;
    private action: (x: number, y: number, ctx: CanvasRenderingContext2D) => void;
    constructor(name: string, action: (x: number, y: number, ctx: CanvasRenderingContext2D) => void) {
        this.name = name;
        this.action = action;
    }

    public getName(): string {
        return this.name;
    }

    public getAction(): (x: number, y: number, ctx: CanvasRenderingContext2D) => void {
        return this.action;
    }
}
let Tools = {
    pen: new Tool('Pen', (x, y, ctx) => {
        ctx.save();
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.restore();
    }),
    scissor: new Tool('Scissor', (x, y, ctx) => {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, ctx.lineWidth, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }),
    // function to use a tool
    use: function(tool: string,x:number, y:number,ctx: CanvasRenderingContext2D) {
        let toolName = tool as keyof typeof Tools;
        console.log((Tools[toolName] as Tool).getAction()(x, y, ctx));
    }
}
class LimitlessCanvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private isDrawing: boolean;
    private tool: string;
    private color: string;
    private lineWidth: number;
    private font: string;
    private customContextMenu: CustomContextMenu;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.isDrawing = false;
        this.tool = 'pen';
        this.color = '#000';
        this.lineWidth = 5;
        this.font = 'Arial';
        this.customContextMenu = new CustomContextMenu();
        this.init();
    }

    private init() {
        // Set canvas size
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Attach event listeners
        this.canvas.addEventListener('mousedown', (e) => {
            if (e.button != 0) return;
            this.startDrawing(e)
        });
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        window.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('contextmenu', (e) => this.handleContextMenu(e)); // Handle right-click event

        // Append canvas to the body
        document.body.appendChild(this.canvas);
    }

    private startDrawing(e: MouseEvent) {
        this.isDrawing = true;
        this.draw(e);
    }

    private draw(e: MouseEvent) {
        if (!this.isDrawing) return;

        const x = e.pageX;
        const y = e.pageY;

        switch (this.tool) {
            case 'pen':
                this.ctx.lineWidth = this.lineWidth;
                this.ctx.lineCap = 'round';
                this.ctx.strokeStyle = this.color;
                Tools.use(this.tool,x,y,this.ctx);
                break;
            case 'scissor':
                Tools.use(this.tool,x,y,this.ctx);
                break;
        }
    }

    private stopDrawing() {
        this.isDrawing = false;
        this.ctx.beginPath();
    }

    private handleContextMenu(e: MouseEvent) {
        e.preventDefault();
        this.customContextMenu.showMenu(e.pageX, e.pageY);
    }

    public setColor(color: string) {
        this.color = color;
    }

    public setLineWidth(width: number) {
        this.lineWidth = width;
    }

    public setFont(font: string) {
        this.font = font;
        this.ctx.font = this.font;
    }

    public setTool(tool: string) {
        this.tool = tool;
    }
}





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
        const penOption = this.createOption('Pen', () => {
            limitlessCanvas.setTool('pen');
            this.close();
        });
        const scissorOption = this.createOption('Scissor', () => {
            limitlessCanvas.setTool('scissor');
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
}

// Create an instance of the LimitlessCanvas class
const limitlessCanvas = new LimitlessCanvas();

// Example usage:
limitlessCanvas.setColor('#ff0000'); // Set the drawing color to red
limitlessCanvas.setLineWidth(10); // Set the line width to 10
