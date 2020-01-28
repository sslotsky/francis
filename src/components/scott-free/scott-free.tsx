import { Component, Prop, h } from "@stencil/core";

import { keys } from "../../utils";

@Component({
  tag: "scott-free",
  styleUrl: "scott-free.css",
  shadow: true
})
export class ScottFree {
  @Prop() octaves: number = 3;
  @Prop() activeNotes: string[] = [];
  @Prop() playSound: (
    note: string,
    octave: number
  ) => () => void = () => () => {};

  render() {
    const octaves = [...Array(this.octaves).keys()];

    return (
      <ul>
        {octaves.map(octave =>
          keys.map(key => (
            <li
              class={`${key.color} ${key.note.toLocaleLowerCase()}`}
              onMouseDown={this.playSound(key.note, octave + 2)}
              data-active={this.activeNotes.includes(
                `${key.note}${octave + 2}`
              )}
            />
          ))
        )}
      </ul>
    );
  }
}
