import { Component, Prop, State, h } from "@stencil/core";
import Soundfont from "soundfont-player";

@Component({
  tag: "them-keys",
  shadow: true
})
export class ThemKeys {
  @Prop() octaves: number = 3;
  @State() initialized: boolean = false;

  ctx: AudioContext;
  player: Soundfont.Player;

  playSound = (note: string, octave: number) => () => {
    this.player.play(`${note}${octave}`, this.ctx.currentTime, {
      duration: 1.5
    });
  };

  start = async () => {
    this.ctx = new AudioContext();
    this.player = await Soundfont.instrument(this.ctx, "clavinet");
    this.initialized = true;
  };

  render() {
    if (!this.initialized) {
      return (
        <button onClick={this.start} type="button">
          Start
        </button>
      );
    }

    return (
      <scott-free
        octaves={this.octaves}
        playSound={this.playSound}
      ></scott-free>
    );
  }
}
