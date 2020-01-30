import { Component, h, State } from "@stencil/core";
import Soundfont from "soundfont-player";

import { keys } from "../../utils";

function getNote(n: number) {
  return {
    note: keys[n % 12].note,
    octave: Math.floor(n / 12) - 1
  };
}

@Component({
  tag: "live-jazz",
  shadow: true
})
export class LiveJazz {
  @State() access: WebMidi.MIDIAccess;
  @State() inputId: string;
  @State() activeNotes: string[] = [];

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
      const { note, octave } = getNote(args[1]);
      this.activeNotes = this.activeNotes.concat(`${note}${octave}`);
    });

    this.player.on("stop", (...args: number[]) => {
      const { note, octave } = getNote(args[1]);
      this.activeNotes = this.activeNotes.filter(n => n !== `${note}${octave}`);
    });
  };

  render() {
    if (this.inputId) {
      console.log(this.activeNotes);
      return (
        <scott-free octaves={5} activeNotes={this.activeNotes}></scott-free>
      );
    }

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
