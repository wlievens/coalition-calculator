export class Party {
  constructor(
    public segment: string,
    public name: string,
    public color: string,
    public seats: number,
    public excluded: boolean = false) {
  }
}
