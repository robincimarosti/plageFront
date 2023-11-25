import { Component, OnInit } from '@angular/core';
import { Parasol } from 'src/app/model/parasol';
import { ParasolService } from 'src/app/service/parasol/parasol.service';

@Component({
  selector: 'app-parasols',
  templateUrl: './parasols.component.html',
  styleUrls: ['./parasols.component.scss']
})
export class ParasolsComponent implements OnInit {

  parasols: Parasol[] = []
  selectedFile: number = 0;
  files: any[] = [];

  constructor (private readonly parasolService: ParasolService) {
  }

  ngOnInit () {
    this.loadParasols()
  }

  private loadParasols (): void {
    this.parasolService
      .getAll()
      .then((parasols: Parasol[] ) => {
        this.parasols = parasols;
        this.loadFiles();
      });
  }

  private loadFiles(): void {
    // Chargez les files depuis votre service
    this.parasolService.getFiles().then((files: any[]) => {
      this.files = files;
    });
  }

  filtrerParasols(): void {
    if (this.selectedFile !== 0) {
      this.parasolService.getParasolsByFileId(this.selectedFile)
        .then((parasols: Parasol[]) => {
          this.parasols = parasols;
        });
    } else {
      this.loadParasols();
    }
  }
}
