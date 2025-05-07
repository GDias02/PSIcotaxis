import { Component, ViewChild, inject } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MapViewerComponent } from "../map-viewer/map-viewer.component";
import { GeolocationService } from "../geolocation.service";
import { Morada } from "../morada";
import { MoradaCreateComponent } from "../morada-create/morada-create.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pedido } from "../pedido";

@Component({
  selector: 'app-pedido-create-form',
  templateUrl: './pedido-create-form.component.html',
  styleUrls: ['./pedido-create-form.component.css'],
})
export class PedidoCreateFormComponent {
  coordenadasDe!: string;
  coordenadasPara!: string;
  numDePassageiros!: number;
  nif?: number;
  genero?: string;
  nome?: string;
  luxuoso: boolean = false;
  @ViewChild('moradaDe') moradaDeComponent!: MoradaCreateComponent;
  @ViewChild('moradaPara') moradaParaComponent!: MoradaCreateComponent;

  private _snackBar = inject(MatSnackBar);

  pedidoForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64), Validators.pattern('^[^\\d]*$')]),
    nif: new FormControl('', [Validators.required, Validators.min(100000000), Validators.max(999999999), Validators.pattern('^\\d+$')]),
    genero: new FormControl('', [Validators.required, Validators.pattern('^Masculino|Feminino$')]),
    numDePassageiros: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(4)]),
  })

  constructor(public dialog: MatDialog,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit():void {
    this.numDePassageiros = 1;
    this.nome ="";
  }

  openMap(): void {
    const dialogRef = this.dialog.open(MapViewerComponent, {
      height:'80%',
      width: '80%',
      data: {de: this.coordenadasDe, para: this.coordenadasPara}
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.coordenadasDe = result[0];
      this.coordenadasPara = result[1];
      
      const moradaDe = await this.translateCoordinatesToMoradaAsync(this.coordenadasDe);
      if (moradaDe) {
        this.moradaDeComponent.registerMorada(moradaDe);
      }
    
      // Handle moradaPara
      const moradaPara = await this.translateCoordinatesToMoradaAsync(this.coordenadasPara);
      if (moradaPara) {
        this.moradaParaComponent.registerMorada(moradaPara);
      }

      this.openSnackBar("Confirme sempre os dados preenchidos e se for adequado adicione o número da porta");

      });
  }
  
  isReadyToSubmit():boolean{
    return this.pedidoForm.valid ?? false;
  }

  getPedido(): Pedido{
    return {
      _id: "",
      moradaDe: this.moradaDeComponent.getRespectiveMorada(),
      moradaPara: this.moradaParaComponent.getRespectiveMorada(),
      coordenadasDe: this.coordenadasDe,
      coordenadasPara: this.coordenadasPara,
      numDePassageiros: this.pedidoForm.get('numDePassageiros')?.value ?? 4,
      luxuoso: this.luxuoso,
      nif: this.pedidoForm.get('nif')?.value ?? "999999999",
      genero: this.pedidoForm.get('genero')?.value?.toLocaleLowerCase() ?? "Masculino",
      nome: this.pedidoForm.get('nome')?.value ?? "João",
      status: "pendente",
    };
  }

  async makeSureThereAreCoordinates(): Promise<void>{
    if (!this.coordenadasDe || !this.coordenadasPara){
      const coordDe = await this.translateMoradaToCoordinatesAsync(this.moradaDeComponent.getRespectiveMorada());
      this.coordenadasDe = this.extractLatLngString(coordDe);
    
      const coordPara = await this.translateMoradaToCoordinatesAsync(this.moradaParaComponent.getRespectiveMorada());
      this.coordenadasPara = this.extractLatLngString(coordPara);
    }
  }

  private async translateCoordinatesToMoradaAsync(coord: string): Promise<Morada | null> {
    try {
      const json: any = await this.geolocationService.getTranslationForCoordinate(coord).toPromise();
  
      const morada: Morada = {
        rua: json.address?.road ?? 'Unknown Street',
        codigoPostal: json.address?.postcode ?? '0000-000',
        localidade: json.address?.city ?? 'Unknown Locality',
        numeroDePorta: json.address?.house_number ?? '0',
      };

      return morada;
    } catch (error) {
      console.error('Error translating coordinates:', error);
      return null;
    }
  }

  private async translateMoradaToCoordinatesAsync (morada: Morada): Promise<JSON> {
    const json: any = await this.geolocationService.getTranslationForMorada(morada).toPromise();
    return json;
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, 'Okay', {duration:8500});
  }

  private extractLatLngString(json: any): string {
    const lat = json.lat;
    const lon = json.lon;
    return `${lat},${lon}`; 
  }
}
