interface ICoordinates {
  x: number;
  y: number;
}

interface IEnemies {
  type: string;
  number: number;
}

interface IScan {
  coordinates: ICoordinates;
  enemies: IEnemies;
  allies?: number;
}

export { ICoordinates, IEnemies, IScan };
