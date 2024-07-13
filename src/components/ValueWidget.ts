import { WidgetType } from "@codemirror/view";

class ValueWidget extends WidgetType {
  constructor(readonly value: string) {
    super();
  }

  toDOM() {
    const span = document.createElement("span");
    span.className = "cm-demo-value";
    span.textContent = this.value;
    span.style.backgroundColor = "gray";
    span.style.color = "white";
    span.style.borderRadius = "4px";
    span.style.padding = "2px 4px";
    return span;
  }
}

export default ValueWidget;
