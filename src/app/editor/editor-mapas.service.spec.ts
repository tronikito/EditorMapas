import { TestBed } from '@angular/core/testing';

import { EditorMapasService } from './editor-mapas.service';

describe('EditorMapasService', () => {
  let service: EditorMapasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorMapasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
