import { Component } from '@angular/core';
import { ViagemCompleta } from '../viagem-completa';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

interface EstatisticasDetalhes {
  id: string;
  quilometros: number;
  tempo: number;
  start: Date;
  end: Date;
}

@Component({
  selector: 'app-estatisticas-details',
  templateUrl: './estatisticas-details.component.html',
  styleUrls: ['./estatisticas-details.component.css']
})
export class EstatisticasDetailsComponent {

  constructor(    
    private router: Router,
    private location: Location
  ) { }

  categoria?: string;
  entidade?: string;
  viagens: ViagemCompleta[] = [];
  resumoViagens: EstatisticasDetalhes[] = [];
  displayedResumoColumns: string[] = ['id', 'quilometros', 'tempo', 'inicio', 'fim'];

  displayedColumns: string[] = ['nome', 'nif', 'marcamodelo', 'matricula', 'cliente', 'passageiros', 'partida', 'chegada', 'inicio', 'fim', 'kilometros', 'custo'];

  columnsToDisplay: string[] = this.displayedColumns.slice();

  ngOnInit(): void {
    const state = window.history.state;
    this.viagens = state['viagens'];
    this.categoria = state['categoria'];
    this.entidade = state['entidade'];

    this.fillResumo();
    this.changeSpec();
    this.sortResumo();
  }

  fillResumo() {
    this.viagens.forEach(v => {
      this.resumoViagens.push({
        id: v._id!,
        quilometros: v.kilometros!,
        tempo: this.getDuracao(v.inicio, v.fim!),
        start: v.inicio,
        end: v.fim!
      })
    })
  }


  updateDisplayedColumnsResumo(c: string){
    this.categoria = c;
    this.changeSpec();
  }

  changeSpec(){
    this.displayedResumoColumns = [];
    this.displayedResumoColumns.push('id');
    switch(this.categoria){
      case "Número de Viagens":
        this.displayedResumoColumns.push('inicio');
        this.displayedResumoColumns.push('fim');
        break;
      case "Horas de Viagens":
        this.displayedResumoColumns.push('tempo');
        break;
      case "Quilómetros Percorridos":
        this.displayedResumoColumns.push('quilometros');
        break;
    }
    this.sortResumo();
  }
  
  sortResumo(){
    switch(this.categoria){
      case "Número de Viagens":
        this.resumoViagens.sort((v1, v2) => new Date(v2.start).getTime() - new Date(v1.start).getTime());
      break;
      case "Horas de Viagens":
        this.resumoViagens.sort((v1, v2) => v2.tempo - v1.tempo);
      break;
      case "Quilómetros Percorridos":
        this.resumoViagens.sort((v1, v2) => v2.quilometros - v1.quilometros)
      break;
    }
  }

  getDuracao(d1: Date, d2: Date){
    return new Date(d2).getTime() - new Date(d1).getTime();
  }

  addOrRemove(col: MatCheckboxChange){
    const nomeCol = col.source.value;
    let checked = col.checked;
    if(checked){
      this.columnsToDisplay.push(nomeCol);
    } else {
      let i = this.columnsToDisplay.indexOf(nomeCol);
      console.log(i);
      this.columnsToDisplay.splice(i, 1);
    }
  }

  columnNameConvert(column: string): string {
    switch (column) {
      case 'marcamodelo': return "Carro"; break;
      case 'matricula': return 'Matrícula'; break;
      case 'cliente': return 'Cliente ID'; break;
      case 'passageiros': return 'Número de passageiros'; break;
      case 'partida': return 'Localidade de Partida'; break;
      case 'chegada': return 'Localidade de Chegada'; break;
      case 'inicio': return 'Data de Partida'; break;
      case 'fim': return 'Data de Chegada'; break;
      case 'kilometros': return 'Quilómetros'; break;
      case 'custo': return 'Custo Final'; break;
      case 'nome': return 'Nome de Motorista'; break;
      case 'nif': return 'NIF de Motorista'; break;
      default: return '';
    }
  }

  columnNameConvertResumo(column: string): string {
    switch (column) {
      case 'id': return "Id da Viagem"; break;
      case 'quilometros': return 'Quilómetros Percorridos'; break;
      case 'tempo': return 'Duração da Viagem'; break;
      case 'inicio': return 'Início da Viagem'; break;
      case 'fim': return 'Fim da Viagem'; break;
      default: return '';
    }
  }

  cellDataFrom(element: ViagemCompleta, column: string): string {
    switch (column) {
      case 'marcamodelo': return element['taxi'].marca + " " + element['taxi'].modelo; break;
      case 'matricula': return element['taxi'].matricula; break;
      case 'cliente': return element['cliente']; break;
      case 'passageiros': return element['numeroDePassageiros'].toString(); break;
      case 'partida': return element['partida'].localidade; break;
      case 'chegada': return element['chegada']!.localidade; break;
      case 'inicio': return this.dateCustomFormat(element['inicio']); break;
      case 'fim': return this.dateCustomFormat(element['fim']!); break;
      case 'kilometros': return element['kilometros']!.toString(); break;
      case 'custo': return element['custo']!.toString(); break;
      case 'nome': return element['motorista'].nome; break;
      case 'nif': return element['motorista'].nif.toString(); break;
      default: return '';
    }
  }
  cellDataFromResumo(element: EstatisticasDetalhes, column: string): string {
    switch (column) {
      case 'id': return element['id']; break;
      case 'quilometros': return element['quilometros'].toString(); break;
      case 'tempo': return this.timeCustomFormat(element['tempo']); break;
      case 'inicio': return this.dateCustomFormat(element['start']); break;
      case 'fim': return this.dateCustomFormat(element['end']); break;
      default: return '';
    }
  }

  dateCustomFormat(data: Date): string {
    const res = new Date(data).toISOString().split('T');
    let dia = res[0];
    let hora = res[1].split('.')[0];
    return dia + " " + hora;
  }

  timeCustomFormat(n: number): string {
    const hour = Math.floor(n/3600000);
    const minute = Math.floor((n % 3600000) / 60000);
    return this.zeroingTime(hour) + ":" + this.zeroingTime(minute);
  }
  
  zeroingTime(n: number): string {
    if(n<10){
      return `0${n}`;
    } else {
      return n.toString();
    }
  }

  showDetailsViagem(v: EstatisticasDetalhes): void {
    this.router.navigate([`main-page/viagens/${v.id}`]);
  }

  goBack(): void {
    this.location.back();
  }

}
