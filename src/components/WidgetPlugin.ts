import {
  EditorView,
  Decoration,
  DecorationSet,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
import ValueWidget from "./ValueWidget";

const WidgetPlugin = (
  collectionData: Array<{ display: string; value: string }>
) =>
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
    },
    {
      decorations: (v) => v.decorations,
      provide: (plugin) =>
        EditorView.atomicRanges.of((view) => {
          return view.plugin(plugin)?.decorations || Decoration.none;
        }),
    }
  );

function createDecorations(
  view: EditorView,
  collectionData: Array<{ display: string; value: string }>
): DecorationSet {
  const widgets: Array<{ from: number; to: number; deco: Decoration }> = [];

  for (const { from, to } of view.visibleRanges) {
    const text = view.state.doc.sliceString(from, to);
    for (const { display, value } of collectionData) {
      let pos = 0;
      while ((pos = text.indexOf(value, pos)) > -1) {
        const start = from + pos;
        const end = start + value.length;
        widgets.push({
          from: start,
          to: end,
          deco: Decoration.replace({
            widget: new ValueWidget(display, collectionData, view, start, end),
            inclusive: true,
          }),
        });
        pos = end;
      }
    }
  }

  // Sort widgets by their 'from' position
  widgets.sort((a, b) => a.from - b.from);

  return Decoration.set(widgets.map((w) => w.deco.range(w.from, w.to)));
}

export default WidgetPlugin;
