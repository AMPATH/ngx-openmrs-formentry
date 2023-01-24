export declare const STYLE = "\nng-select {\n  display: inline-block;\n  margin: 0;\n  position: relative;\n  vertical-align: middle;\n  width: 100%;\n}\nng-select * {\n  box-sizing: border-box;\n  font-family: Sans-Serif;\n}\nng-select > div {\n  border: 1px solid #ddd;\n  box-sizing: border-box;\n  cursor: pointer;\n  user-select: none;\n  width: 100%;\n}\nng-select > div.disabled {\n  background-color: #eee;\n  color: #aaa;\n  cursor: default;\n  pointer-events: none;\n}\nng-select > div > div.single {\n  display: flex;\n  height: 30px;\n  width: 100%;\n}\nng-select > div > div.single > div.value,\nng-select > div > div.single > div.placeholder {\n  flex: 1;\n  line-height: 30px;\n  overflow: hidden;\n  padding: 0 10px;\n  white-space: nowrap;\n}\nng-select > div > div.single > div.placeholder {\n  color: #a9a9a9;\n}\nng-select > div > div.single > div.clear,\nng-select > div > div.single > div.toggle {\n  color: #aaa;\n  line-height: 30px;\n  text-align: center;\n  width: 30px;\n}\nng-select > div > div.single > div.clear:hover,\nng-select > div > div.single > div.toggle:hover {\n  background-color: #ececec;\n}\nng-select > div > div.single > div.clear {\n  font-size: 18px;\n}\nng-select > div > div.single > div.toggle {\n  font-size: 14px;\n}\nng-select > div > div.multiple {\n  display: flex;\n  flex-flow: row wrap;\n  height: 100%;\n  min-height: 30px;\n  padding: 0 10px;\n  width: 100%;\n}\nng-select > div > div.multiple > div.option {\n  background-color: #eee;\n  border: 1px solid #aaa;\n  border-radius: 4px;\n  color: #333;\n  cursor: default;\n  display: inline-block;\n  flex-shrink: 0;\n  font-size: 14px;\n  line-height: 22px;\n  margin: 3px 5px 3px 0;\n  padding: 0 4px;\n}\nng-select > div > div.multiple > div.option span.deselect-option {\n  color: #aaa;\n  cursor: pointer;\n  font-size: 14px;\n  height: 20px;\n  line-height: 20px;\n}\nng-select > div > div.multiple > div.option span.deselect-option:hover {\n  color: #555;\n}\nng-select > div > div.multiple input {\n  background-color: transparent;\n  border: none;\n  height: 30px;\n  line-height: 30px;\n  padding: 0;\n}\nng-select > div > div.multiple input:focus {\n  outline: none;\n}\n";
