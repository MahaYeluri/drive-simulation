import { Direction } from './direction.model';
export interface Car{
    name : string;
    x :number;
    y:number;
    direction:Direction;
    commands:string;

    currentCommandIndex: number;
  status: 'READY' | 'RUNNING' | 'COMPLETED' | 'COLLISION';
}