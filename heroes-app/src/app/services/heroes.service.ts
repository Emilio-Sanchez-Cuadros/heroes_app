import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Hero } from '../models/models';
import { HEROES_OBJECTS } from '../../assets/MOCK_DATA.json';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor() { }

  /* Heros */

  getHeroes(): Observable<Hero[]> {
      return of(HEROES_OBJECTS);
  }

  getHeroProfile(heroId: number): Observable<Hero> {
      return of(HEROES_OBJECTS[heroId]);
  }

  getHeroByName(search: string): Observable<Hero[]> {
    const filteredResult = HEROES_OBJECTS.filter((result: any) => result.name.toLowerCase().includes(search.toLowerCase()));
    return of(filteredResult);
  }


  createHero(hero: any): Observable<any> {
      console.log('createHero() heroes service', hero);
      HEROES_OBJECTS.splice(0, 0, hero);
      return of(HEROES_OBJECTS);
  }

  updateHero(hero: any, heroId: number): Observable<any> {
      console.log('updateHero() heroes service', hero);
      HEROES_OBJECTS[heroId] = hero;
      return of(HEROES_OBJECTS[heroId]);
  }

  deleteHero(heroId: number): Observable<any> {
      console.log('deleteHero() heroes service', heroId);
      HEROES_OBJECTS.splice(heroId, 1);
      return of(HEROES_OBJECTS);
  }
}
