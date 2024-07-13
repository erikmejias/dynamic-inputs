import { WidgetType, EditorView } from "@codemirror/view";

class ValueWidget extends WidgetType {
  constructor(
    readonly value: string,
    readonly options: string[],
    readonly view: EditorView,
    readonly from: number,
    readonly to: number
  ) {
    super();
  }

  toDOM() {
    const select = document.createElement("select");
    select.className = "cm-demo-value";
    select.style.backgroundColor = "gray";
    select.style.color = "white";
    select.style.borderRadius = "4px";
    select.style.padding = "2px 4px";

    this.options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      select.appendChild(optionElement);
    });

    select.value = this.value;

    select.addEventListener("change", (e) => {
      const target = e.target as HTMLSelectElement;
      const newValue = `{{wf {${target.value}} }}`;
      this.view.dispatch({
        changes: { from: this.from, to: this.to, insert: newValue },
      });
    });

    return select;
  }
}

export default ValueWidget;
