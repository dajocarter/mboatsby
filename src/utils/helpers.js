export function columnClasses(colIndex, colCount) {
  let colSize;
  switch (colCount) {
    case 12:
      colSize = 6;
      break;
    case 11:
      colSize = colIndex == 10 || colIndex == 11 ? 6 : 4;
      break;
    case 10:
      colSize = 6;
      break;
    case 9:
      colSize = 4;
      break;
    case 8:
      colSize = 3;
      break;
    case 7:
      colSize = colIndex < 4 ? 3 : 4;
      break;
    case 6:
      colSize = 4;
      break;
    case 5:
      colSize = colIndex < 3 ? 4 : 6;
      break;
    default:
      colSize = 12 / colCount;
      break;
  }
  return colSize;
}
