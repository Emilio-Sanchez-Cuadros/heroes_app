import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';
import { Hero } from '../models/models';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';

describe('HeroesServiceService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    });
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHeroes should returns an array', fakeAsync(() => {
    service.getHeroes().subscribe(result => {
      setTimeout(() => {
        expect(result instanceof Array).toBe(true);
        expect(result[0] instanceof Hero).toBe(true);
      }, 6000);

      tick(6000);
  })
  }));
});
