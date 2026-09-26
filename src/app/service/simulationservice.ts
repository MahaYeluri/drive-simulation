import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import { Direction } from '../models/direction.model';
import { Command } from '../models/command.model';

@Injectable({
  providedIn: 'root',
})
export class Simulationservice {
  private directions: Direction[] = ['N', 'E', 'S', 'W'];

  // Calculate new position and direction after executing one command
  getNextState(car: Car, width: number, height: number): { x: number; y: number; direction: Direction } {
    const currentCommand = car.commands[car.currentCommandIndex] as Command;
    let { x, y, direction } = car;

    if (!currentCommand) {
      return { x, y, direction };
    }

    if (currentCommand === 'L') {
      const idx = (this.directions.indexOf(direction) + 3) % 4;
      direction = this.directions[idx];
    } else if (currentCommand === 'R') {
      const idx = (this.directions.indexOf(direction) + 1) % 4;
      direction = this.directions[idx];
    } else if (currentCommand === 'F') {
      let nextX = x;
      let nextY = y;

      switch (direction) {
        case 'N': nextY++; break;
        case 'E': nextX++; break;
        case 'S': nextY--; break;
        case 'W': nextX--; break;
      }

      // Check boundary limits
      if (nextX >= 0 && nextX < width && nextY >= 0 && nextY < height) {
        x = nextX;
        y = nextY;
      }
    }

    return { x, y, direction };
  }

  // Run full simulation until all cars complete commands or collide
  runSimulation(width: number, height: number, initialCars: Car[]): { cars: Car[]; logs: string[] } {
    let cars: Car[] = JSON.parse(JSON.stringify(initialCars));
    const logs: string[] = [];
    let step = 1;

    // Track collisions per car
    const collisions: { [carName: string]: { collidedWith: string[]; step: number; x: number; y: number } } = {};

    while (cars.some(c => c.status === 'RUNNING' || c.status === 'READY')) {
      // 1. Move active cars 1 step forward
      const activeCars = cars.filter(c => c.status === 'READY' || c.status === 'RUNNING');

      if (activeCars.every(c => c.currentCommandIndex >= c.commands.length)) {
        activeCars.forEach(c => c.status = 'COMPLETED');
        break;
      }

      for (let car of activeCars) {
        if (car.currentCommandIndex < car.commands.length) {
          car.status = 'RUNNING';
          const next = this.getNextState(car, width, height);
          car.x = next.x;
          car.y = next.y;
          car.direction = next.direction;
          car.currentCommandIndex++;
        } else {
          car.status = 'COMPLETED';
        }
      }

      // 2. Check for collisions at current step
      const positionMap = new Map<string, Car[]>();
      for (let car of cars.filter(c => c.status === 'RUNNING' || c.status === 'COMPLETED')) {
        const key = `${car.x},${car.y}`;
        if (!positionMap.has(key)) {
          positionMap.set(key, []);
        }
        positionMap.get(key)!.push(car);
      }

      // 3. Mark collided cars
      positionMap.forEach((carsAtPos, key) => {
        if (carsAtPos.length > 1) {
          carsAtPos.forEach(c => {
            if (c.status !== 'COLLISION') {
              c.status = 'COLLISION';
              const otherCars = carsAtPos.filter(other => other.name !== c.name).map(other => other.name);
              collisions[c.name] = {
                collidedWith: otherCars,
                step: step,
                x: c.x,
                y: c.y
              };
            }
          });
        }
      });

      step++;
    }

    // Generate output logs based on problem requirements
    cars.forEach(car => {
      if (car.status === 'COLLISION' && collisions[car.name]) {
        const info = collisions[car.name];
        logs.push(`${car.name}, collides with ${info.collidedWith.join(', ')} at (${info.x},${info.y}) at step ${info.step}`);
      } else {
        logs.push(`${car.name}, (${car.x},${car.y}) ${car.direction}`);
      }
    });

    return { cars, logs };
  }
}