import { Component, OnInit } from "@angular/core";
var clipboard = require("nativescript-clipboard");
import { FileReaderService } from "../core/fileReader.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    fonts;

    constructor(private fr: FileReaderService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.getDatas();
    }

    getDatas(): void {
        this.fr.readJSON('/app/core/data.json').then(
            res => {
                this.fonts = res["fonts"];
            },
            err => {
                console.log('Error reading json: ' + JSON.stringify(err));
            }
        )
    }
}
