import { WidgetType, EditorView } from "@codemirror/view";

class ValueWidget extends WidgetType {
  constructor(
    readonly display: string,
    readonly options: Array<{ display: string; value: string }>,
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

    this.options.forEach(({ display, value }) => {
      const optionElement = document.createElement("option");
      optionElement.value = value;
      optionElement.textContent = display;
      select.appendChild(optionElement);
    });

    select.value =
      this.options.find((option) => option.display === this.display)?.value ||
      "";

    select.addEventListener("change", (e) => {
      const target = e.target as HTMLSelectElement;
      this.view.dispatch({
        changes: { from: this.from, to: this.to, insert: target.value },
      });
    });

    return select;
  }
}

export default ValueWidget;
