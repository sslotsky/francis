import { Component, Prop, h } from "@stencil/core";
import Soundfont from "soundfont-player";

const keys = [
  {
    note: "C",
    color: "white"
  },
  {
    note: "C#",
    color: "black"
  },
  {
    note: "D",
    color: "white"
  },
  {
    note: "D#",
    color: "black"
  },
  {
    note: "E",
    color: "white"
  },
  {
    note: "F",
    color: "white"
  },
  {
    note: "F#",
    color: "black"
  },
  {
    note: "G",
    color: "white"
  },
  {
    note: "G#",
    color: "black"
  },
  {
    note: "A",
    color: "white"
  },
  {
    note: "A#",
    color: "black"
  },
  {
    note: "B",
    color: "white"
  }
];

@Component({
  tag: "scott-free",
  styleUrl: "scott-free.css",
  shadow: true
})
export class MyComponent {
  @Prop() octaves: number = 3;

  ctx: AudioContext = new AudioContext();
  player: Soundfont.Player;

  componentWillLoad() {
    Soundfont.instrument(this.ctx, "clavinet").then(clavinet => {
      this.player = clavinet;
    });
  }

  playSound = (e: Event) => {
    const key = e.srcElement as HTMLLIElement;
    const note = key.dataset["key"];
    const octave = key.dataset["octave"];
    this.player.play(
      `${note}${parseInt(octave, 10) + 2}`,
      this.ctx.currentTime,
      { duration: 1.5 }
    );
  };

  render() {
    const octaves = [...Array(this.octaves).keys()];

    return (
      <ul>
        {octaves.map(octave =>
          keys.map(key => (
            <li
              class={`${key.color} ${key.note.toLocaleLowerCase()}`}
              data-key={key.note}
              data-octave={octave + 1}
              onClick={this.playSound}
            />
          ))
        )}
      </ul>
    );
  }
}
