import { ICoordinates, IEnemies, IScan } from "../interfaces";

/**
 * Empty object tester
 *
 * @param { Object } obj object to test
 * @returns { boolean } returns true if object is empty, false otherwise
 */
const isEmptyObject = function (obj: Object): boolean {
  for (let _ in obj) return false;
  return true;
};

/**
 * Data validation
 *
 * @param { any } data data object with protocols and scan data to process
 * @returns { boolean } returns true if data passes constraint validation, false otherwise
 */
const isValidData = function (data: any): boolean {
  // verify required keys
  if (!(data.protocols && data.scan)) return false;
  // verify type of values on keys
  if (!(Array.isArray(data.protocols) && data.protocols.length)) return false;
  if (!(Array.isArray(data.scan) && data.scan.length)) return false;
  // check for valid protocols
  if (!hasValidProtocols(data.protocols)) return false;
  // check for valid scan data
  if (!data.scan.every(hasValidScanData)) return false;
  return true;
};

/**
 * Protocols validation
 *
 * @param {Array<string>} protocols List of protocols to test
 * @returns { boolean } returns true if all protocols in the list are known, false otherwise
 */
const hasValidProtocols = function (protocols: string[]): boolean {
  const knownProtocols = Protocols.allProtocols();
  return protocols.every((protocol) => knownProtocols.includes(protocol));
};

/**
 * Scan Data validation
 *
 * @param { Object }scan scan data to test for valid signature
 * @returns true if data passess validation contraint, false otherwise
 */
const hasValidScanData = function (scan: any): boolean {
  // check for required properties
  if (!(scan.coordinates && scan.enemies)) return false;

  if (
    !(
      scan.coordinates.hasOwnProperty("x") &&
      scan.coordinates.hasOwnProperty("y")
    )
  )
    return false;

  if (
    !(
      scan.enemies.hasOwnProperty("type") &&
      scan.enemies.hasOwnProperty("number")
    )
  )
    return false;

  return true;
};

/**
 * Supported Protocols
 *
 * Protocols are categorized by type
 */
class Protocols {
  static MAX_ATTACK_RANGE = 100;

  static positionProtocols(): Array<string> {
    return ["closest-enemies", "furthest-enemies"];
  }
  static priorityProtocols(): Array<string> {
    return ["assist-allies", "prioritize-mech"];
  }
  static avoidProtocols(): Array<string> {
    return ["avoid-crossfire", "avoid-mech"];
  }
  static allProtocols(): Array<string> {
    return [
      ...Protocols.positionProtocols(),
      ...Protocols.avoidProtocols(),
      ...Protocols.priorityProtocols(),
    ];
  }
  /**
   *
   * @param { IScan } scan objet with data for target
   * @param { string } protocol type of position protocol
   * @returns { Array<IScan> } list of targets ordered by position
   */
  static orderByPositionProtocol(
    scan: Array<IScan>,
    protocol: string
  ): Array<IScan> {
    let arr = scan.map((element) => {
      return { data: element, distance: Protocols.calcDistance(element) };
    });
    arr.sort((a, b) => {
      if (protocol === "closest-enemies") {
        return a.distance - b.distance;
      }
      return b.distance - a.distance;
    });
    let ordered = arr.map((el) => el.data);
    return ordered;
  }
  /**
   * Calculates distance from origin (0,0) of a point in plane (coordinate pair)
   * @param { IScan } scan Object with coordinates of target
   * @returns distance from origin to coordinates given
   */
  static calcDistance(scan: IScan): number {
    let distance = Math.sqrt(scan.coordinates.x ** 2 + scan.coordinates.y ** 2);
    return distance;
  }
  /**
   *
   * @param { Array<IScan> } scan filters reachable data
   * @returns { Array<IScan> }
   */
  static filterReachableTargets(scan: Array<IScan>): Array<IScan> {
    let arr = scan.map((element) => {
      return { data: element, distance: Protocols.calcDistance(element) };
    });
    let reachable = arr
      .filter((el) => el.distance <= Protocols.MAX_ATTACK_RANGE)
      .map((el) => el.data);
    return reachable;
  }

  static applyAvoidProtocol(
    scan: Array<IScan>,
    protocol: string
  ): Array<IScan> {
    let filtered = scan.filter((data) => {
      if (protocol === "avoid-crossfire") {
        return !data.hasOwnProperty("allies");
      } else if (protocol === "avoid-mech") {
        return data.enemies.type !== "mech";
      } else return true;
    });
    if (!filtered.length) {
      filtered = [...scan];
    }
    return filtered;
  }

  static applyPriorityProtocol(
    scan: Array<IScan>,
    protocol: string
  ): Array<IScan> {
    let filtered = scan.filter((data) => {
      if (protocol === "assist-allies") {
        return data.hasOwnProperty("allies");
      } else if (protocol === "prioritize-mech") {
        return data.enemies.type === "mech";
      }
    });
    if (!filtered.length) {
      filtered = [...scan];
    }
    return filtered;
  }
}
export { isEmptyObject, isValidData, Protocols };
