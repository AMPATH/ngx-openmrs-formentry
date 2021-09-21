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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuY3NzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLXJlbmRlcmVyL2Zvcm0tcmVuZGVyZXIuY29tcG9uZW50LmNzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0EwSnpCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgREVGQVVMVF9TVFlMRVMgPSBgYSB7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIH1cblxuICAgIHVsIHtcbiAgICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgICAgIG1hcmdpbjogMnB4IGF1dG87XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuXG4gICAgbGkge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbjtcbiAgICAgIGJvcmRlci1ib3R0b206IDRweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICB9XG5cbiAgICBsaTpob3ZlciB7XG4gICAgICBib3JkZXItYm90dG9tOiA0cHggc29saWQgd2hpdGU7XG4gICAgICBvcGFjaXR5OiAwLjc7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuXG4gICAgLm93bC10aGVtZSAub3dsLWNvbnRyb2xzIC5vd2wtbmF2IHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgdG9wOiAwO1xuICAgIH1cblxuICAgIC5vd2wtdGhlbWUgLm93bC1jb250cm9scyAub3dsLW5hdiBbY2xhc3MqPVwib3dsLVwiXSB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgY29sb3I6IGJsYWNrO1xuICAgIH1cblxuICAgIC5vd2wtdGhlbWUgLm93bC1jb250cm9scyAub3dsLW5hdiBbY2xhc3MqPVwib3dsLVwiXTpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgY29sb3I6IGJsYWNrO1xuICAgIH1cblxuICAgIC5vd2wtdGhlbWUgLm93bC1jb250cm9scyAub3dsLW5hdiAub3dsLW5leHQge1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMjAlKTtcbiAgICB9XG5cbiAgICAub3dsLXRoZW1lIC5vd2wtY29udHJvbHMgLm93bC1uYXYgLm93bC1wcmV2IHtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTIwJSk7XG4gICAgfVxuXG4gICAgLnNsaWNrLWluaXRpYWxpemVkIC5zd2lwZS10YWItY29udGVudCB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBtaW4taGVpZ2h0OiAzNjVweDtcbiAgICB9XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY3cHgpIHtcbiAgICAgIC5zbGljay1pbml0aWFsaXplZCAuc3dpcGUtdGFiLWNvbnRlbnQge1xuICAgICAgICBtaW4taGVpZ2h0OiA1MDBweDtcbiAgICAgIH1cbiAgICB9XG4gICAgLnNsaWNrLWluaXRpYWxpemVkIC5zd2lwZS10YWIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGhlaWdodDogNTBweDtcbiAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICBib3JkZXI6IDA7XG4gICAgICBjb2xvcjogIzc1NzU3NTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2JhKDUxLCAxMjIsIDE4MywgMCk7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC41cztcbiAgICB9XG4gICAgLnNsaWNrLWluaXRpYWxpemVkIC5zd2lwZS10YWI6aG92ZXIge1xuICAgICAgY29sb3I6ICMzMzdBQjc7XG4gICAgfVxuICAgIC5zbGljay1pbml0aWFsaXplZCAuc3dpcGUtdGFiLmFjdGl2ZS10YWIge1xuICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogIzMzN0FCNztcbiAgICAgIGNvbG9yOiAjMzM3QUI3O1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuXG4gICAgLmRpc2FibGVkIHtcbiAgICAgIG9wYWNpdHk6IC41O1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgfVxuXG4gICAgLnNlbGVjdDItY29udGFpbmVyIHtcbiAgICAgIG1hcmdpbi10b3A6IC01cHg7XG4gICAgfVxuXG4gICAgLmJ0biB7XG4gICAgICBwYWRkaW5nOiAwcHggMTJweCAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC5mb3JtLXRvb2x0aXB7XG4gICAgICBjb2xvcjpyZ2IoNTEsIDEyMiwgMTgzKTtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB9XG4gICAgLnF1ZXN0aW9uLWluZm97XG4gICAgICAgICAgb3BhY2l0eTowO1xuICAgICAgICAgIGhlaWdodDowcHg7XG4gICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiBvcGFjaXR5IDFzIGVhc2Utb3V0O1xuICAgICAgICAgIHRyYW5zdGlvbi1kZWxheTogMC41cztcbiAgICAgICAgICBwYWRkaW5nLXRvcDogMnB4O1xuICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAycHg7XG4gICAgICAgICAgY29sb3I6ICM2OTY5Njk7XG4gICAgICAgICAgYm9yZGVyLXN0eWxlOiByaWRnZTtcbiAgICAgICAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICMzMzdhYjc7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xuICAgIH1cbiAgICAuaGlkZS1pbmZve1xuICAgICAgZGlzcGxheTpub25lO1xuICAgICAgaGVpZ2h0OjBweDtcbiAgICB9XG4gICAgLmZvcm0tdG9vbHRpcDpob3ZlciB+IC5xdWVzdGlvbi1pbmZvIHtcbiAgICAgICAgICBkaXNwbGF5OmJsb2NrO1xuICAgICAgICAgIG9wYWNpdHk6MTtcbiAgICAgICAgICBoZWlnaHQ6YXV0bztcbiAgICAgfVxuICAgIC5mb3JtLXRvb2x0aXAgLnRvb2x0aXBjb250ZW50OjphZnRlciB7XG4gICAgICAgICAgY29udGVudDogXCIgXCI7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIGJvdHRvbTogMTAwJTsgIC8qIEF0IHRoZSB0b3Agb2YgdGhlIHRvb2x0aXAgKi9cbiAgICAgICAgICByaWdodDogMCU7XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IC01cHg7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiA1cHg7XG4gICAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICMzMzdhYjc7XG4gICAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHRyYW5zcGFyZW50O1xuIH1cblxuICAgIG5nLXNlbGVjdC5mb3JtLWNvbnRyb2wge1xuICAgICAgcGFkZGluZy10b3A6IDA7XG4gICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgICB9XG5cbiAuZm9ybXMtZHJvcGRvd24tbWVudSB7XG4gICAgIG1heC1oZWlnaHQ6IDQ1MHB4O1xuICAgICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gfVxuIC5uby1ib3JkZXIge1xuICBib3JkZXI6IDA7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbiAgICBgO1xuIl19