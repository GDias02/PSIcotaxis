import { Component } from '@angular/core';
import { ViagemCompleta } from '../viagem-completa';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-estatisticas-details',
  templateUrl: './estatisticas-details.component.html',
  styleUrls: ['./estatisticas-details.component.css']
})
export class EstatisticasDetailsComponent {

  constructor() { }

  viagens: ViagemCompleta[] = [];
  displayedColumns: string[] = ['nome', 'nif', 'marcamodelo', 'matricula', 'cliente', 'passageiros', 'partida', 'chegada', 'inicio', 'fim', 'kilometros', 'custo'];

  columnsToDisplay: string[] = this.displayedColumns.slice();

  ngOnInit(): void {
    const state = window.history.state;
    this.viagens = state['viagens'];
  }

  addOrRemove(col: MatCheckboxChange){
    const nomeCol = col.source.value;
    let checked = col.checked;
    console.log(nomeCol);
    console.log(checked);
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

  dateCustomFormat(data: Date): string {
    const res = new Date(data).toISOString().split('T');
    let dia = res[0];
    let hora = res[1].split('.')[0];
    return dia + " " + hora;
  }
}
