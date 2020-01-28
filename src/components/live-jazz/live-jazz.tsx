import { Component, h, State } from "@stencil/core";
import Soundfont from "soundfont-player";

@Component({
  tag: "live-jazz",
  shadow: true
})
export class MyComponent {
  @State() access: WebMidi.MIDIAccess;
  @State() inputId: string;

  ctx: AudioContext;
  player: Soundfont.Player;

  start = async () => {
    this.ctx = new AudioContext();
    this.player = await Soundfont.instrument(this.ctx, "clavinet");
    this.access = await navigator.requestMIDIAccess({
      sysex: true
    });
  };

  setInput = (e: Event) => {
    const el = e.srcElement as HTMLSelectElement;
    this.inputId = el.value;
    this.player.listenToMidi(this.access.inputs.get(this.inputId));
    this.player.on("start", (...args: number[]) => {
      console.log(args[1]);
    });
  };

  render() {
    return navigator.requestMIDIAccess ? (
      this.access ? (
        this.access.inputs.size === 0 ? (
          <p>No MIDI inputs detected</p>
        ) : (
          <select onChange={this.setInput}>
            {[...this.access.inputs.values()].map(input => [
              <option hidden>Select a MIDI input</option>,
              <option value={input.id}>{input.name}</option>
            ])}
          </select>
        )
      ) : (
        <button type="button" onClick={this.start}>
          Start
        </button>
      )
    ) : (
      "not supported"
    );
  }
}
