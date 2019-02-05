/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const DEFAULT_STYLES = `a {
      color: white;
      text-decoration: none;
      font-size: 12px;
      text-transform: uppercase;
    }

    ul {
      list-style-type: none;
      margin: 2px auto;
      position: relative;
    }

    li {
      display: block;
      padding: 10px 20px;
      white-space: nowrap;
      transition: all 0.3s ease-in;
      border-bottom: 4px solid transparent;
    }

    li:hover {
      border-bottom: 4px solid white;
      opacity: 0.7;
      cursor: pointer;
    }

    .owl-theme .owl-controls .owl-nav {
      position: absolute;
      width: 100%;
      top: 0;
    }

    .owl-theme .owl-controls .owl-nav [class*="owl-"] {
      position: absolute;
      background: none;
      color: black;
    }

    .owl-theme .owl-controls .owl-nav [class*="owl-"]:hover {
      background: none;
      color: black;
    }

    .owl-theme .owl-controls .owl-nav .owl-next {
      right: 0;
      transform: translate(120%);
    }

    .owl-theme .owl-controls .owl-nav .owl-prev {
      left: 0;
      transform: translate(-120%);
    }

    .slick-initialized .swipe-tab-content {
      position: relative;
      min-height: 365px;
    }
    @media screen and (min-width: 767px) {
      .slick-initialized .swipe-tab-content {
        min-height: 500px;
      }
    }
    .slick-initialized .swipe-tab {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: none;
      border: 0;
      color: #757575;
      cursor: pointer;
      text-align: center;
      border-bottom: 2px solid rgba(51, 122, 183, 0);
      transition: all 0.5s;
    }
    .slick-initialized .swipe-tab:hover {
      color: #337AB7;
    }
    .slick-initialized .swipe-tab.active-tab {
      border-bottom-color: #337AB7;
      color: #337AB7;
      font-weight: bold;
    }

    .disabled {
      opacity: .5;
      pointer-events: none;
    }

    .select2-container {
      margin-top: -5px;
    }

    .btn {
      padding: 0px 12px !important;
    }

    .form-tooltip{
      color:rgb(51, 122, 183);
      display: inline-block;
    }
    .question-info{
          opacity:0;
          height:0px;
          display: none;
          transition-duration: opacity 1s ease-out;
          transtion-delay: 0.5s;
          padding-top: 2px;
          padding-bottom: 2px;
          color: #696969;
          border-style: ridge;
          border-width: 1px;
          border-color: #337ab7;
          margin-top: 2px;
    }
    .hide-info{
      display:none;
      height:0px;
    }
    .form-tooltip:hover ~ .question-info {
          display:block;
          opacity:1;
          height:auto;
     }
    .form-tooltip .tooltipcontent::after {
          content: " ";
          position: absolute;
          bottom: 100%;  /* At the top of the tooltip */
          right: 0%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-top-color: transparent;
          border-right-color: transparent;
          border-bottom-color: #337ab7;
          border-left-color: transparent;
 }

    ng-select.form-control {
      padding-top: 0;
      height: auto;
      padding-bottom: 0;
    }

 .forms-dropdown-menu {
     max-height: 450px;
     overflow-y: scroll;
 }
 .no-border {
  border: 0;
  box-shadow: none;
}

    `;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuY3NzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLXJlbmRlcmVyL2Zvcm0tcmVuZGVyZXIuY29tcG9uZW50LmNzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sT0FBTyxjQUFjLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0EwSnpCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IERFRkFVTFRfU1RZTEVTID0gYGEge1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICB9XG5cbiAgICB1bCB7XG4gICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gICAgICBtYXJnaW46IDJweCBhdXRvO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cblxuICAgIGxpIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgcGFkZGluZzogMTBweCAyMHB4O1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW47XG4gICAgICBib3JkZXItYm90dG9tOiA0cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgfVxuXG4gICAgbGk6aG92ZXIge1xuICAgICAgYm9yZGVyLWJvdHRvbTogNHB4IHNvbGlkIHdoaXRlO1xuICAgICAgb3BhY2l0eTogMC43O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cblxuICAgIC5vd2wtdGhlbWUgLm93bC1jb250cm9scyAub3dsLW5hdiB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIHRvcDogMDtcbiAgICB9XG5cbiAgICAub3dsLXRoZW1lIC5vd2wtY29udHJvbHMgLm93bC1uYXYgW2NsYXNzKj1cIm93bC1cIl0ge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgIGNvbG9yOiBibGFjaztcbiAgICB9XG5cbiAgICAub3dsLXRoZW1lIC5vd2wtY29udHJvbHMgLm93bC1uYXYgW2NsYXNzKj1cIm93bC1cIl06aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgIGNvbG9yOiBibGFjaztcbiAgICB9XG5cbiAgICAub3dsLXRoZW1lIC5vd2wtY29udHJvbHMgLm93bC1uYXYgLm93bC1uZXh0IHtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTIwJSk7XG4gICAgfVxuXG4gICAgLm93bC10aGVtZSAub3dsLWNvbnRyb2xzIC5vd2wtbmF2IC5vd2wtcHJldiB7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEyMCUpO1xuICAgIH1cblxuICAgIC5zbGljay1pbml0aWFsaXplZCAuc3dpcGUtdGFiLWNvbnRlbnQge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgbWluLWhlaWdodDogMzY1cHg7XG4gICAgfVxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2N3B4KSB7XG4gICAgICAuc2xpY2staW5pdGlhbGl6ZWQgLnN3aXBlLXRhYi1jb250ZW50IHtcbiAgICAgICAgbWluLWhlaWdodDogNTAwcHg7XG4gICAgICB9XG4gICAgfVxuICAgIC5zbGljay1pbml0aWFsaXplZCAuc3dpcGUtdGFiIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgYm9yZGVyOiAwO1xuICAgICAgY29sb3I6ICM3NTc1NzU7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiYSg1MSwgMTIyLCAxODMsIDApO1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXM7XG4gICAgfVxuICAgIC5zbGljay1pbml0aWFsaXplZCAuc3dpcGUtdGFiOmhvdmVyIHtcbiAgICAgIGNvbG9yOiAjMzM3QUI3O1xuICAgIH1cbiAgICAuc2xpY2staW5pdGlhbGl6ZWQgLnN3aXBlLXRhYi5hY3RpdmUtdGFiIHtcbiAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICMzMzdBQjc7XG4gICAgICBjb2xvcjogIzMzN0FCNztcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cblxuICAgIC5kaXNhYmxlZCB7XG4gICAgICBvcGFjaXR5OiAuNTtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIH1cblxuICAgIC5zZWxlY3QyLWNvbnRhaW5lciB7XG4gICAgICBtYXJnaW4tdG9wOiAtNXB4O1xuICAgIH1cblxuICAgIC5idG4ge1xuICAgICAgcGFkZGluZzogMHB4IDEycHggIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAuZm9ybS10b29sdGlwe1xuICAgICAgY29sb3I6cmdiKDUxLCAxMjIsIDE4Myk7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuICAgIC5xdWVzdGlvbi1pbmZve1xuICAgICAgICAgIG9wYWNpdHk6MDtcbiAgICAgICAgICBoZWlnaHQ6MHB4O1xuICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogb3BhY2l0eSAxcyBlYXNlLW91dDtcbiAgICAgICAgICB0cmFuc3Rpb24tZGVsYXk6IDAuNXM7XG4gICAgICAgICAgcGFkZGluZy10b3A6IDJweDtcbiAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMnB4O1xuICAgICAgICAgIGNvbG9yOiAjNjk2OTY5O1xuICAgICAgICAgIGJvcmRlci1zdHlsZTogcmlkZ2U7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjMzM3YWI3O1xuICAgICAgICAgIG1hcmdpbi10b3A6IDJweDtcbiAgICB9XG4gICAgLmhpZGUtaW5mb3tcbiAgICAgIGRpc3BsYXk6bm9uZTtcbiAgICAgIGhlaWdodDowcHg7XG4gICAgfVxuICAgIC5mb3JtLXRvb2x0aXA6aG92ZXIgfiAucXVlc3Rpb24taW5mbyB7XG4gICAgICAgICAgZGlzcGxheTpibG9jaztcbiAgICAgICAgICBvcGFjaXR5OjE7XG4gICAgICAgICAgaGVpZ2h0OmF1dG87XG4gICAgIH1cbiAgICAuZm9ybS10b29sdGlwIC50b29sdGlwY29udGVudDo6YWZ0ZXIge1xuICAgICAgICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICBib3R0b206IDEwMCU7ICAvKiBBdCB0aGUgdG9wIG9mIHRoZSB0b29sdGlwICovXG4gICAgICAgICAgcmlnaHQ6IDAlO1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xuICAgICAgICAgIGJvcmRlci13aWR0aDogNXB4O1xuICAgICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjMzM3YWI3O1xuICAgICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiB9XG5cbiAgICBuZy1zZWxlY3QuZm9ybS1jb250cm9sIHtcbiAgICAgIHBhZGRpbmctdG9wOiAwO1xuICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgcGFkZGluZy1ib3R0b206IDA7XG4gICAgfVxuXG4gLmZvcm1zLWRyb3Bkb3duLW1lbnUge1xuICAgICBtYXgtaGVpZ2h0OiA0NTBweDtcbiAgICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuIH1cbiAubm8tYm9yZGVyIHtcbiAgYm9yZGVyOiAwO1xuICBib3gtc2hhZG93OiBub25lO1xufVxuXG4gICAgYDtcbiJdfQ==