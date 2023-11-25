import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client, ClientForm } from 'src/app/model/client';
import { LienDeParenteService } from 'src/app/service/lienDeParente/lien-de-parente.service';
import { PaysService } from 'src/app/service/pays/pays.service';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent implements OnInit {

  @Input() submitLabel: string
  @Input() client: Client | null;

  @Output() formSubmitted: EventEmitter<ClientForm>

  form: FormGroup;
  paysList: any[] = [];
  liensDeParenteList: any[] = [];

  constructor (private fb: FormBuilder, private paysService: PaysService,
    private lienDeParenteService: LienDeParenteService) {
    this.formSubmitted = new EventEmitter<ClientForm>()
  }

  ngOnInit() {
    this.initForm()
    this.loadPays();
    this.loadLiensDeParente();
  }

  onSubmitForm() {
    if(this.form.valid) {
      const {nom, prenom, email, motDePasse, pays, lienDeParente} = this.form.value
      console.log("lienDeParente dans le formulaire:", lienDeParente);
      const lienDeParenteId = parseInt(lienDeParente, 10);
      const client: ClientForm = {
        nom,
        prenom,
        email,
        motDePasse,
        pays: this.paysList.find(p => p.code === pays),
        lienDeParente: this.liensDeParenteList.find(l => l.id === lienDeParenteId)
      }
      console.log('lien de parente', client.lienDeParente);
      console.log('lien de parente liste', this.liensDeParenteList);

      console.log('Client soumis:', client);
      this.formSubmitted.emit(client)
    }
  }

  loadPays() : void {
    this.paysService.getPays().then((pays: any[]) => {
      this.paysList = pays;
    }
    );
  }

  loadLiensDeParente() : void {
    this.lienDeParenteService.getLiensDeParente().
    then((lienDeParente: any[]) => {
      this.liensDeParenteList = lienDeParente;
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      'nom': ['', Validators.required],
      'prenom': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'motDePasse': ['', [Validators.required, Validators.minLength(6)]],
      'pays': [null, Validators.required],
      'lienDeParente': [null, Validators.required]
    });

    if(this.client) {
      this.form.setValue({
        nom: this.client.nom,
        prenom: this.client.prenom,
        email: this.client.email,
        motDePasse: this.client.motDePasse,
        pays: this.client.pays.code,
        lienDeParente: this.client.lienDeParente.id,
      })
    }
  }
}
