import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';

describe('HeroesServiceService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHeroes returns array', () => {
    service.getHeroes().subscribe(result => {
      expect(result.length).toBeGreaterThan(0);
    })
  })
});
