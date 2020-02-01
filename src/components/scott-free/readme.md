# scott-free



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute | Description | Type                                           | Default          |
| ------------- | --------- | ----------- | ---------------------------------------------- | ---------------- |
| `activeNotes` | --        |             | `string[]`                                     | `[]`             |
| `octaves`     | `octaves` |             | `number`                                       | `3`              |
| `playSound`   | --        |             | `(note: string, octave: number) => () => void` | `() => () => {}` |


## Dependencies

### Used by

 - [live-jazz](../live-jazz)
 - [them-keys](../them-keys)

### Graph
```mermaid
graph TD;
  live-jazz --> scott-free
  them-keys --> scott-free
  style scott-free fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
