import {items} from '../data/items';

export const checkDropZone = (
  position: {x: number; y: number},
  value: string,
  event: string,
  dropZones: any,
) => {
  for (const dropZone of dropZones) {
    const ok = Math.abs(position.y / 10 - dropZone.y / 10) <= 3;
    const [dropZoneFilter] = dropZones.filter(
      (item: {value: string}) => item.value === value,
    );

    if ((!!ok && dropZoneFilter) || (event === 'click' && dropZoneFilter)) {
      if (dropZone.value === value) {
        const [itemFiltered] = items.filter(item => item.name === value);

        const refreshArray = {
          name: itemFiltered.name,
          value: itemFiltered.value,
          correct: true,
          translate: itemFiltered.translate,
        };
        return [dropZone, refreshArray];
      }
      // Faça o que for necessário com a DropZone encontrada
    }
  }
};
