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
	color: new Tool('Color', (x, y, ctx) => {}),
	// function to use a tool
	use: function (tool: string, x: number, y: number, ctx: CanvasRenderingContext2D) {
		let toolName = tool as keyof typeof Tools;
		(Tools[toolName] as Tool).getAction()(x, y, ctx)
	}
}

export default Tools;