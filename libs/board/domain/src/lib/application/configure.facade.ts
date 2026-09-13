import { Injectable, inject } from '@angular/core';
import { BoardService } from '../infrastructure/board.service';

@Injectable()
export class ConfigureFacade {
  #board = inject(BoardService);

  columns = this.#board.columns;

  setWip(columnId: string, value: string) {
    const parsed = value.trim() === '' ? null : Number(value);
    this.#board.setWip(columnId, Number.isFinite(parsed) ? parsed : null);
  }
}
