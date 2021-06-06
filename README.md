[![Run on Repl.it](https://repl.it/badge/github/erdkse/adminlte-3-angular)](https://repl.it/github/erdkse/adminlte-3-angular)

# AdminLTE 3 GpWear

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
Run `ng build --prod=true --aot=true --outputHashing=all --baseHref ./` to build the project.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## codeimg規範

Typescript: 
1. 語意完整命名法
2. 小括號,大括號不可省略,
3. function要標著型別`: void`
4. 變數未給值時要標著型別
5. 巢狀結構
6. 三元運算使用時機: true與false都要執行一種動作(且只有一種)時
7.  `.subscribe`, `.pipe`, .function不折行
8. 一個function只call一隻api,若需call一個以上,則再寫一個function

Html:
1. 同標籤頭尾單行撰寫不折行
2. 標籤巢狀結構
3. 標籤內同個邏輯不空白,  2個執行動作以分號間隔
