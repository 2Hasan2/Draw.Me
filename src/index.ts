class LimitlessCanvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private isDrawing: boolean;
    private tool: string;
    private color: string;
    private lineWidth: number;
    private font: string;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.tool = 'pen';
        this.color = '#000';
        this.lineWidth = 5;
        this.font = 'Arial';

        this.init();
    }

    private init() {
        // Set canvas size
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Attach event listeners
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        window.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('contextmenu', (e) => this.handleContextMenu(e));

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

                this.ctx.lineTo(x, y);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                break;
            case 'scissor':
                this.ctx.clearRect(x - 10, y - 10, 20, 20);
                break;
        }
    }

    private stopDrawing() {
        this.isDrawing = false;
        this.ctx.beginPath();
    }

    private handleContextMenu(e: MouseEvent) {
        e.preventDefault(); // Prevent default context menu

        // Toggle between tools on right-click
        if (this.tool === 'pen') {
            this.tool = 'scissor';
        } else {
            this.tool = 'pen';
        }
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
}

const limitlessCanvas = new LimitlessCanvas();

limitlessCanvas.setColor('#ff0000');
limitlessCanvas.setLineWidth(10);
