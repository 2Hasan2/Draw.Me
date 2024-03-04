import Tools from './components/Tools';
import CustomContextMenu from './components/ContextMenu';
import KeyShortcuts from './components/keyShortcuts';
class LimitlessCanvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private isDrawing: boolean;
    private color: string;
    private lineWidth: number;
    private customContextMenu: CustomContextMenu;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.isDrawing = false;
        this.color = '#000';
        this.lineWidth = 5;
        this.customContextMenu = new CustomContextMenu();
        this.init();
    }

    private init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.canvas.addEventListener('mousedown', (e) => {
            if (e.button != 0) return;
            this.startDrawing(e)
        });
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        window.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('contextmenu', (e) => this.handleContextMenu(e)); // Handle right-click event

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
        const tool = this.customContextMenu.getTool();

        switch (tool) {
            case 'pen':
                this.ctx.lineWidth = this.lineWidth;
                this.ctx.lineCap = 'round';
                this.ctx.strokeStyle = this.color;
                Tools.use(tool,x,y,this.ctx);
                break;
            case 'scissor':
                Tools.use(tool,x,y,this.ctx);
                break;
            case 'color':
                this.color = this.customContextMenu.getColor();
                this.customContextMenu.setTool('pen');
                break;
            case "size":
                this.lineWidth = this.customContextMenu.getSize();
                this.customContextMenu.setTool('pen');
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
}

// Create an instance of the LimitlessCanvas class
const limitlessCanvas = new LimitlessCanvas();

const keyShortcuts = new KeyShortcuts();

// Add a shortcut to change the color to red
keyShortcuts.addShortcut('r', () => limitlessCanvas.setColor('#ff0000'));
keyShortcuts.addShortcut('b', () => limitlessCanvas.setColor('#0000ff'));
keyShortcuts.addShortcut('g', () => limitlessCanvas.setColor('#00ff00'));
keyShortcuts.addShortcut('2', () => limitlessCanvas.setLineWidth(2));
keyShortcuts.addShortcut('4', () => limitlessCanvas.setLineWidth(4));
keyShortcuts.addShortcut('6', () => limitlessCanvas.setLineWidth(6));
keyShortcuts.addShortcut('8', () => limitlessCanvas.setLineWidth(8));
keyShortcuts.addShortcut('0', () => limitlessCanvas.setLineWidth(10));



// Example usage:
limitlessCanvas.setColor('#ff0000');
limitlessCanvas.setLineWidth(10);
