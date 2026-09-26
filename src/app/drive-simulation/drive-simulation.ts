import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Simulationservice } from '../service/simulationservice';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-drive-simulation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './drive-simulation.html',
  styleUrl: './drive-simulation.css'
})
export class DriveSimulation implements OnInit {
  fieldForm!: FormGroup;
  carForm!: FormGroup;

  directions = ['N', 'E', 'S', 'W'];

  // Field and Simulation state
  fieldCreated = false;
  fieldWidth = 0;
  fieldHeight = 0;

  simulationResults: string[] = [];
  gridRows: number[] = [];
  gridCols: number[] = [];
  carsList: Car[] = [];
  simulationExecuted = false;

  constructor(private fb: FormBuilder, private simService: Simulationservice) { }

  ngOnInit() {
    this.createFieldForm();
    this.createCarForm();
  }

  createFieldForm() {
    this.fieldForm = this.fb.group({
      width: [10, [Validators.required, Validators.min(1)]],
      height: [10, [Validators.required, Validators.min(1)]]
    });
  }

  createCarForm() {
    this.carForm = this.fb.group({
      cars: this.fb.array([])
    });
  }

  get cars() {
    return this.carForm.get('cars') as FormArray;
  }

  newCar(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      x: [0, [Validators.required, Validators.min(0)]],
      y: [0, [Validators.required, Validators.min(0)]],
      direction: [this.directions[0], Validators.required],
      commands: ['', [Validators.required, Validators.pattern(/^[LRF]+$/i)]]
    });
  }

  addCar() {
    this.cars.push(this.newCar());
  }

  removeCar(index: number) {
    this.cars.removeAt(index);
  }

  onFieldFormSubmit() {
    if (this.fieldForm.valid) {
      this.fieldWidth = parseInt(this.fieldForm.value.width, 10);
      this.fieldHeight = parseInt(this.fieldForm.value.height, 10);

      // Invert Y-axis for CSS grid rendering (Top is Height-1, Bottom is 0)
      this.gridRows = Array.from({ length: this.fieldHeight }, (_, i) => this.fieldHeight - 1 - i);
      this.gridCols = Array.from({ length: this.fieldWidth }, (_, i) => i);

      this.fieldCreated = true;
    }
  }

  runSimulation() {
    if (this.carForm.invalid) return;

    const rawCars = this.cars.value.map((c: any) => ({
      name: c.name,
      x: parseInt(c.x, 10),
      y: parseInt(c.y, 10),
      direction: c.direction,
      commands: c.commands.toUpperCase(),
      currentCommandIndex: 0,
      status: 'READY'
    })) as Car[];

    // Validate starting positions
    const invalidCar = rawCars.find(
      car =>
        car.x < 0 ||
        car.x >= this.fieldWidth ||
        car.y < 0 ||
        car.y >= this.fieldHeight
    );

    if (invalidCar) {
      alert(
        `Car ${invalidCar.name} has invalid starting position ` +
        `(${invalidCar.x},${invalidCar.y})`
      );
      return;
    }

    const result = this.simService.runSimulation(
      this.fieldWidth,
      this.fieldHeight,
      rawCars
    );

    this.carsList = result.cars;
    this.simulationResults = result.logs;
    this.simulationExecuted = true;
  }

  resetSimulation() {
    this.fieldCreated = false;
    this.simulationExecuted = false;
    this.carsList = [];
    this.simulationResults = [];
    this.cars.clear();
    this.fieldForm.reset({ width: 10, height: 10 });
  }

  getCarAt(x: number, y: number): Car | undefined {
    return this.carsList.find(c => c.x === x && c.y === y);
  }

  getDirectionRotation(dir: string): string {
    switch (dir) {
      case 'N':
        return 'rotate(0deg)';

      case 'E':
        return 'rotate(90deg)';

      case 'S':
        return 'rotate(180deg)';

      case 'W':
        return 'rotate(270deg)';

      default:
        return 'rotate(0deg)';
    }
  }
}