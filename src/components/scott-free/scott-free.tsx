import { Component, Prop, h } from "@stencil/core";
import Soundfont from "soundfont-player";

@Component({
  tag: "scott-free",
  styleUrl: "scott-free.css",
  shadow: true
})
export class MyComponent {
  @Prop() octaves: number = 3;

  player: Soundfont.Player;

  componentWillLoad() {
    const ctx = new AudioContext();
    Soundfont.instrument(ctx, "clavinet").then(clavinet => {
      this.player = clavinet;
    });
  }

  playSound = (e: Event) => {
    const key = e.srcElement as HTMLLIElement;
    const note = key.dataset["key"];
    const octave = key.dataset["octave"];
    this.player.play(`${note}${parseInt(octave, 10) + 2}`);
  };

  render() {
    const octaves = [...Array(this.octaves).keys()];

    return (
      <ul>
        {octaves.map(octave => [
          <li
            class="white c"
            data-key="C"
            data-octave={octave + 1}
            onClick={this.playSound}
          />,
          <li
            class="black"
            data-key="C#"
            data-octave={octave + 1}
            onClick={this.playSound}
          />,
          <li
            class="white d"
            data-key="D"
            data-octave={octave + 1}
            onClick={this.playSound}
          />,
          <li
            class="black"
            data-key="D#"
            data-octave={octave + 1}
            onClick={this.playSound}
          />,
          <li
            class="white e"
            data-key="E"
            data-octave={octave + 1}
            onClick={this.playSound}
          />,
          <li
            class="white f"
            data-key="F"
            data-octave={octave + 1}
            onClick={this.playSound}
          />,
          <li
            class="black"
            data-key="F#"
            data-octave={octave + 1}
            onClick={this.playSound}
          />,
          <li
            class="white g"
            data-key="G"
            data-octave={octave + 1}
            onClick={this.playSound}
          />,
          <li
            class="black"
            data-key="G#"
            data-octave={octave + 1}
            onClick={this.playSound}
          />,
          <li
            class="white a"
            data-key="A"
            data-octave={octave + 1}
            onClick={this.playSound}
          />,
          <li
            class="black"
            data-key="A#"
            data-octave={octave + 1}
            onClick={this.playSound}
          />,
          <li
            class="white b"
            data-key="B"
            data-octave={octave + 1}
            onClick={this.playSound}
          />
        ])}
      </ul>
    );
  }
}
