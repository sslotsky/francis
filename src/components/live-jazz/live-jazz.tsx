import { Component, h, State, getAssetPath } from "@stencil/core";
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
  styleUrls: ["../styles.css", "styles.css"],
  assetsDir: "../../assets",
  shadow: true
})
export class LiveJazz {
  @State() access: WebMidi.MIDIAccess;
  @State() inputId: string;
  @State() activeNotes: string[] = [];
  @State() starting: boolean;

  ctx: AudioContext;
  player: Soundfont.Player;

  start = async () => {
    const t = setTimeout(() => {
      this.starting = true;
    }, 500);

    this.ctx = new AudioContext();
    this.player = await Soundfont.instrument(this.ctx, "electric_piano_2");
    this.access = await navigator.requestMIDIAccess({
      sysex: true
    });

    clearTimeout(t);
    this.starting = false;
  };

  setInput = (id: string) => () => {
    this.inputId = id;
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
    if (this.starting) {
      return (
        <img
          alt="Spinning Notes"
          class="spin"
          src={getAssetPath("../../assets/notes.png")}
        />
      );
    }

    if (this.inputId) {
      return (
        <scott-free octaves={5} activeNotes={this.activeNotes}></scott-free>
      );
    }

    if (navigator.requestMIDIAccess) {
      if (this.access) {
        if (this.access.inputs.size === 0) {
          return <p>No MIDI inputs detected</p>;
        } else {
          return (
            <div class="inputs">
              {[...this.access.inputs.values()].map(input => [
                <button type="button" onClick={this.setInput(input.id)}>
                  Use {input.name}
                </button>
              ])}
            </div>
          );
        }
      } else {
        return (
          <button type="button" onClick={this.start}>
            Start
          </button>
        );
      }
    }

    return [
      <p class="notice">Your browser does not support Web MIDI.</p>,
      <p class="notice">
        <a target="_blank" href="https://www.google.com/chrome/">
          Please try Chrome browser instead.
        </a>
      </p>
    ];
  }
}
