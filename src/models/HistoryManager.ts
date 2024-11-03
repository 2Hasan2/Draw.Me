export class HistoryManager {
  private undoStack: ImageData[] = [];
  private redoStack: ImageData[] = [];

  public saveState(canvas: HTMLCanvasElement) {
    const imageData = canvas
      .getContext("2d")!
      .getImageData(0, 0, canvas.width, canvas.height);
    this.undoStack.push(imageData);
    this.redoStack = [];
  }

  public undo(canvas: HTMLCanvasElement) {
    if (this.undoStack.length > 0) {
      const lastState = this.undoStack.pop();
      const ctx = canvas.getContext("2d")!;
      this.redoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // Save current state to redo stack
      if (lastState) {
        ctx.putImageData(lastState, 0, 0);
      }
    }
  }

  public redo(canvas: HTMLCanvasElement) {
    if (this.redoStack.length > 0) {
      const lastRedoState = this.redoStack.pop();
      const ctx = canvas.getContext("2d")!;
      this.undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // Save current state to undo stack
      if (lastRedoState) {
        ctx.putImageData(lastRedoState, 0, 0);
      }
    }
  }
}
