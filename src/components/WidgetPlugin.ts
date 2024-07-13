import {
  EditorView,
  Decoration,
  DecorationSet,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
import ValueWidget from "./ValueWidget";

const WidgetPlugin = (collectionData: string[]) =>
  ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;

      constructor(view: EditorView) {
        this.decorations = createDecorations(view, collectionData);
      }

      update(update: ViewUpdate) {
        if (update.docChanged) {
          this.decorations = createDecorations(update.view, collectionData);
        }
      }

      getDecorations() {
        return this.decorations;
      }
    },
    {
      decorations: (v) => v.decorations,
    }
  );

function createDecorations(
  view: EditorView,
  collectionData: string[]
): DecorationSet {
  const widgets: Array<{ from: number; to: number; deco: Decoration }> = [];

  for (const { from, to } of view.visibleRanges) {
    const text = view.state.doc.sliceString(from, to);
    for (const value of collectionData) {
      let pos = 0;
      while ((pos = text.indexOf(value, pos)) > -1) {
        const start = from + pos;
        const end = start + value.length;
        const match = value.match(/\{([^{}]+)\}/);
        if (match) {
          widgets.push({
            from: start,
            to: end,
            deco: Decoration.replace({
              widget: new ValueWidget(match[1].trim()),
            }),
          });
        }
        pos = end;
      }
    }
  }

  return Decoration.set(widgets.map((w) => w.deco.range(w.from, w.to)));
}

export default WidgetPlugin;
