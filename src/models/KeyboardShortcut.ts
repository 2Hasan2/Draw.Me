export class KeyboardShortcut {
  private shortcuts: { [key: string]: () => void } = {};

  constructor() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  public addShortcut(keyCombination: string, action: () => void) {
    this.shortcuts[keyCombination] = action;
  }

  private handleKeyDown(event: KeyboardEvent) {
    const keyCombination = this.getKeyCombination(event);
    if (this.shortcuts[keyCombination]) {
      event.preventDefault();
      this.shortcuts[keyCombination]();
    }
  }

  private getKeyCombination(event: KeyboardEvent): string {
    const keys: string[] = [];
    if (event.ctrlKey) keys.push("Control");
    if (event.altKey) keys.push("Alt");
    if (event.shiftKey) keys.push("Shift");
    keys.push(event.key);
    return keys.join("+");
  }
}
