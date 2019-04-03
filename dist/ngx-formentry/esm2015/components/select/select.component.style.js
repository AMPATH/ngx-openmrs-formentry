/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const STYLE = `
ng-select {
  display: inline-block;
  margin: 0;
  position: relative;
  vertical-align: middle;
  width: 100%;
}
ng-select * {
  box-sizing: border-box;
  font-family: Sans-Serif;
}
ng-select > div {
  border: 1px solid #ddd;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  width: 100%;
}
ng-select > div.disabled {
  background-color: #eee;
  color: #aaa;
  cursor: default;
  pointer-events: none;
}
ng-select > div > div.single {
  display: flex;
  height: 30px;
  width: 100%;
}
ng-select > div > div.single > div.value,
ng-select > div > div.single > div.placeholder {
  flex: 1;
  line-height: 30px;
  overflow: hidden;
  padding: 0 10px;
  white-space: nowrap;
}
ng-select > div > div.single > div.placeholder {
  color: #a9a9a9;
}
ng-select > div > div.single > div.clear,
ng-select > div > div.single > div.toggle {
  color: #aaa;
  line-height: 30px;
  text-align: center;
  width: 30px;
}
ng-select > div > div.single > div.clear:hover,
ng-select > div > div.single > div.toggle:hover {
  background-color: #ececec;
}
ng-select > div > div.single > div.clear {
  font-size: 18px;
}
ng-select > div > div.single > div.toggle {
  font-size: 14px;
}
ng-select > div > div.multiple {
  display: flex;
  flex-flow: row wrap;
  height: 100%;
  min-height: 30px;
  padding: 0 10px;
  width: 100%;
}
ng-select > div > div.multiple > div.option {
  background-color: #eee;
  border: 1px solid #aaa;
  border-radius: 4px;
  color: #333;
  cursor: default;
  display: inline-block;
  flex-shrink: 0;
  font-size: 14px;
  line-height: 22px;
  margin: 3px 5px 3px 0;
  padding: 0 4px;
}
ng-select > div > div.multiple > div.option span.deselect-option {
  color: #aaa;
  cursor: pointer;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
ng-select > div > div.multiple > div.option span.deselect-option:hover {
  color: #555;
}
ng-select > div > div.multiple input {
  background-color: transparent;
  border: none;
  height: 30px;
  line-height: 30px;
  padding: 0;
}
ng-select > div > div.multiple input:focus {
  outline: none;
}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5zdHlsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQuc3R5bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxNQUFNLE9BQU8sS0FBSyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FtR3BCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFNUWUxFID0gYFxyXG5uZy1zZWxlY3Qge1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBtYXJnaW46IDA7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxubmctc2VsZWN0ICoge1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgZm9udC1mYW1pbHk6IFNhbnMtU2VyaWY7XHJcbn1cclxubmctc2VsZWN0ID4gZGl2IHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHVzZXItc2VsZWN0OiBub25lO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbm5nLXNlbGVjdCA+IGRpdi5kaXNhYmxlZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcclxuICBjb2xvcjogI2FhYTtcclxuICBjdXJzb3I6IGRlZmF1bHQ7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbn1cclxubmctc2VsZWN0ID4gZGl2ID4gZGl2LnNpbmdsZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBoZWlnaHQ6IDMwcHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxubmctc2VsZWN0ID4gZGl2ID4gZGl2LnNpbmdsZSA+IGRpdi52YWx1ZSxcclxubmctc2VsZWN0ID4gZGl2ID4gZGl2LnNpbmdsZSA+IGRpdi5wbGFjZWhvbGRlciB7XHJcbiAgZmxleDogMTtcclxuICBsaW5lLWhlaWdodDogMzBweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHBhZGRpbmc6IDAgMTBweDtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcbm5nLXNlbGVjdCA+IGRpdiA+IGRpdi5zaW5nbGUgPiBkaXYucGxhY2Vob2xkZXIge1xyXG4gIGNvbG9yOiAjYTlhOWE5O1xyXG59XHJcbm5nLXNlbGVjdCA+IGRpdiA+IGRpdi5zaW5nbGUgPiBkaXYuY2xlYXIsXHJcbm5nLXNlbGVjdCA+IGRpdiA+IGRpdi5zaW5nbGUgPiBkaXYudG9nZ2xlIHtcclxuICBjb2xvcjogI2FhYTtcclxuICBsaW5lLWhlaWdodDogMzBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDMwcHg7XHJcbn1cclxubmctc2VsZWN0ID4gZGl2ID4gZGl2LnNpbmdsZSA+IGRpdi5jbGVhcjpob3Zlcixcclxubmctc2VsZWN0ID4gZGl2ID4gZGl2LnNpbmdsZSA+IGRpdi50b2dnbGU6aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNlY2VjZWM7XHJcbn1cclxubmctc2VsZWN0ID4gZGl2ID4gZGl2LnNpbmdsZSA+IGRpdi5jbGVhciB7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG59XHJcbm5nLXNlbGVjdCA+IGRpdiA+IGRpdi5zaW5nbGUgPiBkaXYudG9nZ2xlIHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxubmctc2VsZWN0ID4gZGl2ID4gZGl2Lm11bHRpcGxlIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZmxvdzogcm93IHdyYXA7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIG1pbi1oZWlnaHQ6IDMwcHg7XHJcbiAgcGFkZGluZzogMCAxMHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbm5nLXNlbGVjdCA+IGRpdiA+IGRpdi5tdWx0aXBsZSA+IGRpdi5vcHRpb24ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2FhYTtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgY29sb3I6ICMzMzM7XHJcbiAgY3Vyc29yOiBkZWZhdWx0O1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBmbGV4LXNocmluazogMDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDIycHg7XHJcbiAgbWFyZ2luOiAzcHggNXB4IDNweCAwO1xyXG4gIHBhZGRpbmc6IDAgNHB4O1xyXG59XHJcbm5nLXNlbGVjdCA+IGRpdiA+IGRpdi5tdWx0aXBsZSA+IGRpdi5vcHRpb24gc3Bhbi5kZXNlbGVjdC1vcHRpb24ge1xyXG4gIGNvbG9yOiAjYWFhO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgaGVpZ2h0OiAyMHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xyXG59XHJcbm5nLXNlbGVjdCA+IGRpdiA+IGRpdi5tdWx0aXBsZSA+IGRpdi5vcHRpb24gc3Bhbi5kZXNlbGVjdC1vcHRpb246aG92ZXIge1xyXG4gIGNvbG9yOiAjNTU1O1xyXG59XHJcbm5nLXNlbGVjdCA+IGRpdiA+IGRpdi5tdWx0aXBsZSBpbnB1dCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGhlaWdodDogMzBweDtcclxuICBsaW5lLWhlaWdodDogMzBweDtcclxuICBwYWRkaW5nOiAwO1xyXG59XHJcbm5nLXNlbGVjdCA+IGRpdiA+IGRpdi5tdWx0aXBsZSBpbnB1dDpmb2N1cyB7XHJcbiAgb3V0bGluZTogbm9uZTtcclxufVxyXG5gO1xyXG4iXX0=