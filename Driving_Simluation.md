# Driving Simulation

## Problem Statement

You are asked to develop an interface, either via Command Line (CLI) or a browser based UI, for a driving simluation program.

The submission must include an executable `start.sh` at the root. Running it should launch the application without
additional setup. `start.sh` executes in an environment with the latest versions the langauge such as
Java (`java` in `PATH`, `JAVA\_HOME` set), Node.js (`node` and `npm` in `PATH`), or Dart (SDK in `PATH`).
Internet access is enabled so dependencies can be downloaded (e.g., `./gradlew build`, `npm install`, `dart pub get`).

Each invocation must produce a clean start with no state carried over from previous runs — e.g., if cars are created, the
process stopped, and `start.sh` is run again, no cars should be registered.

## Functional Requirements

The simulation program is designed to work with a rectangular field, specified by its width and height. The bottom left coordinate of the field is at position (0, 0),
and the top right position is denoted (width, height). For example, a field with dimensions 10 x 10 would have its upper right coordinate at position (9, 9).

One or more cars can be added to the field, each with a unique name, starting position, and direction they are facing. For instance, a car named "A" may be placed at position (1, 2) and facing North.

A list of commands can be issued to each car, which can be one of three commands:

* L: rotates the car by 90 degrees to the left
* R: rotates the car by 90 degrees to the right
* F: moves forward by 1 grid point

If a car tries to move beyond the boundary of the field, the command is ignored, and the car stays in its current position. For example, if a car at position (0, 0) is facing South and receives an F command, the command will be ignored as it would take the car beyond the boundary of the field.

## Example Session

Using CLI as an example, your application output should contain at least the following depending on the scenario and commands. But feel free
to add extra output as you see fit.

### Scenario 1 - Running simulation with one car

```
Welcome to Car Crash Java!

Please enter the width and heigh of the simulation field in x y format:
10 10

You have created a field of 10 x 10.

Please choose from the following options:
\[1] Add a car to field
\[2] Run simulation

1

Please enter the name of the car:
A

Please enter initial position of car A in x y Direction format:
1 2 N

Please enter the commands for car A:
FFRFFFFRRL

Your current list of cars are:
- A, (1,2) N, FFRFFFFRRL

Please choose from the following options:
\[1] Add a car to field
\[2] Run simulation

2

Your current list of cars are:
- A, (1,2) N, FFRFFFFRRL

After simulation, the result is:
- A, (5,4) S

Please choose from the following options:
\[1] Start over
\[2] Exit

2

Thank you for running the simulation. Goodbye!
```

### Scenario 2 - Running simulation with multiple cars

```
Welcome to Car Crash Java!

Please enter the width and height of the simulation field in x y format:
10 10

You have created a field of 10 x 10.

Please choose from the following options:
\[1] Add a car to field
\[2] Run simulation

1

Please enter the name of the car:
A

Please enter initial position of car A in x y Direction format:
1 2 N

Please enter the commands for car A:
FFRFFFFRRL

Your current list of cars are:
- A, (1,2) N, FFRFFFFRRL

Please choose from the following options:
\[1] Add a car to field
\[2] Run simulation

1

Please enter the name of the car:
B

Please enter initial position of car A in x y Direction format:
7 8 W

Please enter the commands for car A:
FFLFFFFFFF

Your current list of cars are:
- A, (1,2) N, FFRFFFFRRL
- B, (7,8) W, FFLFFFFFFF

Please choose from the following options:
\[1] Add a car to field
\[2] Run simulation

2

Your current list of cars are:
- A, (1,2) N, FFRFFFFRRL
- B, (7,8) W, FFLFFFFFFF

After simulation, the result is:
- A, collides with B at (5,4) at step 7
- B, collides with A at (5,4) at step 7

Please choose from the following options:
\[1] Start over
\[2] Exit

2

Thank you for running the simulation. Goodbye!
```

## Rules

* Application must run, and you must include an instruction manual for operation
* If there are special cases or ambiguity, you are expected to take your own decision on how it should be handled and explain your decision
* If there are any assumptions and/or deviations from the problem statement, you are expected to detail your reasoning
* Please submit the assignment as a Zip File or Git archive
* Do not include any binary files and/or executables
* Do not push into any public code repository
* You are allowed to use any library, but you should not use any library that outright solves the problem
* You should implement at a level where they would be proud to have other engineers look and review the result
* All parts of the submission will be assessed include but no limited to:

  * Design choices
  * Implementation technique (including tests)
  * Exception handling and special case handling
* You are free to use AI for the assignment

