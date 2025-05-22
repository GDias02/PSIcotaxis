import { Component } from '@angular/core';
import { ViagemCompleta } from '../viagem-completa';
import { ViagemService } from '../viagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { Viagem } from '../viagem';

@Component({
  selector: 'app-viagem-detail',
  templateUrl: './viagem-detail.component.html',
  styleUrls: ['./viagem-detail.component.css']
})
export class ViagemDetailComponent {

  viagem?: Viagem

  constructor(  
    private route: ActivatedRoute,
    private viagemService: ViagemService,
    private location: Location,
    private router: Router,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getViagem();
  }
    getViagem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.viagemService.getViagem(id!)
      .subscribe(val => this.viagem = val);
  }

  goBack(): void {
    this.location.back();
  }
}
