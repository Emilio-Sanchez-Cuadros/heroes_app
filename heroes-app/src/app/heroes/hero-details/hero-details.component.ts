import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/models';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {

  hero: Hero = {};

  constructor(
    private route: ActivatedRoute,
    private _heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe(params => {
      console.log('params', params);
      this._heroesService.getHeroProfile(Number(params.get('id'))).subscribe(hero => {
        this.hero = hero;
        console.log('this.hero', this.hero);
      })
    }
  );


  }

}
