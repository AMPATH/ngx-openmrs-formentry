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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuY3NzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLXJlbmRlcmVyL2Zvcm0tcmVuZGVyZXIuY29tcG9uZW50LmNzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sT0FBTyxjQUFjLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0EwSnpCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IERFRkFVTFRfU1RZTEVTID0gYGEge1xyXG4gICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHVsIHtcclxuICAgICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG4gICAgICBtYXJnaW46IDJweCBhdXRvO1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB9XHJcblxyXG4gICAgbGkge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluO1xyXG4gICAgICBib3JkZXItYm90dG9tOiA0cHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgbGk6aG92ZXIge1xyXG4gICAgICBib3JkZXItYm90dG9tOiA0cHggc29saWQgd2hpdGU7XHJcbiAgICAgIG9wYWNpdHk6IDAuNztcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC5vd2wtdGhlbWUgLm93bC1jb250cm9scyAub3dsLW5hdiB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIHRvcDogMDtcclxuICAgIH1cclxuXHJcbiAgICAub3dsLXRoZW1lIC5vd2wtY29udHJvbHMgLm93bC1uYXYgW2NsYXNzKj1cIm93bC1cIl0ge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIGJhY2tncm91bmQ6IG5vbmU7XHJcbiAgICAgIGNvbG9yOiBibGFjaztcclxuICAgIH1cclxuXHJcbiAgICAub3dsLXRoZW1lIC5vd2wtY29udHJvbHMgLm93bC1uYXYgW2NsYXNzKj1cIm93bC1cIl06aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kOiBub25lO1xyXG4gICAgICBjb2xvcjogYmxhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLm93bC10aGVtZSAub3dsLWNvbnRyb2xzIC5vd2wtbmF2IC5vd2wtbmV4dCB7XHJcbiAgICAgIHJpZ2h0OiAwO1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMjAlKTtcclxuICAgIH1cclxuXHJcbiAgICAub3dsLXRoZW1lIC5vd2wtY29udHJvbHMgLm93bC1uYXYgLm93bC1wcmV2IHtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEyMCUpO1xyXG4gICAgfVxyXG5cclxuICAgIC5zbGljay1pbml0aWFsaXplZCAuc3dpcGUtdGFiLWNvbnRlbnQge1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIG1pbi1oZWlnaHQ6IDM2NXB4O1xyXG4gICAgfVxyXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY3cHgpIHtcclxuICAgICAgLnNsaWNrLWluaXRpYWxpemVkIC5zd2lwZS10YWItY29udGVudCB7XHJcbiAgICAgICAgbWluLWhlaWdodDogNTAwcHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC5zbGljay1pbml0aWFsaXplZCAuc3dpcGUtdGFiIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgIGhlaWdodDogNTBweDtcclxuICAgICAgYmFja2dyb3VuZDogbm9uZTtcclxuICAgICAgYm9yZGVyOiAwO1xyXG4gICAgICBjb2xvcjogIzc1NzU3NTtcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2JhKDUxLCAxMjIsIDE4MywgMCk7XHJcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzO1xyXG4gICAgfVxyXG4gICAgLnNsaWNrLWluaXRpYWxpemVkIC5zd2lwZS10YWI6aG92ZXIge1xyXG4gICAgICBjb2xvcjogIzMzN0FCNztcclxuICAgIH1cclxuICAgIC5zbGljay1pbml0aWFsaXplZCAuc3dpcGUtdGFiLmFjdGl2ZS10YWIge1xyXG4gICAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjMzM3QUI3O1xyXG4gICAgICBjb2xvcjogIzMzN0FCNztcclxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgLmRpc2FibGVkIHtcclxuICAgICAgb3BhY2l0eTogLjU7XHJcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgfVxyXG5cclxuICAgIC5zZWxlY3QyLWNvbnRhaW5lciB7XHJcbiAgICAgIG1hcmdpbi10b3A6IC01cHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmJ0biB7XHJcbiAgICAgIHBhZGRpbmc6IDBweCAxMnB4ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLmZvcm0tdG9vbHRpcHtcclxuICAgICAgY29sb3I6cmdiKDUxLCAxMjIsIDE4Myk7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIH1cclxuICAgIC5xdWVzdGlvbi1pbmZve1xyXG4gICAgICAgICAgb3BhY2l0eTowO1xyXG4gICAgICAgICAgaGVpZ2h0OjBweDtcclxuICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICAgICAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiBvcGFjaXR5IDFzIGVhc2Utb3V0O1xyXG4gICAgICAgICAgdHJhbnN0aW9uLWRlbGF5OiAwLjVzO1xyXG4gICAgICAgICAgcGFkZGluZy10b3A6IDJweDtcclxuICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAycHg7XHJcbiAgICAgICAgICBjb2xvcjogIzY5Njk2OTtcclxuICAgICAgICAgIGJvcmRlci1zdHlsZTogcmlkZ2U7XHJcbiAgICAgICAgICBib3JkZXItd2lkdGg6IDFweDtcclxuICAgICAgICAgIGJvcmRlci1jb2xvcjogIzMzN2FiNztcclxuICAgICAgICAgIG1hcmdpbi10b3A6IDJweDtcclxuICAgIH1cclxuICAgIC5oaWRlLWluZm97XHJcbiAgICAgIGRpc3BsYXk6bm9uZTtcclxuICAgICAgaGVpZ2h0OjBweDtcclxuICAgIH1cclxuICAgIC5mb3JtLXRvb2x0aXA6aG92ZXIgfiAucXVlc3Rpb24taW5mbyB7XHJcbiAgICAgICAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgICAgICAgb3BhY2l0eToxO1xyXG4gICAgICAgICAgaGVpZ2h0OmF1dG87XHJcbiAgICAgfVxyXG4gICAgLmZvcm0tdG9vbHRpcCAudG9vbHRpcGNvbnRlbnQ6OmFmdGVyIHtcclxuICAgICAgICAgIGNvbnRlbnQ6IFwiIFwiO1xyXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgYm90dG9tOiAxMDAlOyAgLyogQXQgdGhlIHRvcCBvZiB0aGUgdG9vbHRpcCAqL1xyXG4gICAgICAgICAgcmlnaHQ6IDAlO1xyXG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IC01cHg7XHJcbiAgICAgICAgICBib3JkZXItd2lkdGg6IDVweDtcclxuICAgICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjMzM3YWI3O1xyXG4gICAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gfVxyXG5cclxuICAgIG5nLXNlbGVjdC5mb3JtLWNvbnRyb2wge1xyXG4gICAgICBwYWRkaW5nLXRvcDogMDtcclxuICAgICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMDtcclxuICAgIH1cclxuXHJcbiAuZm9ybXMtZHJvcGRvd24tbWVudSB7XHJcbiAgICAgbWF4LWhlaWdodDogNDUwcHg7XHJcbiAgICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xyXG4gfVxyXG4gLm5vLWJvcmRlciB7XHJcbiAgYm9yZGVyOiAwO1xyXG4gIGJveC1zaGFkb3c6IG5vbmU7XHJcbn1cclxuXHJcbiAgICBgO1xyXG4iXX0=