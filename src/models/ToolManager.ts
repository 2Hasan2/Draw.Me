export enum Tool {
  FreePen = "FreePen",
  Eraser = "Eraser",
  Rectangle = "Rectangle",
  Line = "Line",
}

export class ToolManager {
  private currentTool: Tool = Tool.FreePen;
  private startX: number = 0;
  private startY: number = 0;
  private currentColor: string = "#000000";
  private currentSize: number = 5;

  constructor() {}

  public setTool(tool: Tool) {
    this.currentTool = tool;
  }

  public setColor(color: string) {
    this.currentColor = color;
  }

  public setSize(size: number) {
    this.currentSize = size;
  }

  public startDrawing(event: MouseEvent) {
    this.startX = event.offsetX;
    this.startY = event.offsetY;
  }

  public draw(event: MouseEvent, ctx: CanvasRenderingContext2D) {
    switch (this.currentTool) {
      case Tool.FreePen:
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.strokeStyle = this.currentColor;
        ctx.lineWidth = this.currentSize;
        ctx.stroke();
        break;

      case Tool.Eraser:
        ctx.clearRect(
          event.offsetX - this.currentSize / 2,
          event.offsetY - this.currentSize / 2,
          this.currentSize,
          this.currentSize
        );
        break;

      case Tool.Rectangle:
        const rectWidth = event.offsetX - this.startX;
        const rectHeight = event.offsetY - this.startY;
        ctx.strokeStyle = this.currentColor;
        ctx.lineWidth = this.currentSize;
        ctx.strokeRect(this.startX, this.startY, rectWidth, rectHeight);
        break;

      case Tool.Line:
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.strokeStyle = this.currentColor;
        ctx.lineWidth = this.currentSize;
        ctx.stroke();
        break;
    }
  }
}
