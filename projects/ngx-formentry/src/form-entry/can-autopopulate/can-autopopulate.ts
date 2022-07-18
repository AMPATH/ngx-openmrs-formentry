export interface CanAutopopulate {
  autopopulate: Function;
  setAutopopulateFn(newAutopopulate: Function);
  updateAutopopulatedValue();
}
