import {
  EditorView,
  Decoration,
  DecorationSet,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
import { DEMO_VALUES } from "./constants";

const WidgetPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = createDecorations(view);
    }

    update(update: ViewUpdate) {
      if (update.docChanged) {
        this.decorations = createDecorations(update.view);
      }
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);

function createDecorations(view: EditorView): DecorationSet {
  const widgets: Array<{ from: number; to: number; deco: Decoration }> = [];

  for (const { from, to } of view.visibleRanges) {
    const text = view.state.doc.sliceString(from, to);
    for (const value of DEMO_VALUES) {
      let pos = 0;
      while ((pos = text.indexOf(value, pos)) > -1) {
        const start = from + pos;
        const end = start + value.length;
        widgets.push({
          from: start,
          to: end,
          deco: Decoration.mark({
            class: "cm-demo-value",
            attributes: {
              style:
                "background-color: red; color: white; border-radius: 4px; padding: 2px 4px;",
            },
          }),
        });
        pos = end;
      }
    }
  }

  return Decoration.set(widgets.map((w) => w.deco.range(w.from, w.to)));
}

export default WidgetPlugin;
