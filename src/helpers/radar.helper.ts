import { Protocols } from "./functions.helper";
import { ICoordinates, IEnemies, IScan } from "../interfaces";

const getTarget = (
  protocols: Array<string>,
  scan: Array<IScan>
): ICoordinates => {
  // First step: filter reachable targets
  scan = Protocols.filterReachableTargets(scan);
  // Second step: apply order rules if any
  let posProtocols = Protocols.positionProtocols();
  if (protocols.some((_) => posProtocols.includes(_))) {
    let positionProtocol = "";
    for (let i = 0; i < protocols.length; ++i) {
      let prot = posProtocols.find((el) => el === protocols[i]);
      if (prot) {
        positionProtocol = prot;
        break;
      }
    }
    scan = Protocols.orderByPositionProtocol(scan, positionProtocol);
  }
  //Third Step: apply avoid rules
  let avoidProtocols = Protocols.avoidProtocols();
  if (protocols.some((_) => avoidProtocols.includes(_))) {
    let avoidProtocol = "";
    for (let i = 0; i < protocols.length; ++i) {
      let prot = avoidProtocols.find((el) => el === protocols[i]);
      if (prot) {
        avoidProtocol = prot;
        break;
      }
    }
    scan = Protocols.applyAvoidProtocol(scan, avoidProtocol);
  }
  //Fourth Step: apply priority rules and generate target
  let priorityProtocols = Protocols.priorityProtocols();
  let target: ICoordinates;
  if (protocols.some((_) => priorityProtocols.includes(_))) {
    let priorityProtocol = "";
    for (let i = 0; i < protocols.length; ++i) {
      let prot = priorityProtocols.find((el) => el === protocols[i]);
      if (prot) {
        priorityProtocol = prot;
        break;
      }
    }
    scan = Protocols.applyPriorityProtocol(scan, priorityProtocol);
  }

  return { x: scan[0].coordinates.x, y: scan[0].coordinates.y };
};

export { getTarget };
