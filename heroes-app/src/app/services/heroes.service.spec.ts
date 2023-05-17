import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';
import { Hero } from '../models/models'

describe('HeroesServiceService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHeroes should returns an array', () => {
    service.getHeroes().subscribe(result => {
      expect(result.length).toBeGreaterThan(0);
    })
  });

  // it('getHeroProfile should returns a Hero type object', () => {
  //   service.getHeroes().subscribe(result => {
  //     expect(result).;
  //   })
  // })
});
