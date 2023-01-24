export var DEFAULT_STYLES = "a {\n      color: white;\n      text-decoration: none;\n      font-size: 12px;\n      text-transform: uppercase;\n    }\n\n    ul {\n      list-style-type: none;\n      margin: 2px auto;\n      position: relative;\n    }\n\n    li {\n      display: block;\n      padding: 10px 20px;\n      white-space: nowrap;\n      transition: all 0.3s ease-in;\n      border-bottom: 4px solid transparent;\n    }\n\n    li:hover {\n      border-bottom: 4px solid white;\n      opacity: 0.7;\n      cursor: pointer;\n    }\n\n    .owl-theme .owl-controls .owl-nav {\n      position: absolute;\n      width: 100%;\n      top: 0;\n    }\n\n    .owl-theme .owl-controls .owl-nav [class*=\"owl-\"] {\n      position: absolute;\n      background: none;\n      color: black;\n    }\n\n    .owl-theme .owl-controls .owl-nav [class*=\"owl-\"]:hover {\n      background: none;\n      color: black;\n    }\n\n    .owl-theme .owl-controls .owl-nav .owl-next {\n      right: 0;\n      transform: translate(120%);\n    }\n\n    .owl-theme .owl-controls .owl-nav .owl-prev {\n      left: 0;\n      transform: translate(-120%);\n    }\n\n    .slick-initialized .swipe-tab-content {\n      position: relative;\n      min-height: 365px;\n    }\n    @media screen and (min-width: 767px) {\n      .slick-initialized .swipe-tab-content {\n        min-height: 500px;\n      }\n      .time-control{\n        width:50%;\n      }\n    }\n    .slick-initialized .swipe-tab {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      height: 50px;\n      background: none;\n      border: 0;\n      color: #757575;\n      cursor: pointer;\n      text-align: center;\n      border-bottom: 2px solid rgba(51, 122, 183, 0);\n      transition: all 0.5s;\n    }\n    .slick-initialized .swipe-tab:hover {\n      color: #337AB7;\n    }\n    .slick-initialized .swipe-tab.active-tab {\n      border-bottom-color: #337AB7;\n      color: #337AB7;\n      font-weight: bold;\n    }\n\n    .disabled {\n      opacity: .5;\n      pointer-events: none;\n    }\n\n    .select2-container {\n      margin-top: -5px;\n    }\n\n    .btn {\n      padding: 0px 12px !important;\n    }\n\n    .form-tooltip{\n      color:rgb(51, 122, 183);\n      display: inline-block;\n    }\n    .question-info{\n          opacity:0;\n          height:0px;\n          display: none;\n          transition-duration: opacity 1s ease-out;\n          transtion-delay: 0.5s;\n          padding-top: 2px;\n          padding-bottom: 2px;\n          color: #696969;\n          border-style: ridge;\n          border-width: 1px;\n          border-color: #337ab7;\n          margin-top: 2px;\n    }\n    .hide-info{\n      display:none;\n      height:0px;\n    }\n    .form-tooltip:hover ~ .question-info {\n          display:block;\n          opacity:1;\n          height:auto;\n     }\n    .form-tooltip .tooltipcontent::after {\n          content: \" \";\n          position: absolute;\n          bottom: 100%;  /* At the top of the tooltip */\n          right: 0%;\n          margin-left: -5px;\n          border-width: 5px;\n          border-style: solid;\n          border-top-color: transparent;\n          border-right-color: transparent;\n          border-bottom-color: #337ab7;\n          border-left-color: transparent;\n }\n\n    ng-select.form-control {\n      padding-top: 0;\n      height: auto;\n      padding-bottom: 0;\n    }\n\n .forms-dropdown-menu {\n     max-height: 450px;\n     overflow-y: scroll;\n }\n .no-border {\n  border: 0;\n  box-shadow: none;\n}\n.time-control{\n  width:100%;\n}\n\n    ";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuY3NzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQuY3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxJQUFNLGNBQWMsR0FBRyw4K0dBZ0t6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IERFRkFVTFRfU1RZTEVTID0gYGEge1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICB9XG5cbiAgICB1bCB7XG4gICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gICAgICBtYXJnaW46IDJweCBhdXRvO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cblxuICAgIGxpIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgcGFkZGluZzogMTBweCAyMHB4O1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW47XG4gICAgICBib3JkZXItYm90dG9tOiA0cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgfVxuXG4gICAgbGk6aG92ZXIge1xuICAgICAgYm9yZGVyLWJvdHRvbTogNHB4IHNvbGlkIHdoaXRlO1xuICAgICAgb3BhY2l0eTogMC43O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cblxuICAgIC5vd2wtdGhlbWUgLm93bC1jb250cm9scyAub3dsLW5hdiB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIHRvcDogMDtcbiAgICB9XG5cbiAgICAub3dsLXRoZW1lIC5vd2wtY29udHJvbHMgLm93bC1uYXYgW2NsYXNzKj1cIm93bC1cIl0ge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgIGNvbG9yOiBibGFjaztcbiAgICB9XG5cbiAgICAub3dsLXRoZW1lIC5vd2wtY29udHJvbHMgLm93bC1uYXYgW2NsYXNzKj1cIm93bC1cIl06aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgIGNvbG9yOiBibGFjaztcbiAgICB9XG5cbiAgICAub3dsLXRoZW1lIC5vd2wtY29udHJvbHMgLm93bC1uYXYgLm93bC1uZXh0IHtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTIwJSk7XG4gICAgfVxuXG4gICAgLm93bC10aGVtZSAub3dsLWNvbnRyb2xzIC5vd2wtbmF2IC5vd2wtcHJldiB7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEyMCUpO1xuICAgIH1cblxuICAgIC5zbGljay1pbml0aWFsaXplZCAuc3dpcGUtdGFiLWNvbnRlbnQge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgbWluLWhlaWdodDogMzY1cHg7XG4gICAgfVxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2N3B4KSB7XG4gICAgICAuc2xpY2staW5pdGlhbGl6ZWQgLnN3aXBlLXRhYi1jb250ZW50IHtcbiAgICAgICAgbWluLWhlaWdodDogNTAwcHg7XG4gICAgICB9XG4gICAgICAudGltZS1jb250cm9se1xuICAgICAgICB3aWR0aDo1MCU7XG4gICAgICB9XG4gICAgfVxuICAgIC5zbGljay1pbml0aWFsaXplZCAuc3dpcGUtdGFiIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgYm9yZGVyOiAwO1xuICAgICAgY29sb3I6ICM3NTc1NzU7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgcmdiYSg1MSwgMTIyLCAxODMsIDApO1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXM7XG4gICAgfVxuICAgIC5zbGljay1pbml0aWFsaXplZCAuc3dpcGUtdGFiOmhvdmVyIHtcbiAgICAgIGNvbG9yOiAjMzM3QUI3O1xuICAgIH1cbiAgICAuc2xpY2staW5pdGlhbGl6ZWQgLnN3aXBlLXRhYi5hY3RpdmUtdGFiIHtcbiAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICMzMzdBQjc7XG4gICAgICBjb2xvcjogIzMzN0FCNztcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cblxuICAgIC5kaXNhYmxlZCB7XG4gICAgICBvcGFjaXR5OiAuNTtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIH1cblxuICAgIC5zZWxlY3QyLWNvbnRhaW5lciB7XG4gICAgICBtYXJnaW4tdG9wOiAtNXB4O1xuICAgIH1cblxuICAgIC5idG4ge1xuICAgICAgcGFkZGluZzogMHB4IDEycHggIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAuZm9ybS10b29sdGlwe1xuICAgICAgY29sb3I6cmdiKDUxLCAxMjIsIDE4Myk7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuICAgIC5xdWVzdGlvbi1pbmZve1xuICAgICAgICAgIG9wYWNpdHk6MDtcbiAgICAgICAgICBoZWlnaHQ6MHB4O1xuICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogb3BhY2l0eSAxcyBlYXNlLW91dDtcbiAgICAgICAgICB0cmFuc3Rpb24tZGVsYXk6IDAuNXM7XG4gICAgICAgICAgcGFkZGluZy10b3A6IDJweDtcbiAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMnB4O1xuICAgICAgICAgIGNvbG9yOiAjNjk2OTY5O1xuICAgICAgICAgIGJvcmRlci1zdHlsZTogcmlkZ2U7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjMzM3YWI3O1xuICAgICAgICAgIG1hcmdpbi10b3A6IDJweDtcbiAgICB9XG4gICAgLmhpZGUtaW5mb3tcbiAgICAgIGRpc3BsYXk6bm9uZTtcbiAgICAgIGhlaWdodDowcHg7XG4gICAgfVxuICAgIC5mb3JtLXRvb2x0aXA6aG92ZXIgfiAucXVlc3Rpb24taW5mbyB7XG4gICAgICAgICAgZGlzcGxheTpibG9jaztcbiAgICAgICAgICBvcGFjaXR5OjE7XG4gICAgICAgICAgaGVpZ2h0OmF1dG87XG4gICAgIH1cbiAgICAuZm9ybS10b29sdGlwIC50b29sdGlwY29udGVudDo6YWZ0ZXIge1xuICAgICAgICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICBib3R0b206IDEwMCU7ICAvKiBBdCB0aGUgdG9wIG9mIHRoZSB0b29sdGlwICovXG4gICAgICAgICAgcmlnaHQ6IDAlO1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xuICAgICAgICAgIGJvcmRlci13aWR0aDogNXB4O1xuICAgICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjMzM3YWI3O1xuICAgICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiB9XG5cbiAgICBuZy1zZWxlY3QuZm9ybS1jb250cm9sIHtcbiAgICAgIHBhZGRpbmctdG9wOiAwO1xuICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgcGFkZGluZy1ib3R0b206IDA7XG4gICAgfVxuXG4gLmZvcm1zLWRyb3Bkb3duLW1lbnUge1xuICAgICBtYXgtaGVpZ2h0OiA0NTBweDtcbiAgICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuIH1cbiAubm8tYm9yZGVyIHtcbiAgYm9yZGVyOiAwO1xuICBib3gtc2hhZG93OiBub25lO1xufVxuLnRpbWUtY29udHJvbHtcbiAgd2lkdGg6MTAwJTtcbn1cblxuICAgIGA7XG4iXX0=