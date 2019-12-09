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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5zdHlsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQuc3R5bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FtR3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgU1RZTEUgPSBgXG5uZy1zZWxlY3Qge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbjogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICB3aWR0aDogMTAwJTtcbn1cbm5nLXNlbGVjdCAqIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZm9udC1mYW1pbHk6IFNhbnMtU2VyaWY7XG59XG5uZy1zZWxlY3QgPiBkaXYge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICB3aWR0aDogMTAwJTtcbn1cbm5nLXNlbGVjdCA+IGRpdi5kaXNhYmxlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gIGNvbG9yOiAjYWFhO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxubmctc2VsZWN0ID4gZGl2ID4gZGl2LnNpbmdsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogMzBweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5uZy1zZWxlY3QgPiBkaXYgPiBkaXYuc2luZ2xlID4gZGl2LnZhbHVlLFxubmctc2VsZWN0ID4gZGl2ID4gZGl2LnNpbmdsZSA+IGRpdi5wbGFjZWhvbGRlciB7XG4gIGZsZXg6IDE7XG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nOiAwIDEwcHg7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5uZy1zZWxlY3QgPiBkaXYgPiBkaXYuc2luZ2xlID4gZGl2LnBsYWNlaG9sZGVyIHtcbiAgY29sb3I6ICNhOWE5YTk7XG59XG5uZy1zZWxlY3QgPiBkaXYgPiBkaXYuc2luZ2xlID4gZGl2LmNsZWFyLFxubmctc2VsZWN0ID4gZGl2ID4gZGl2LnNpbmdsZSA+IGRpdi50b2dnbGUge1xuICBjb2xvcjogI2FhYTtcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDMwcHg7XG59XG5uZy1zZWxlY3QgPiBkaXYgPiBkaXYuc2luZ2xlID4gZGl2LmNsZWFyOmhvdmVyLFxubmctc2VsZWN0ID4gZGl2ID4gZGl2LnNpbmdsZSA+IGRpdi50b2dnbGU6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWNlY2VjO1xufVxubmctc2VsZWN0ID4gZGl2ID4gZGl2LnNpbmdsZSA+IGRpdi5jbGVhciB7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cbm5nLXNlbGVjdCA+IGRpdiA+IGRpdi5zaW5nbGUgPiBkaXYudG9nZ2xlIHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxubmctc2VsZWN0ID4gZGl2ID4gZGl2Lm11bHRpcGxlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBtaW4taGVpZ2h0OiAzMHB4O1xuICBwYWRkaW5nOiAwIDEwcHg7XG4gIHdpZHRoOiAxMDAlO1xufVxubmctc2VsZWN0ID4gZGl2ID4gZGl2Lm11bHRpcGxlID4gZGl2Lm9wdGlvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNhYWE7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY29sb3I6ICMzMzM7XG4gIGN1cnNvcjogZGVmYXVsdDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmbGV4LXNocmluazogMDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMjJweDtcbiAgbWFyZ2luOiAzcHggNXB4IDNweCAwO1xuICBwYWRkaW5nOiAwIDRweDtcbn1cbm5nLXNlbGVjdCA+IGRpdiA+IGRpdi5tdWx0aXBsZSA+IGRpdi5vcHRpb24gc3Bhbi5kZXNlbGVjdC1vcHRpb24ge1xuICBjb2xvcjogI2FhYTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGhlaWdodDogMjBweDtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG59XG5uZy1zZWxlY3QgPiBkaXYgPiBkaXYubXVsdGlwbGUgPiBkaXYub3B0aW9uIHNwYW4uZGVzZWxlY3Qtb3B0aW9uOmhvdmVyIHtcbiAgY29sb3I6ICM1NTU7XG59XG5uZy1zZWxlY3QgPiBkaXYgPiBkaXYubXVsdGlwbGUgaW5wdXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBoZWlnaHQ6IDMwcHg7XG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xuICBwYWRkaW5nOiAwO1xufVxubmctc2VsZWN0ID4gZGl2ID4gZGl2Lm11bHRpcGxlIGlucHV0OmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cbmA7XG4iXX0=