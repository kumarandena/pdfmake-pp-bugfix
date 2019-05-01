import { Component, OnInit } from "@angular/core";

var dialogs = require("tns-core-modules/ui/dialogs");
import * as pdfMake from 'pdfmake/build/pdfmake.js';
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

    generatePdf() {
        let docDefinition = {
            pageOrientation: 'landscape',
            ownerPassword: '123456',
            permissions: {
                printing: 'highResolution',
                modifying: false,
                copying: false,
                annotating: true,
                fillingForms: true,
                contentAccessibility: true,
                documentAssembly: true
            },

            content: [
                { text: 'Certificate', fontSize: '25', italics: true, alignment: 'center' },
            ]
        };

        pdfMake.createPdf(docDefinition, '', '', this.fonts).getDataUrl((dataUrl) => {
            dialogs.alert({
                title: "PDFMake - Base64",
                message: dataUrl,
                okButtonText: "Copy to Clipboard"
            }).then(() => {
                clipboard.setText(dataUrl);
            });
        });
    }
}
