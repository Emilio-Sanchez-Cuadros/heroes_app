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
  private apiUrl = 'http://localhost:3000/api/';   

  constructor(
    private http: HttpClient,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  }; 

  /* Methods with mocked data from json */

  // getHeroes(): Observable<Hero[]> {
  //   return of(HEROES_OBJECTS);
  // }

  // getHeroProfile(heroId: number): Observable<Hero> {
  //     return of(HEROES_OBJECTS[heroId]);
  // }

  // getHeroByName(search: string): Observable<Hero[]> {
  //   const filteredResult = HEROES_OBJECTS.filter((result: any) => result.name.toLowerCase().includes(search.toLowerCase()));
  //   return of(filteredResult);
  // }


  // createHero(hero: any): Observable<any> {
  //     console.log('createHero() heroes service', hero);
  //     HEROES_OBJECTS.splice(0, 0, hero);
  //     return of(HEROES_OBJECTS);
  // }

  // updateHero(hero: any, heroId: number): Observable<any> {
  //     console.log('updateHero() heroes service', hero);
  //     HEROES_OBJECTS[heroId] = hero;
  //     return of(HEROES_OBJECTS[heroId]);
  // }

  // deleteHero(heroId: number): Observable<any> {
  //     console.log('deleteHero() heroes service', heroId);
  //     HEROES_OBJECTS.splice(heroId, 1);
  //     return of(HEROES_OBJECTS);
  // }

  getHeroes(): Observable<any> {
    console.log('getHeroProfile()');
    return this.http.get(this.apiUrl + "heroes");
  }

  getHeroProfile(heroId: number): Observable<Hero> {
    console.log('getHeroProfile() heroId: ', heroId);
    return this.http.get(this.apiUrl + "heroes/" + heroId);
  }

  getHeroByName(search: string): Observable<any> {
    console.log('getHeroByName() heroes by name', search);
    const hero = this.http.get(this.apiUrl + "heroes/search/" + search);
    console.log('getHeroByName() heroes by name', hero);
    return hero;
  }


  createHero(hero: any): Observable<any> {
    console.log('createHero() heroes service', hero);
    return this.http.post(
      this.apiUrl + "heroes", 
      hero, 
      this.httpOptions);
  }

  updateHero(hero: any, heroId: number): Observable<any> {
      console.log('updateHero() heroes service', hero);
      return this.http.put(
        this.apiUrl + "heroes/" + heroId,
        hero,
        this.httpOptions
    );
  }

  deleteHero(heroId: number): Observable<any> {
      console.log('deleteHero() heroes service', heroId);
      return this.http.delete(
        this.apiUrl + "heroes/" + heroId
    )}
}
