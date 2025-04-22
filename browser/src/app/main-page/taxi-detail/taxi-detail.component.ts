import { Component } from '@angular/core';
import { Taxi } from '../taxi';
import { TaxiService } from '../taxi.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-taxi-detail',
  templateUrl: './taxi-detail.component.html',
  styleUrls: ['./taxi-detail.component.css']
})
export class TaxiDetailComponent {
  taxi?: Taxi;

  constructor(
    private route: ActivatedRoute,
    private taxiService: TaxiService,
    private location: Location,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getTaxi();
  }

  getTaxi(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.taxiService.getTaxi(id!)
      .subscribe(val => this.taxi = val);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    //TO DO
  }
}
