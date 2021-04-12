import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: Spectator<DashboardComponent>;
  const createComponent = createComponentFactory(DashboardComponent);
  let heroService;
  let getHeroesSpy;

  beforeEach(() => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    getHeroesSpy = heroService.getHeroes.and.returnValue(of(HEROES));
    component = createComponent({
      providers: [{ provide: HeroService, useValue: heroService }],
    });
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Heroes" as headline', () => {
    expect(component.query('h2').textContent).toEqual('Top Heroes');
  });

  it('should call heroService', () => {
    expect(getHeroesSpy.calls.any()).toBe(true);
  });

  it('should display 4 links', () => {
    expect(component.queryAll('a').length).toEqual(4);
  });
});
