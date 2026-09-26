import { Car } from './car.model';
export interface Simulation{
    width:number;
    height:number;
    cars:Car[];
    currentStep:number;
    running:boolean;
}