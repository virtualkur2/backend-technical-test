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
  const knownProtocols = getProtocols();
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
 * List of supported protocols
 *
 * @returns { Array<string> } List of currently supported protocols
 */
const getProtocols = function (): string[] {
  return [
    "closest-enemies",
    "furthest-enemies",
    "assist-allies",
    "avoid-crossfire",
    "prioritize-mech",
    "avoid-mech",
  ];
};

export { isEmptyObject, isValidData };
